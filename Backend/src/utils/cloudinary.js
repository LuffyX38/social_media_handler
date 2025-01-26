const cloudinary = require("cloudinary").v2;
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (imgFiles) => {
    if (!imgFiles) return null;
    const files = imgFiles;
    const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "user_folder" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            stream.end(file.buffer);
            
        });
    });

    const results = await Promise.all(uploadPromises);
    return results;
};

module.exports = uploadOnCloudinary;
