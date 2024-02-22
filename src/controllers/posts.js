const Post = require('../models/post.js');
const User = require('../models/user.js')
const { createError } = require('../services/createError.js');
const { uploadImage, removeImage } = require('../libs/cloudinary.js');
const fs = require('fs-extra');

const getPosts = async (request, response, next) => {
    try {
        const posts = await Post.find({}).populate('user', { username: 1, profile: 1 }).populate('comments', { post: 0 }).populate('likes', { profile: 0, username: 0 })
        response.status(200).json(posts)
    }catch(e){
        next(e)
    }
}

const getPost = async (request, response, next) => {
    const postId = request.params.id
    try {
        const post = await Post.findById(postId).populate('user', { username: 1, profile: 1 }).populate('comments', { post: 0 }).populate('likes', { profile: 0, username: 0 });
        response.status(200).json(post)
    }catch(e) {
        next(e)
    }
}

const newPost = async (request, response, next) => {
    const { content, likes, comments } = request.body;
    const user = await User.findById(request.id);
    let image;
    if(!user) {
        return next(createError(404, 'User not found'));
    }else if(!content) {
        return next(createError(204, 'No content'))
    }
    if (request.files?.image) {
        const result = await uploadImage(request.files.image.tempFilePath, "posts");
        await fs.remove(request.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
    }

    const post = new Post({
        image,
        content, 
        likes,
        user: user._id,
        comments
    })
    try {
        const savedPost = await post.save();
        user.posts = user.posts.concat(savedPost._id);
        await user.save();
        response.status(201).json(savedPost)
    }catch(e) {
        next(e)
    }
}

const editPost = async (request, response, next) => {
    const postId = request.params.id;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { $set: request.body }, { new: true });
        response.status(200).json(updatedPost);
    }catch(e) {
        next(e);
    }
}

const deletePost = async (request, response, next) => {
    const postId = request.params.id;
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (post && post.image.public_id) {
            await removeImage(post.image.public_id);
        }
        response.status(200).send('Post has been sucessfully deleted');
    }catch(e) {
        next(e);
    }
}

module.exports = { getPosts, newPost, getPost, deletePost, editPost };