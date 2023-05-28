import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import User from '../model/User'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_EMAIL_IN_USE, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const createUserResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<User> => {
    if ('newUserInput' in args) {
        let oldUser = context.db.users.find(user => user.email === args.newUserInput.email)

        if (oldUser) {
            return new Promise((_, reject) => {
                reject(new Error(ERROR_MESSAGE_EMAIL_IN_USE))
            })
        }
    
        let user: User = {
            userId: uuidv4(),
            ...args.newUserInput
        }

        context.db.users.push(user)
    
        return new Promise<User>((resolve) => {
            resolve(user);
        })
    }

    return new Promise((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { createUserResolver as default }