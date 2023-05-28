import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Post from '../model/Post'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const deletePostResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Post> => {
    if ('postId' in args) {
        let post: Post | null = null
        // todo: delete all comments related to this post

        for (let index = 0; index < context.db.posts.length; index++) {
            let post = context.db.posts[index]

            if (post.postId === args.postId) {
                let posts = context.db.posts.splice(index, 1)

                if (posts.length === 1) {
                    return new Promise<Post>((resolve) => {
                        resolve(posts[0]!);
                    })
                }
            }
        }

        return new Promise<Post>((_, reject) => {
            reject(new Error(ERROR_MESSAGE_POST_NOT_FOUND))
        })
    }

    return new Promise<Post>((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { deletePostResolver as default }