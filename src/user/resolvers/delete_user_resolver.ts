import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import User from '../model/User'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const deleteUserResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<User> => {
    if ('userId' in args) {
        // todo: delete all post, comments related to this users
        let user: User | null = null

        for (let index = 0; index < context.db.users.length; index++) {
            let user = context.db.users[index]

            if (user.userId === args.userId) {
                let users = context.db.users.splice(index, 1)

                if (users.length === 1) {
                    return new Promise<User>((resolve) => {
                        resolve(users[0]!);
                    })
                }
            }
        }

        return new Promise<User>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_USER_NOT_FOUND))
        })
    }

    return new Promise((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { deleteUserResolver as default }