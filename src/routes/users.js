const express = require('express')
const { getUsers, deleteUser, getUser } = require('../controllers/users.js');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser)
router.delete('/:id', deleteUser);

module.exports = router