// db.js
import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: '',
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) {
    console.error("DB Update Error:", err);
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

export default db;
