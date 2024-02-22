const jwt = require('jsonwebtoken')
const { createError } = require('./createError'); 
require('dotenv').config();

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const verifyToken = (request, response, next) => {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return next(createError(401, 'token missing or invalid'));
    }
    request.id = decodedToken.id
    next();
}

module.exports = { verifyToken };