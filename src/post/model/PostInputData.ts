export interface CreatePostData {
    title: String,
    body: String,
    published: Boolean,
    userId: String
}

export interface UpdatePostData {
    title?: String,
    body?: String,
    published?: Boolean
}