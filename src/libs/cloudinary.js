const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadImage = async (filePath, folderName) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: folderName
    });
}

const removeImage = async id => {
    return await cloudinary.v2.uploader.destroy(id);
}

module.exports = { uploadImage, removeImage }