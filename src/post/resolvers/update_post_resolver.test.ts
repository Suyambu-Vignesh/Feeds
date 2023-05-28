import { describe, expect, it } from 'vitest'
import { any, mock } from 'jest-mock-extended'
import updatePostResolver from './update_post_resolver'
import { MutationArgument, UpdatePostArgs } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import { GraphQLResolveInfo } from 'graphql'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_POST_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing updatePostResolver', () => {
    it.concurrent('Check Error Thrown when postId is not present in args', async () => {
        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            commentId: "1"
        }
        let context: AppContext = testAppContext

        let result = updatePostResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check Error Thrown when comment is not present in DB', async () => {
        let parent: Record<string, unknown> = {}

        let updatedCommentArgs: UpdatePostArgs = {
            postId: "101",
            post: {
                
            }
        }

        let context: AppContext = testAppContext

        let result = updatePostResolver(
            parent,
            updatedCommentArgs,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_POST_NOT_FOUND)
    })

    it.concurrent('Check the comment got updated when passing right comment Id', async () => {
        let parent: Record<string, unknown> = {}
        let newValue = "New Updated text"

        let updatedCommentArgs1: UpdatePostArgs = {
            postId: "1",
            post: {
            }
        }

        let updatedCommentArgs2: UpdatePostArgs = {
            postId: "1",
            post: {
                title: "New Title",
                body: "New Body",
                published: false
            }
        }
        let context: AppContext = testAppContext

        let result1 = await updatePostResolver(
            parent,
            updatedCommentArgs1,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result1.title).equals("post 1")
        expect(result1.body).equals("body 1")
        expect(result1.published).toBe(true)

        let result2 = await updatePostResolver(
            parent,
            updatedCommentArgs2,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result2.title).equals("New Title")
        expect(result2.body).equals("New Body")
        expect(result2.published).toBe(false)
    })
})
