import {InputLoginType} from "../controllers/login.controller";
import {usersRepository} from "../../users/repositories/users.repository";
import bcrypt from "bcrypt";

export const authService = {
    async loginOrEmail({loginOrEmail, password}: InputLoginType) {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (user) {
            const match = await bcrypt.compare(password, user.passwordHash)
            if (match) {
                console.log('logined');
                return true
            } else {
                console.log('Invalid password');
                return false
            }
        } else {
            console.log('User not found.');
            return false
        }
    }
}