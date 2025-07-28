import express from "express";
import User from "../Models/User.js";
import { protect } from "../middleware/authmiddleware.js";
import generateToken from "../tokengen/tokengenerator.js";

const router = express.Router();

//register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "not all fields filled" })

        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" })
        }
        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.log("auth.js error")
    }
})

//login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log("Login request body:", req.body);
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error("error in /login:", error.message);
        res.status(500).json({ message: "Server error while logging in" });
    }
});


//me
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});


export default router;
