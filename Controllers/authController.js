import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Exclude password from response
    const { password: _, ...userData } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  });
};

export const checktoken = (req, res) => {
  const {token} =req.body
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: `Hello ${user.email}, you are authenticated.` });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
