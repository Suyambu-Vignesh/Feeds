import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import createPostResolver from '../resolvers/create_post_resolver'
import { CreatePostArgs, MutationArgument } from '../../resolvers/mutation'
import { GraphQLResolveInfo } from 'graphql'
import { mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing createPostResolver', () => {
    it.concurrent('Check createPostResolver for a valid Post', async () => {

        let parent: Record<string, unknown> = {}
        let args1: CreatePostArgs = {
            newPost: {
                title: "Post Title 1",
                body: "Post Body 1",
                published: false,
                userId: "1"
            }
        }
        let args2: CreatePostArgs = {
            newPost: {
                title: "Post Title 2",
                body: "Post Body 2",
                published: true,
                userId: "1"
            }
        }

        let context: AppContext = testAppContext

        let result1 = await createPostResolver(
            parent,
            args1,
            context,
            mock<GraphQLResolveInfo>()
        )

        let result2 = await createPostResolver(
            parent,
            args2,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result1.userId).toBe("1")
        expect(result1.title).toBe("Post Title 1")
        expect(result1.body).toBe("Post Body 1")
        expect(result1.published).toBe(false)

        expect(result2.userId).toBe("1")
        expect(result2.title).toBe("Post Title 2")
        expect(result2.body).toBe("Post Body 2")
        expect(result2.published).toBe(true)
    })

    it.concurrent('Check createPostResolver for a Posr with incorrect author Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: CreatePostArgs = {
            newPost: {
                title: "Post Title 1",
                body: "Post Body 1",
                published: false,
                userId: "-101"
            }
        }
        let context: AppContext = testAppContext

        let result = createPostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_USER_NOT_FOUND)
    })

    it.concurrent('Check createCommentResolver for a comment with incorrect args', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "1",
                postId: "111"
            }
        }
        let context: AppContext = testAppContext

        let result = createPostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})
