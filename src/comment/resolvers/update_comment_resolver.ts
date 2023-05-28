import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Comment from '../model/Comment'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_COMMENT_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const updateCommentResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Comment> => {
    if ('comment' in args) {
        let oldComment = context.db.comments.find(comment => comment.commentId === args.commentId)

        if (oldComment) {
            oldComment.text = args.comment.text ?? oldComment.text

            return new Promise<Comment>((resolve) => {
                resolve(oldComment!);
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

export { updateCommentResolver as default }