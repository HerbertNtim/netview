import { ENV_VARS } from "../config/envVars.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const protectedRoute = async(req, res, next) => {
  try {
    const token = req.cookies["jwt_netview"];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if(!decode) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    if(!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log('Error in the protectedRoute middleware: ', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
