import { IResolvers } from '@graphql-tools/utils'
import AppContext from '../../AppContext'
import { getPostForPostIdResolver } from '../../post/resolvers/get_post_resolver'
import { getUserForUserIdResolver } from '../../user/resolvers/get_user_resolver'
import { ERROR_MESSAGE_COMMENT_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'
import Comment from '../model/Comment'
import { GraphQLResolveInfo } from 'graphql'

export const getCommentForPostResolver =  (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo): Promise<Array<Comment>> => {
    if (typeof parent.postId === 'string') {
        let comment = context.db.comments.filter(comment => comment.postId === parent.postId)

        if (comment) {
            return new Promise<Array<Comment>>((resolve) => {
                resolve(comment!);
            })
        }

        return new Promise<Array<Comment>>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_COMMENT_NOT_FOUND))
        })
    }

    return new Promise<Array<Comment>>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export const getCommentForUserResolver = (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo): Promise<Array<Comment>> => {
    if (typeof parent.userId === 'string') {
        let comment = context.db.comments.filter(comment => comment.userId === parent.userId)

        if (comment) {
            return new Promise((resolve) => {
                resolve(comment!);
            })
        }

        return new Promise((_, reject) => {
            reject(new Error(ERROR_MESSAGE_COMMENT_NOT_FOUND))
        })
    }

    return new Promise((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export const Comment: IResolvers<Record<string, unknown>, AppContext, any> = {
    author (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo) { 
        return getUserForUserIdResolver(parent, args, context, info)
    },
    post (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo) {
        return getPostForPostIdResolver(parent, args, context, info)
    }
}
