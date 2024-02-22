const express = require('express')
const { addFollower, removeFollower } = require('../controllers/followers.js')
const { verifyToken } = require('../services/verifyToken.js');
const router = express.Router();

router.post('/', verifyToken, addFollower);
router.delete('/:id', verifyToken, removeFollower);

module.exports = router