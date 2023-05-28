export interface CreateCommentData {
    text: String,
    userId: String,
    postId: String
}

export interface UpdateCommentData {
    text?: String
}