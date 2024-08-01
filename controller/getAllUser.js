import User from "../model/user-model.js";

export const getAllUser = async (req, res, next) => {
    let users
    try {
        users = await User.find();
        
    } catch (error) {
        console.error("Error fetching users", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if(!users){
        return res.status(404).json({message:"No User Found"})
    }
    return res.status(200).json({users})
};


