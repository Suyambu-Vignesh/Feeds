import { describe, expect, it } from 'vitest'
import AppContext from '../../AppContext'
import createUserResolver from '../resolvers/create_user_resolver'
import { CreateUserArgs, MutationArgument } from '../../resolvers/mutation'
import { GraphQLResolveInfo } from 'graphql'
import { mock } from 'jest-mock-extended'
import testAppContext from '../../__mock__/AppContext'
import { ERROR_MESSAGE_EMAIL_IN_USE, ERROR_MESSAGE_INCORRECT_ARG } from '../../utils/ErrorMessages'

describe('testing createUserResolver', () => {
    it.concurrent('Check createUserResolver for a valid Email', async () => {

        let parent: Record<string, unknown> = {}
        let args1: CreateUserArgs = {
            newUserInput: {
                name: "User Name 1",
                email: "userName1@feed.com"
            }
        }

        let args2: CreateUserArgs = {
            newUserInput: {
                name: "User Name 2",
                email: "userName2@feed.com",
                age: 18
            }
        }

        let context: AppContext = testAppContext

        let result1 = await createUserResolver(
            parent,
            args1,
            context,
            mock<GraphQLResolveInfo>()
        )

        let result2 = await createUserResolver(
            parent,
            args2,
            context,
            mock<GraphQLResolveInfo>()
        )


        expect(result1.name).toBe("User Name 1")
        expect(result1.email).toBe("userName1@feed.com")
        expect(result1.age).toBeUndefined()

        expect(result2.name).toBe("User Name 2")
        expect(result2.email).toBe("userName2@feed.com")
        expect(result2.age).toBe(18)
    })

    it.concurrent('Check createUserResolver for with used email Id', async () => {

        let parent: Record<string, unknown> = {}
        let args: CreateUserArgs = {
            newUserInput: {
                name: "User Name 1",
                email: "name1@email.com"
            }
        }

        let context: AppContext = testAppContext

        let result = createUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_EMAIL_IN_USE)
    })

    it.concurrent('Check createUserResolver for with In-Correct arg', async () => {

        let parent: Record<string, unknown> = {}
        let args: MutationArgument = {
            newComment: {
                text: "New Comment",
                userId: "1",
                postId: "111"
            }
        }
        let context: AppContext = testAppContext

        let result = createUserResolver(
            parent,
            args,
            context,
            mock<GraphQLResolveInfo>()
        )

        expect(result).rejects.toThrowError(ERROR_MESSAGE_INCORRECT_ARG)
    })
})