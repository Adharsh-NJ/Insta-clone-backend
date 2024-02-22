const User = require("../models/user.js");
const { createError } = require("../services/createError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../libs/cloudinary.js");
const fs = require("fs-extra");
require("dotenv").config();

const register = async (request, response, next) => {
  const { username, name, password, followers, following, posts, comments } =
    request.body;

  const newPassword = bcrypt.hashSync(password, 10);
  let image;

  if (!username) {
    return next(createError(400, "No username"));
  }

  if (request.files?.image) {
    const result = await uploadImage(request.files.image.tempFilePath, "users");
    await fs.remove(request.files.image.tempFilePath);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const user = new User({
    profile: image,
    username,
    name,
    password: newPassword,
    followers,
    following,
    posts,
    comments,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
};

const login = async (request, response, next) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username: username });
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!(user && correctPassword)) {
    return next(createError(400, "invalid username or password"));
  }
  try {
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    response.status(200).json({
      token: token,
      username: user.username,
      name: user.name,
      id: user._id,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login };
