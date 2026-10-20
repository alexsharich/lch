import {InputUserType} from "../dto/users.input.type";
import {usersRepository} from "../repositories/users.repository";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt'

export const usersService = {
    async createUser(user: InputUserType) {
        const errors = []
        const isUnique = await usersRepository.checkUniqUserWithEmailOrLogin(user.login, user.email)
        if (isUnique) {
            if (isUnique.email === user.email) {
                errors.push({field: 'email', message: 'email should be unique'})
            }
            if (isUnique.login === user.login) {
                errors.push({field: 'email', message: 'login should be unique'})
            }
            return errors
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const newUser = {
            _id: new ObjectId(),
            passwordHash: hash,
            login: user.login,
            email: user.email,
            createdAt: (new Date().toISOString())
        }
        return await usersRepository.createUser(newUser)
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    }
}