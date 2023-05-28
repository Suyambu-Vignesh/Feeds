import { MutationArgument } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import Post from '../model/Post'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

const createPostResolver = (parent: Record<string, unknown>, args: MutationArgument, context: AppContext, info: GraphQLResolveInfo): Promise<Post> => {
    if ('newPost' in args) {
        let user = context.db.users.find(user => user.userId === args.newPost.userId)

        if (typeof user === 'undefined') {
            return new Promise((_, reject) => {
                reject(new Error(ERROR_MESSAGE_USER_NOT_FOUND))
            })
        }

        // todo avoid saving duplicate post. (like timeout client push two times)

        let post: Post = {
            postId: uuidv4(),
            ...args.newPost
        }

        context.db.posts.push(post)
    
        return new Promise<Post>((resolve) => {
            resolve(post);
        })
    }

    return new Promise((_, reject) => {
        reject(new Error(ERROR_MESSAGE_INCORRECT_ARG))
    })
}

export { createPostResolver as default }
