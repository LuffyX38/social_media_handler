const Admin = require("../models/admin.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
  try {
    const admin = await Admin.findById(userId);
    const refreshToken = admin.generateRefreshToken();
    const accessToken = admin.generateAccessToken();
    admin.refreshToken = refreshToken;
    admin.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(404, "Error while creating the token");
  }
};

exports.getMe = asyncHandler(async (req, res) => {
    const user = await Admin.findById(req.user._id).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, user, "data sent"));
});

exports.register = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) throw new ApiError(400, "Passwords are not matching");

  if (password.length < 8) throw new ApiError(400, "Password should be at least 8 characters long");

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await Admin.findOne({ email });

  if (user) throw new ApiError(400, "User already exists");
  // throw new ApiError(400, "User already exists");
  const admin = await Admin.create({ email, password });
  console.log(admin);
  if (!admin) throw new ApiError(400, "Error creating user");

  res
    .status(200)
    .json(new ApiResponse(200, admin, "User created successfully"));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // if (password.length < 8) throw new ApiError(400, "Password should be at least 8 characters long");
  if (!email || !password) throw new ApiError(400, "All fields are required");

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.passwordIsCorrect(password)))
    throw new ApiError(400, "Invalid user credentials");

  const { refreshToken, accessToken } = await generateToken(admin._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        `You've logged in successfully`
      )
    );
});

exports.logout = asyncHandler(async (req, res) => {
  const user = await Admin.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: new Date(0)
  };

  return res
    .setHeader("Cache-Control","no-store")
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, [], "Logged out successfully"));
});
