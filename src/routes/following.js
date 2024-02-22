const express = require('express')
const { verifyToken }  = require('../services/verifyToken.js');
const { addFollowing, removeFollowing } = require('../controllers/following.js')
const router = express.Router();

router.post('/', verifyToken, addFollowing)
router.delete('/:id', verifyToken, removeFollowing);

module.exports = router