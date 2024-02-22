const express = require('express')
const { getComments, newComment, deleteComment, editComment } = require('../controllers/comments.js')
const { verifyToken } = require('../services/verifyToken.js');
const router = express.Router();

router.get('/', getComments);
router.post('/', verifyToken, newComment);
router.put('/:id', verifyToken, editComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router