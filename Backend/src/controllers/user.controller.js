const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const uploadOnClouinary = require("../utils/cloudinary");


exports.showUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({createdAt:-1});
  
  return res.status(200).json(new ApiResponse(200, users, `Total registered users: ${users.length}`));
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, social_profile } = req.body;
  
  if (!name || !social_profile) throw new ApiError(400, "All fields are required");

  const images = await uploadOnClouinary(req.files);
  const imageRecords = images.map((image) => image.secure_url);

  const users = await User.create({ name, social_profile, images: imageRecords ? imageRecords : [] });

  if (!users)
    throw new ApiError(400, "No user created");
  
  return res.status(200).json(new ApiResponse(200, users, "User created"));
});
