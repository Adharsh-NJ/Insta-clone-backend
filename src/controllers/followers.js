const User = require('../models/user.js');

const addFollower = async (request, response, next) => {
    const { userId } = request.body
    const user = await User.findById(request.id);
    try {
        const newFollower = user.followers.concat(userId)
        user.followers = newFollower;
        await user.save();
        response.status(201).json(user);
    }catch(err) {
        next(err);
    }
}

const removeFollower = async (request, response, next) => {
    const user = await User.findById(request.id);
    const followerIndex = user.followers.findIndex(user => user._id == request.params.id)
    try {
        const newFollower = user.followers.filter(follower => follower !== user.followers[followerIndex])
        user.followers = newFollower
        await user.save();
        response.status(200).send('User has beeen removed.');
    }catch(err) {
        next(err);
    }
}

module.exports = { addFollower, removeFollower }