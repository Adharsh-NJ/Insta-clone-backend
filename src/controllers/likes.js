const User = require('../models/user.js');

const addLike = async (request, response, next) => {
    const { userId } = request.body
    const user = await User.findById(request.id);
    try {
        const newLike = user.likes.concat(userId);
        user.likes = newLike
        await user.save();
        response.status(201).json(user);
    }catch(e) {
        next(e)
    }
}

const removeLike = async (request, response, next) => {
    const user = await User.findById(request.id);
    const likeIndex = user.likes.findIndex(user => user._id == request.params.id)
    try {
        const newLike = user.likes.filter(like => like !== user.likes[likeIndex])
        user.likes = newLike
        await user.save();
        response.status(200).send('Like has beeen removed.');
    }catch(e) {
        next(e)
    }
}

module.exports = {
    addLike,
    removeLike
} 