import {InputLoginType} from "../controllers/login.controller";
import {usersRepository} from "../../users/repositories/users.repository";
import bcrypt from "bcrypt";

export const authService = {
    async loginOrEmail({loginOrEmail, password}: InputLoginType): Promise<string | null> {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (user) {
            const match = await bcrypt.compare(password, user.passwordHash);
            if (match) {
                console.log('Login successful!');
                return String(user._id)
            }
        }
        console.log('User not found.');
        return null
    }
}