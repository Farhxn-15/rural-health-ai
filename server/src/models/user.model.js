import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },

  age: {
    type: Number,
    min: [1, "Age must be above 1"],
    max: [120, "Age seems unrealistic"],
  },

  mobile: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, "Mobile must be a valid 10-digit number"],
  },

  address: {
    type: String,
    trim: true,
    minlength: [5, "Address must be at least 5 characters long"],
    maxlength: [200, "Address is too long"],
  },

  bloodgroup: {
    type: String,
    uppercase: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", null],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
