import User from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists" 
            });
        }
        
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user instance
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('User saved successfully:', savedUser);
        return res.status(201).json({ 
            user: { 
                id: savedUser._id, 
                name: savedUser.name, 
                email: savedUser.email 
            },
            token 
        });
    } 
    catch (error) {
        console.error('Error during signup process:', error);
        return res.status(500).json({ message: 'Failed to save user' });
    }
};
