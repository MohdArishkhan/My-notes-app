import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // If token is missing or doesn't start with Bearer
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "no token inside the head of req" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        console.error("Auth error:", error.message); // helpful for debugging
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};
