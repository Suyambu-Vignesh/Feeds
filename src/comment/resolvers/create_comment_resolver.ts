import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Comment from '../model/Comment'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const createCommentResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Comment> => {
    if ('newComment' in args) {
        let user = context.db.users.find(user => user.userId === args.newComment.userId)

        if (typeof user === 'undefined') {
            return new Promise<Comment>((resolve, reject) => {
                reject(new Error(ERROR_MESSAGE_USER_NOT_FOUND))
            })
        }

        let post = context.db.posts.find(post => post.postId === args.newComment.postId)

        if (typeof post === 'undefined') {
            return new Promise<Comment>((_, reject) => {
                reject(new Error(ERROR_MESSAGE_POST_NOT_FOUND))
            })    
        }

        // todo avoid saving duplicate post. (like timeout client push two times)

        let comment: Comment = {
            commentId: uuidv4(),
            ...args.newComment
        }

        context.db.comments.push(comment)
    
        return new Promise<Comment>((resolve) => {
            resolve(comment);
        })
    }

    return new Promise<Comment>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { createCommentResolver as default }