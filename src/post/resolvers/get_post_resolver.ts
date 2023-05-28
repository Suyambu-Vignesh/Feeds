import { IResolvers } from '@graphql-tools/utils'
import AppContext from '../../AppContext'
import Post from '../model/Post'
import { GraphQLResolveInfo } from 'graphql'
import { getUserForUserIdResolver } from '../../user/resolvers/get_user_resolver'
import { getCommentForPostResolver } from '../../comment/resolvers/get_comment_resolver'
import { ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

export const getPostForPostIdResolver =  (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo): Promise<Post> => {
    if (typeof parent.postId === 'string') {
        let post = context.db.posts.find(post => post.postId === parent.postId)

        if (post) {
            return new Promise<Post>((resolve) => {
                resolve(post!);
            })
        }

        return new Promise<Post>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_POST_NOT_FOUND))
        })
    }

    return new Promise<Post>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export const getPostForUserIdResolver =  (parent: Record<string, unknown>, args: any, context: AppContext, info: GraphQLResolveInfo): Promise<Array<Post>> => {
    if (typeof parent.userId === 'string') {
        let post = context.db.posts.filter(post => post.userId === parent.userId)

        if (post) {
            return new Promise<Array<Post>>((resolve) => {
                resolve(post!);
            })
        }

        return new Promise<Array<Post>>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_POST_NOT_FOUND))
        })
    }

    return new Promise<Array<Post>>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export const Post: IResolvers<Record<string, unknown>, AppContext, any> = {
    author: getUserForUserIdResolver,
    comments: getCommentForPostResolver
}