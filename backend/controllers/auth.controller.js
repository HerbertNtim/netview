import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSendCookie } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password length should be at least 6 characters",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username length should be at least 3 characters",
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/assets/avatar1.png", "/assets/avatar2.png", "/assets/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image
    });

    generateTokenAndSendCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   if(!email || !password) {
    return es.status(400).json({
      success: false,
      message: "All fields are required",
    });
   }

    const user = await User.findOne({ email: email });
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateTokenAndSendCookie(user._id, res);

    res.status(200).json({ success: true, message: "Logged In successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt_netview')
    res.status(200).json({success: true, message: 'Logged out successfully'});
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error"})
  }
};


export const authCheck = (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error"})
  }
}
