import {ObjectId} from "mongodb";
import {usersCollection} from "../../db/collections";
import {UserDBType} from "../types/user.types";

export const usersRepository = {
    async createUser(user: UserDBType): Promise<string | null> {
        try {
            const createdUser = await usersCollection.insertOne(user)
            return createdUser.insertedId.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    },
    async deleteUser(id: string) {
        try {
            const userId = new ObjectId(id)
            const result = await usersCollection.deleteOne({_id: userId})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }
    },
    async findUserWithEmailOrLogin(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },
    async checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return await usersCollection.findOne({$or: [{login: login}, {email: email}]})
    },
}