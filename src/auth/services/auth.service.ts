import {InputLoginType} from "../controllers/login.controller";
import {usersRepository} from "../../users/repositories/users.repository";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid'
import {add} from "date-fns/add";
import {emailManager} from "../../managers/email.manager";

export const authService = {
    async loginOrEmail({loginOrEmail, password}: InputLoginType): Promise<string | null> {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (user) {
            const match = await bcrypt.compare(password, user.accountData.passwordHash);
            if (match) {
                console.log('Login successful!');
                return String(user._id)
            }
        }
        console.log('User not found.');
        return null
    },
    async resendingEmail(email: string) {
        const user = await usersRepository.findUserWithEmailOrLogin(email)
        if (!user || user.emailConfirmation.isConfirmed) {
            return null
        }
        await usersRepository.updateCode(user._id)
        const updatedUser = await usersRepository.findUserWithEmailOrLogin(email)
        await emailManager.resendEmail(updatedUser!.accountData.email, 'Resending email', ' Resending message', updatedUser?.emailConfirmation.confirmationCode)
        return true
    },
    async confirmEmail(code: string) {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        let result = await usersRepository.updateConfirmation(user._id)
        return result
    },
    async createUser(login: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const now = new Date()
        const user = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(now, {
                    hours: 1,
                }),
                isConfirmed: false
            }
        }
        const createResult = await usersRepository.createUser(user)

        try {
            await emailManager.sendEmailConfirmationMessage(user.accountData.email, user.emailConfirmation.confirmationCode)
        } catch (error) {
            console.error(error)
            return null
        }
        return createResult
    },
    async addTokenToBlackList(oldRefreshToken: string) {
        return await usersRepository.tokenToBlackList(oldRefreshToken)
    },
    async checkTokenInBlackList(refreshToken: string) {
        return await usersRepository.checkTokenInBlackList(refreshToken)
    }
}