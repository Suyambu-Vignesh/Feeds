import Comment from "../comment/model/Comment"
import Post from "../post/model/Post"
import User from "../user/model/User"

interface DataBase {
    users: Array<User>,
    posts: Array<Post>,
    comments: Array<Comment>
}

export { DataBase as default }
