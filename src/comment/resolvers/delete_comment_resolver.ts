import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Comment from '../model/Comment'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_COMMENT_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const deleteCommentResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Comment> => {
    if ('commentId' in args) {

        for (let index = 0; index < context.db.comments.length; index++) {
            let comment = context.db.comments[index]

            if (comment.commentId === args.commentId) {
                let comments = context.db.comments.splice(index, 1)

                if (comments.length === 1) {
                    return new Promise<Comment>((resolve) => {
                        resolve(comments[0]!);
                    })
                }
            }
        }

        return new Promise<Comment>((resolve, reject) => {
            reject(new Error(ERROR_MESSAGE_COMMENT_NOT_FOUND))
        })
    }

    return new Promise<Comment>((resolve, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { deleteCommentResolver as default }