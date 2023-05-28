import AppContext from '../AppContext'
import Post from "../post/model/Post"
import User from "../user/model/User"
import Comment from "../comment/model/Comment"
import DataBase from "../data_sources/DataBase"

const users: Array<User> = [
    {
        userId: "1",
        name: "name1",
        email: "name1@email.com"
    },
    {
        userId: "2",
        name: "name1",
        email: "name2@email.com"
    }
]

const posts: Array<Post> = [
    {
        postId: "1",
        title: "post 1",
        body: "body 1",
        published: true,
        userId: "1"
    },
    {
        postId: "2",
        title: "post 1",
        body: "body 1",
        published: true,
        userId: "1"
    },
    {
        postId: "3",
        title: "post 1",
        body: "body 1",
        published: true,
        userId: "2"
    }
]

const comments: Array<Comment> = [
    {
        commentId: "1",
        text: "comment 1",
        userId: "1",
        postId: "1"
    },
    {
        commentId: "2",
        text: "comment 2",
        userId: "2",
        postId: "1"
    }
]

const db: DataBase = {
    users: users,
    posts: posts,
    comments: comments
}

const testAppContext: AppContext = {
    db: db
}

export { testAppContext as default }
