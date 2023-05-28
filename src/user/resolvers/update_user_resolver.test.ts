import { describe, expect, it } from 'vitest'
import { any, mock } from 'jest-mock-extended'
import updateUserResolver from './update_user_resolver'
import { MutationArgument, UpdateUserArgs } from '../../resolvers/mutation'
import AppContext from '../../AppContext'
import { GraphQLResolveInfo } from 'graphql'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_USER_NOT_FOUND, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing updateUserResolver', () => {
    it.concurrent('Check Error Thrown when UserId is not present in args', async () => {
        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            commentId: "1"
        }
        let context: AppContext = testAppContext

        let result = updateUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })

    it.concurrent('Check Error Thrown when UserId is not present in DB', async () => {
        let parent: Record<string, unknown> = {}

        let updatedArgs: UpdateUserArgs = {
            userId: "101",
            userInput: {
                name: "new Name",
                email: "newEmail@name.com",
                age: 20
            }
        }

        let context: AppContext = testAppContext

        let result = updateUserResolver(
            parent,
            updatedArgs,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_USER_NOT_FOUND)
    })

    it.concurrent('Check the User got updated when passing right User Id', async () => {
        let parent: Record<string, unknown> = {}
        let newValue = "New Updated text"

        let updatedCommentArgs1: UpdateUserArgs = {
            userId: "1",
            userInput: {
                name: "new Name",
                email: "newEmail@name.com",
                age: 20
            }
        }

        let updatedCommentArgs2: UpdateUserArgs = {
            userId: "2",
            userInput: {
                name: "new Name2",
                email: "newEmail2@name.com",
            }
        }
        let context: AppContext = testAppContext

        let result1 = await updateUserResolver(
            parent,
            updatedCommentArgs1,
            context,
            mock<GraphQLResolveInfo>()
        )

        let result2 = await updateUserResolver(
            parent,
            updatedCommentArgs2,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result1.name).equals("new Name")
        expect(result1.email).equals("newEmail@name.com")
        expect(result1.age).equals(20)

        expect(result2.name).equals("new Name2")
        expect(result2.email).equals("newEmail2@name.com")
        expect(result2.age).toBeUndefined()
    })
})