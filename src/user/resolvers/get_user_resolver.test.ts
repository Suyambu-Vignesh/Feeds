import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import { getUserForUserIdResolver } from '../resolvers/get_user_resolver'
import { GraphQLResolveInfo } from 'graphql'
import { any, mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing getUserForUserIdResolver', () => {
    it.concurrent('Check getUserForUserIdResolver for a valid user Id', async () => {

        let parent: Record<string, unknown> = {}
        parent["userId"] = "1"

        let context: AppContext = testAppContext

        let result = await getUserForUserIdResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result.name).toBe("name1")
        expect(result.email).toBe("name1@email.com")
    })

    it.concurrent('Check deleteUserResolver for with In-Correct arg', async () => {

        let parent: Record<string, unknown> = {}
        let context: AppContext = testAppContext

        let result = getUserForUserIdResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check deleteUserResolver for with In-Correct user id', async () => {
        
        let parent: Record<string, unknown> = {}
        parent["userId"] = "1001"
        let context: AppContext = testAppContext

        let result = getUserForUserIdResolver(
            parent,
            any(),
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_USER_NOT_FOUND)
    })
})