const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    content: String,
    likes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Comment = model('Comment', CommentSchema)

module.exports = Comment;