const express = require('express')
const { addLike, removeLike } = require('../controllers/likes.js')
const { verifyToken } = require('../services/verifyToken.js');
const router = express.Router();

router.post('/', verifyToken, addLike);
router.delete('/:id', verifyToken, removeLike);

module.exports = router