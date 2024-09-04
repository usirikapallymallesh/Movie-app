const userModel = require("../models/UserModel.js");
const dotenv = require("dotenv").config();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
// LOGIN USER
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    //
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const tokenData = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    // jwt token validation
    const token = await jwt.sign(tokenData, "mallesh", { expiresIn: "1d" });
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// log out function

const Logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      message: "logout successfully",
      success: true,
    });
};

// Register User
const Register = async (req, res) => {
  // console.log(req.body);

  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    await userModel.create({
      email,
      fullName,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (e) {
    // console.error(e);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { Register, Login ,Logout};
