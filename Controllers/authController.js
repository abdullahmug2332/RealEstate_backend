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

// ✅ Get All Users Controller
export const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error retrieving users" });
    }

    res.status(200).json(results);
  });
};

// ✅ Create User Controller
export const createUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // If email doesn't exist, insert the new user
    const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertSql, [name, email, password], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Error creating user" });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });
};

// ✅ Delete User Controller (protect user with ID = 1)
export const deleteUser = (req, res) => {
  const { id } = req.params;

  if (id == 1) {
    return res.status(403).json({ message: "You can never delete this user. He is the owner of Abdullah Real Estate." });
  }

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Error deleting user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};
