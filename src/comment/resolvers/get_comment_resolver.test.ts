import { describe, expect, it } from 'vitest'
import { any, mock } from 'jest-mock-extended'
import AppContext from '../../AppContext'
import testAppContext from '../../__mock__/AppContext'
import { getCommentForPostResolver, getCommentForUserResolver, Comment } from './get_comment_resolver'
import { GraphQLResolveInfo } from 'graphql'
import { ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing getCommentForPostResolver', () => {
    it.concurrent('Check Error Thrown when Post Id Key is not present in Parent', async () => {
        let parent: Record<string, unknown> = {}
        let context: AppContext = testAppContext

        let result = getCommentForPostResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check Error Thrown when the given Post Id is not present in DB', async () => {
        let parent: Record<string, unknown> = {}
        parent["postId"] = "-101"

        let context: AppContext = testAppContext

        let result = getCommentForPostResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).length).toBe(0)
    })

    it.concurrent('Check The Post return if the given Post Id is present in DB', async () => {
        let parent: Record<string, unknown> = {}
        parent["postId"] = "1"

        let context: AppContext = testAppContext

        let result = getCommentForPostResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).length).toBe(2)
    })
})

describe('testing getCommentForUserResolver', () => {
    it.concurrent('Check Error Thrown when User Id Key is not present in Parent', async () => {
        let parent: Record<string, unknown> = {}
        let context: AppContext = testAppContext

        let result = getCommentForUserResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check Error Thrown when the given User Id is present in DB', async () => {
        let parent: Record<string, unknown> = {}
        parent["userId"] = "-101"

        let context: AppContext = testAppContext

        let result = getCommentForUserResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).length).toBe(0)
    })

    it.concurrent('Check Error Thrown when the given User Id is not present in DB', async () => {
        let parent: Record<string, unknown> = {}
        parent["userId"] = "1"

        let context: AppContext = testAppContext

        let result = getCommentForUserResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect((await result).length).toBe(1)
    })
})
