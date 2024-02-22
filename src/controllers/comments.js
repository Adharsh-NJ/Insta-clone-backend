const Comment = require("../models/comment.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const { createError } = require("../services/createError.js");

const getComments = async (request, response, next) => {
  try {
    const comments = await Comment.find({})
      .populate("user", { username: 1, profile: 1 })
      .populate("post", { comments: 0 })
      .populate("likes", { profile: 0, username: 0 });
    response.status(200).json(comments);
  } catch (e) {
    next(e);
  }
};

const newComment = async (request, response, next) => {
  const { content, likes, post } = request.body;
  const postId = await Post.findById(post);
  const userId = await User.findById(request.id);
  const comment = new Comment({
    content,
    likes,
    post: postId._id,
    user: userId._id,
  });
  if (!content) {
    return next(createError(204, "No content"));
  } else if (!postId || !userId) {
    return next(createError(404, "Not found"));
  }

  try {
    const savedComment = await comment.save();
    postId.comments = postId.comments.concat(savedComment._id);
    userId.comments = userId.comments.concat(savedComment._id);
    await postId.save();
    await userId.save();
    response.status(201).json(savedComment);
  } catch (e) {
    next(e);
  }
};

const editComment = async (request, response, next) => {
  const commentId = request.params.id;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json(updatedComment);
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (request, response, next) => {
  const commentId = request.params.id;
  try {
    await Comment.findByIdAndDelete(commentId);
    response.status(200).send("Comment has been sucessfully deleted");
  } catch (e) {
    next(e);
  }
};

module.exports = { getComments, newComment, deleteComment, editComment };
