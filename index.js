import dotenv from "dotenv";
dotenv.config();
import db from './db.js';
import cors from 'cors';
import authRoutes from "./Routes/authRoutes.js"
import propertyRoutes from "./Routes/propertyRoutes.js"; 
import express from "express";
const app = express();
app.use("/images", express.static("images")); 

const PORT = process.env.PORT ;


app.use(express.json());
app.use(cors());

app.use("/",authRoutes)
app.use("/", propertyRoutes);


app.get("/test", (req, res) => {
  db.query("SELECT * from users", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.json({ message: "API is working!", data: data });
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
