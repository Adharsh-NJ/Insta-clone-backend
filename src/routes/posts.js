const express = require('express')
const { verifyToken } = require('../services/verifyToken.js');
const { getPosts, newPost, getPost, deletePost, editPost } = require('../controllers/posts.js')
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, newPost);
router.put('/:id', verifyToken, editPost)
router.delete('/:id', verifyToken, deletePost);

module.exports = router