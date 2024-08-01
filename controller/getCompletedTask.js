import User from '../model/user-model.js';
import Task from '../model/task-model.js';

export const getCompletedTasks = async (req, res, next) => {
    try {
        const userId = req.userId; // Get user ID from auth middleware

        // Fetch the user to get their associated task IDs
        const user = await User.findById(userId).populate({
            path: 'tasks',
            match: { complete: true }, // Filter tasks by completion status
            options: { sort: { createdAt: -1 } } // Optionally sort by creation date (latest first)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const completedTasks = user.tasks;

        res.status(200).json({
            message: "Completed tasks retrieved successfully",
            tasks: completedTasks
        });
    } catch (error) {
        console.error("Failed to retrieve completed tasks", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
