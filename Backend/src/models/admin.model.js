const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
          }),
        message: "Password must be at least 8 character long !!",
      },
    },
    refreshToken: String,
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();

});

adminSchema.methods.passwordIsCorrect = async function (userPassword) {
  const correctPassword = await bcrypt.compare(userPassword, this.password);
  return correctPassword;
};


adminSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DIES,
    }
  );
  return token;
};

adminSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DIES,
    }
  );
  return token;
};



const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
