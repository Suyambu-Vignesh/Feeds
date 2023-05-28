import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import User from '../model/User'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const updateUserResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<User> => {
    if ('userInput' in args) {
        var oldUser = context.db.users.find(user => user.userId === args.userId)

        if (oldUser) {
            oldUser.email = args.userInput.email ?? oldUser.email
            oldUser.age = args.userInput.age ?? oldUser.age
            oldUser.name = args.userInput.name ?? oldUser.name

            return new Promise<User>((resolve) => {
                resolve(oldUser!);
            })
        }

        return new Promise<User>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_USER_NOT_FOUND));
        })
    }

    return new Promise<User>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG));
    })
}

export { updateUserResolver as default }