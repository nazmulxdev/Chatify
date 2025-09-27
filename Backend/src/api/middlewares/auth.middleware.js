import jwt from "jsonwebtoken";
import { envFiles } from "../../config/env.js";
import User from "../../models/User.js";

const verifyToken = async (req, res, next) => {
  const token = req?.cookies?.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    //   jwt.verify(token, envFiles.JWT_SECRET, (error, decoded) => {
    //     if (error) {
    //       return res.status(401).json({ message: "Unauthorized access." });
    //     }
    //     const user= await User.findById(decoded.userId).select("-password");
    //     if(!user){
    //         return res.status(404).json({message:"User not found."})
    //     }
    //     req.user = user;
    //     next();
    //   });

    const decoded = jwt.verify(token, envFiles.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("This error from auth middleware function", error);
  }
};

export { verifyToken };
