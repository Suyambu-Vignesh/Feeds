import { describe, expect, it } from 'vitest'
import { mock } from 'jest-mock-extended'
import AppContext from '../../AppContext'
import { GraphQLResolveInfo } from 'graphql'
import deleteCommentResolver from '../resolvers/delete_comment_resolver'
import { MutationArgument } from '../../resolvers/mutation'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_COMMENT_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing deleteCommentResolver', () => {

    it.concurrent('Check deleteComment for a comment with correct comment ID', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            commentId: "1"
        }
        let context: AppContext = testAppContext

        let result = deleteCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).userId).toBe("1")
    })

    it.concurrent('Check deleteComment for a comment with incorrect comment ID', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            commentId: "100010"
        }
        let context: AppContext = testAppContext

        let result = deleteCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_COMMENT_NOT_FOUND)
    })

    it.concurrent('Check deleteComment for a comment with incorrect arguments', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            postId: "1"
        }
        let context: AppContext = testAppContext

        let result = deleteCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})