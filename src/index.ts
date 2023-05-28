import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import fs from 'fs';
import path from 'path'
import Mutation from './resolvers/mutation'
import Query from './resolvers/query'
import { Post } from './post/resolvers/get_post_resolver'
import { User } from './user/resolvers/get_user_resolver'
import { Comment } from './comment/resolvers/get_comment_resolver'
import AppContext from './AppContext'
import db from './data_sources/db'

const context: AppContext = {
  db: db
}

const yoga = createYoga<AppContext>({
  schema: createSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, "../src/type_defs/schema.graphql"), 'utf8'),
    resolvers: {
      Query,
      Mutation,
      User,
      Post,
      Comment
    }
  }),
  async context() {
    return context
  }
})

const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})