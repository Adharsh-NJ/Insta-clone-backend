const User = require('../models/user.js');

const addFollowing = async (request, response, next) => {
    const { userId } = request.body
    const user = await User.findById(request.id);
    try {
        const newUser = user.following.concat(userId)
        user.following = newUser;
        await user.save();
        response.status(201).json(user);
    }catch(err) {
        next(err);
    }
}

const removeFollowing = async (request, response, next) => {
    const user = await User.findById(request.id);
    const followIndex = user.following.findIndex(user => user._id == request.params.id)
    try {
        const newFollow = user.following.filter(following => following !== user.following[followIndex])
        user.following = newFollow
        await user.save();
        response.status(200).send('User has beeen removed.');
    }catch(err) {
        next(err);
    }
}

module.exports = { addFollowing, removeFollowing };