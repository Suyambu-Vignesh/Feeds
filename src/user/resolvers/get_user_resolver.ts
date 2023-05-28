import { IResolvers } from '@graphql-tools/utils'
import AppContext from '../../AppContext'
import User from '../model/User'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'
import { getPostForUserIdResolver } from '../../post/resolvers/get_post_resolver'
import { getCommentForUserResolver } from '../../comment/resolvers/get_comment_resolver'

export const getUserForUserIdResolver = (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo): Promise<User> => {
    if (typeof parent.userId === 'string') {
        let user = context.db.users.find(user => user.userId === parent.userId)

        if (user) {
            return new Promise<User>((resolve) => {
                resolve(user!);
            })
        }

        return new Promise((_, reject) => {
            reject(new Error(ERROR_MESSAGE_USER_NOT_FOUND))
        })
    }

    return new Promise<User>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export const User: IResolvers<Record<string, unknown>, AppContext, any> = {
    posts (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo) {
        return getPostForUserIdResolver(
            parent,
            args,
            context,
            info
        )
    },
    comments (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo) {
        return getCommentForUserResolver(
            parent,
            args,
            context,
            info
        )
    }
}


