import User from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    // Fetch data from req->body
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log("Error in finding user");
        console.log("error", error);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!existingUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // If user found then compare password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    // If password incorrect
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Incorrect password"
        });
    } else {
        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            },
            token
        });
    }
};
