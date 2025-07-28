import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './Routes/auth.js'
import notesRoutes from './Routes/notes.js'
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use("/api/users",authRoutes);
app.use("/api/notes",notesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}



connectDB();

app.listen(PORT , ()=>{
    console.log(`server started back to terminal here am i am ${PORT} `)
})