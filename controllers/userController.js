import User from "../models/User.js";
import createToken from "../token/createToken.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      for (const field of ["email", "password", "confirmPassword"]) {
        if (!req.body[field]) {
          return res.status(400).json(`${field} is required`);
        }
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(email)) {
      return res.json("Please enter a valid email address");
    }

    const already = await User.findOne({ email });
    if (already) {
      return res.status(400).json("email already exists");
    }

    if (!passwordRegex.test(password)) {
      return res.json(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    if (password !== confirmPassword) {
      return res.json("passwords do not match");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });
    createToken(res, user);
    res.json({
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("email and password are required");
  }

  const user = await User.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      createToken(res, user);
      res.json({ id: user._id, email: user.email });
    }
    else {
      res.status(500).json('invalid  password')
    }
  }
  else {
    res.status(500).json('invalid email')
  }
};

export const logOut = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

