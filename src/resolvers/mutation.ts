import { IResolvers } from '@graphql-tools/utils'
import AppContext from '../AppContext'
import { CreateUserProfileData, UpdateUserProfileData } from '../user/model/ProfileInputData'
import { CreatePostData, UpdatePostData } from '../post/model/PostInputData'
import { CreateCommentData, UpdateCommentData } from '../comment/model/CommentInputData'
import createUserResolver from '../user/resolvers/create_user_resolver'
import updateUserResolver from '../user/resolvers/update_user_resolver'
import deleteUserResolver from '../user/resolvers/delete_user_resolver'
import createPostResolver from '../post/resolvers/create_post_resolver'
import updatePostResolver from '../post/resolvers/update_post_resolver'
import deletePostResolver from '../post/resolvers/delete_post_resolver'
import createCommentResolver from '../comment/resolvers/create_comment_resolver'
import updateCommentResolver from '../comment/resolvers/update_comment_resolver'
import deleteCommentResolver from '../comment/resolvers/delete_comment_resolver'

const mutationResolver: IResolvers<Record<string, unknown>, AppContext, MutationArgument> = {
    createUser: createUserResolver,
    updateUser: updateUserResolver,
    deleteUser: deleteUserResolver,
    createPost: createPostResolver,
    updatePost: updatePostResolver,
    deletePost: deletePostResolver,
    createComment: createCommentResolver,
    updateComment: updateCommentResolver,
    deleteComment: deleteCommentResolver
}

export type MutationArgument = CreateUserArgs | UpdateUserArgs | DeleteUserArgs | CreatePostArgs | UpdatePostArgs | DeletePostArgs
    | CreateCommentArgs | UpdateCommentArgs | DeleteCommentArgs

export interface CreateUserArgs {
    newUserInput: CreateUserProfileData
}

export interface UpdateUserArgs {
    userId: String,
    userInput: UpdateUserProfileData
}

export interface DeleteUserArgs {
    userId: String
}

export interface CreatePostArgs {
    newPost: CreatePostData
}

export interface UpdatePostArgs {
    postId: String,
    post: UpdatePostData
}

export interface DeletePostArgs {
    postId: String
}

export interface CreateCommentArgs {
    newComment: CreateCommentData
}

export interface UpdateCommentArgs {
    commentId: String,
    comment: UpdateCommentData
}

export interface DeleteCommentArgs {
    commentId: String
}

export { mutationResolver as default }
