import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import deletePostResolver from '../resolvers/delete_post_resolver'
import { DeletePostArgs, MutationArgument } from '../../resolvers/mutation'
import { GraphQLResolveInfo } from 'graphql'
import { mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing deleteCommentResolver', () => {

    it.concurrent('Check deletePost for a Post with correct Post ID', async () => {

        let parent: Record<string, unknown> = {}
        let args: DeletePostArgs = {
            postId: "1"
        }
        let context: AppContext = testAppContext

        let result = deletePostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).postId).toBe("1")
    })

    it.concurrent('Check deletePost for a Post with incorrect Post ID', async () => {

        let parent: Record<string, unknown> = {}
        let args: DeletePostArgs = {
            postId: "100010"
        }
        let context: AppContext = testAppContext

        let result = deletePostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_POST_NOT_FOUND)
    })

    it.concurrent('Check deletePost for a Post with incorrect arguments', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            commentId: "1"
        }
        let context: AppContext = testAppContext

        let result = deletePostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})
