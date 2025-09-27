import User from "../../../models/User.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { generateToken } from "./jwt.controller.js";
import { sendWelcomeEmail } from "../email/email.controller.js";

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    const emailChecker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailChecker.test(email)) {
      return res.status(400).json({ message: "Invalid email formate." });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already exist." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      // sending a welcome email to the user
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (error) {
        console.log("Failed to send welcome email");
      }
    } else {
      res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.log("error in the signup controller", error);
    res.status(500).send({ message: "Server Error" });
  }
};
const login = async (req, res) => {
  try {
    res.send("login endpoint");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    res.send("logout endpoint");
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

export { signUp, login, logout };
