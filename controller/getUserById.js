import User from "../model/user-model.js";

export const getUserById = async (req, res, next) => {
    // Fetch user ID from request params
    const userId = req.params.id;

    let user;
    try {
        // Find user by ID
        user = await User.findById(userId);
    } catch (error) {
        console.log("Error in finding user by ID");
        console.log("error", error);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
            // Add other fields as needed
        }
    });
};
