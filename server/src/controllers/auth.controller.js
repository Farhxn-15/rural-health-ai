import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { email, password, age, mobile, address, bloodgroup } = req.body;

  // Basic field check
  if (!email || !password) {
    return next(errorHandler(400, " Email, and Password are required"));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      age,
      mobile,
      address,
      bloodgroup,
    });

    await newUser.save();
    res.status(201).json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "Email and Password are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Create JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password before sending response
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  return res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send({
      error: false,
      message: "User have been logged out!",
    });
};
