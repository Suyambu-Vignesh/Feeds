import { describe, expect, it } from 'vitest'
import { any, mock } from 'jest-mock-extended'
import updateCommentResolver from './update_comment_resolver'
import { MutationArgument, UpdateCommentArgs } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import { GraphQLResolveInfo } from 'graphql'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_COMMENT_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing updateCommentResolver', () => {
    it.concurrent('Check Error Thrown when commentId is not present in args', async () => {
        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            postId: "1"
        }
        let context: AppContext = testAppContext

        let result = updateCommentResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check Error Thrown when comment is not present in DB', async () => {
        let parent: Record<string, unknown> = {}

        let updatedCommentArgs: UpdateCommentArgs = {
            commentId: "101",
            comment: {
                text: "New Updated text"
            }
        }

        let context: AppContext = testAppContext

        let result = updateCommentResolver(
            parent,
            updatedCommentArgs,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_COMMENT_NOT_FOUND)
    })

    it.concurrent('Check the comment got updated when passing right comment Id', async () => {
        let parent: Record<string, unknown> = {}
        let newValue2 = "New Updated text"
        let updatedCommentArgs1: UpdateCommentArgs = {
            commentId: "1",
            comment: {
                
            }
        }
        let updatedCommentArgs2: UpdateCommentArgs = {
            commentId: "1",
            comment: {
                text: newValue2
            }
        }
        let context: AppContext = testAppContext

        let result1 = await updateCommentResolver(
            parent,
            updatedCommentArgs1,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result1.text).equals("comment 1")

        let result2 = await updateCommentResolver(
            parent,
            updatedCommentArgs2,
            context,
            mock<GraphQLResolveInfo>()
        )
        
        expect(result2.text).equals(newValue2)
    })
})
