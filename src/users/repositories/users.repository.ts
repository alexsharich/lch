import {ObjectId} from "mongodb";
import {blackListCollection, usersCollection} from "../../db/mongo.db";
import {UserAccountDBType} from "../types/user.types";
import { add } from "date-fns";
import {v4 as uuidv4} from 'uuid'

export const usersRepository = {
    async createUser(user: UserAccountDBType): Promise<string | null> {
        try {
            const createdUser = await usersCollection.insertOne(user)
            return createdUser.insertedId.toString()
        } catch (e) {
            console.log('Create user error : ', e)
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
    async updateConfirmation(userId: any) {
        const result = await usersCollection.updateOne({_id: userId}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    },
    async updateCode(userId: ObjectId) {
        const newExpirationDate = add(new Date(), {hours: 1})
        await usersCollection.updateOne({_id: userId}, {
            $set: {
                'emailConfirmation.expirationDate': newExpirationDate,
                'emailConfirmation.confirmationCode': uuidv4(),
            }
        })
    },
    async tokenToBlackList(oldRefreshToken: string) {
        const oldTokenId = await blackListCollection.insertOne({
            token: oldRefreshToken
        })
        console.log(oldTokenId.acknowledged)
        return oldTokenId.acknowledged
    },
    async checkTokenInBlackList(refreshToken: string) {
        return await blackListCollection.findOne({token: refreshToken})
    }
}