import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Post from '../model/Post'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const updatePostResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Post> => {
    if ('post' in args) {
        var oldPost = context.db.posts.find(post => post.postId === args.postId)

        if (oldPost) {
            oldPost.title = args.post.title ?? oldPost.title
            oldPost.body = args.post.body ?? oldPost.body
            oldPost.published = args.post.published ?? oldPost.published

            return new Promise<Post>((resolve) => {
                resolve(oldPost!);
            })
        }

        return new Promise((_, reject) => {
            reject(new Error(ERROR_MESSAGE_POST_NOT_FOUND))
        })
    }

    return new Promise((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { updatePostResolver as default }