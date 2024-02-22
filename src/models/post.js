const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    image: {
        public_id: String,
        url: String,
    },
    content: {
        type: String,
        required: true
    },
    likes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

const Post = model('Post', PostSchema)

module.exports = Post;