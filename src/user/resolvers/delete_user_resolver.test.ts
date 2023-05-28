import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import deleteUserResolver from '../resolvers/delete_user_resolver'
import { DeleteUserArgs, MutationArgument } from '../../resolvers/mutation'
import { GraphQLResolveInfo } from 'graphql'
import { mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing deleteUserResolver', () => {
    it.concurrent('Check deleteUserResolver for a valid user Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: DeleteUserArgs = {
            userId: "1"
        }

        let context: AppContext = testAppContext

        let result = await deleteUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result.name).toBe("name1")
        expect(result.email).toBe("name1@email.com")
        expect(result.name).toBe("name1")
    })

    it.concurrent('Check deleteUserResolver for a invalid user Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: DeleteUserArgs = {
            userId: "101"
        }

        let context: AppContext = testAppContext

        let result = deleteUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_USER_NOT_FOUND)
    })

    it.concurrent('Check deleteUserResolver for with In-Correct arg', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "1",
                postId: "111"
            }
        }
        let context: AppContext = testAppContext

        let result = deleteUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})