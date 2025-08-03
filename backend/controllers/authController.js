import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";

export const signUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)) {
            console.log("Invalid email format");
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 8) {
            console.log("Enter strong password");
            return res.status(400).json({ message: "Enter strong password" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        if(!newUser) {
            console.log("User creation failed");
        }
        else console.log("User created successfully");
        
        let token = await genToken(newUser._id);
        if (!token) {
            console.log("Token generation failed");
        }
        else console.log("Token generated successfully");

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite : "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        if (!res.cookie) {
            console.log("Cookie setting failed");
        } else console.log("Cookie set successfully");

        console.log("User signed up successfully");
        
        return res.status(201).json({
            message: "User created successfully",
            user: { 
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({ message: `Signup error`, error: error.message });
    }
}