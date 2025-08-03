import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { genToken } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }); // check if user already exists
        if (existingUser) { // if user exists, return error
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid email" });
        } // validate email format
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong Password" });
        } // validate password length
        let hashPassword = await bcrypt.hash(password, 10); // hash the password


        const user = await User.create({name, email, password: hashPassword}); // create new user
        let token = await genToken(user._id); // generate token for the user
        res.cookie("token",token,{
            httpOnly: true,
            secure:false, // set secure to true if using HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // token expiration time
        })
        return res.status(201).json(user)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `registration Error $(error)` });
    }
}