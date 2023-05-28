import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import createCommentResolver from '../resolvers/create_comment_resolver'
import { MutationArgument } from '../../resolvers/mutation'
import { GraphQLResolveInfo } from 'graphql'
import { mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing createCommentResolver', () => {
    it.concurrent('Check createCommentResolver for a valid comment', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "1",
                postId: "1"
            }
        }
        let context: AppContext = testAppContext

        let result = await createCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result.userId).toBe("1")
        expect(result.text).toBe("New Comment")
    })

    it.concurrent('Check createCommentResolver for a comment with incorrect author Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "10",
                postId: "1"
            }
        }
        let context: AppContext = testAppContext

        let result = createCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_USER_NOT_FOUND)
    })

    it.concurrent('Check createCommentResolver for a comment with incorrect post Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "1",
                postId: "111"
            }
        }
        let context: AppContext = testAppContext

        let result = createCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_POST_NOT_FOUND)
    })

    it.concurrent('Check createCommentResolver for a comment with incorrect arguments', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            postId: "1"
        }
        let context: AppContext = testAppContext

        let result = createCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})