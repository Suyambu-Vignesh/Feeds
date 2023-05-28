import { IResolvers } from '@graphql-tools/utils'
import AppContext from '../AppContext'

const queryResolver: IResolvers<any, AppContext> = {
    users(parent, args, context, info) {
        if (args.userId) {
            return context.db.users.filter(user => user.userId === args.userId)
        } else {
            return context.db.users
        }
    },
    posts(parent, args, { db }, info) {
        if (args.postId) {
            return db.posts.filter(post => post.postId === args.postId)
        } else {
            return db.posts
        }
    },

    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export { queryResolver as default }