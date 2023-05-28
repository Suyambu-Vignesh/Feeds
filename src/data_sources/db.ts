import Post from "../post/model/Post"
import User from "../user/model/User"
import Comment from "../comment/model/Comment"
import DataBase from "./DataBase"

const users: Array<User> = [
    {
        userId: '1',
        name: 'Jim',
        email: 'Jim@feeds.com',
        age: 17,
    },
    {
        userId: '2',
        name: 'Jake',
        email: 'Jake@feeds.com',
        age: 27,
    },
    {
        userId: '3',
        name: 'Ann',
        email: 'Ann@feeds.com',
        age: 24,
    },
    {
        userId: '4',
        name: 'bob',
        email: 'bob@feeds.com',
        age: 24,
    }
]

const posts: Array<Post> = [
    {
        postId: 'p1',
        title: 'title1',
        body: 'body1',
        published: true,
        userId: '3'
    },
    {
        postId: 'p2',
        title: 'title2',
        body: 'body2',
        published: true,
        userId: '3'
    },
    {
        postId: 'p3',
        title: 'title3',
        body: 'body3',
        published: true,
        userId: '3'
    }, {
        postId: 'p4',
        title: 'title4',
        body: 'body4',
        published: true,
        userId: '1'
    },
    {
        postId: 'p5',
        title: 'title5',
        body: 'body5',
        published: true,
        userId: '1'
    },
    {
        postId: 'p7',
        title: 'title6',
        body: 'body6',
        published: true,
        userId: '2'
    },
    {
        postId: 'p6',
        title: 'title7',
        body: 'body7',
        published: true,
        userId: '2'
    }
]

const comments: Array<Comment> = [
    {
        commentId: 'c1',
        text: 'comment 1',
        userId: '1',
        postId: 'p4'
    },
    {
        commentId: 'c2',
        text: 'comment 2',
        userId: '1',
        postId: 'p1'
    },
    {
        commentId: 'c4',
        text: 'comment 4',
        userId: '1',
        postId: 'p2'
    },
    {
        commentId: 'c3',
        text: 'comment 3',
        userId: '2',
        postId: 'p2'
    },
    {
        commentId: 'c5',
        text: 'comment 5',
        userId: '2',
        postId: 'p3'
    },
    {
        commentId: 'c6',
        text: 'comment 6',
        userId: '3',
        postId: 'p5'
    }
]

const db: DataBase = {
    users: users,
    posts: posts,
    comments: comments
}

export { db as default }