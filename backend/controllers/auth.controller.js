import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

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

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Error in the signup controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("logout");
};
