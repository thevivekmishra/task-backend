import User from '../model/user-model.js';
import Task from '../model/task-model.js';

export const getImportantTasks = async (req, res, next) => {
    try {
        const userId = req.userId; // Get user ID from auth middleware

        // Fetch the user to get their associated task IDs
        const user = await User.findById(userId).populate({
            path: 'tasks',
            match: { important: true }, // Filter tasks by importance
            options: { sort: { createdAt: -1 } } // Optionally sort by creation date (latest first)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const importantTasks = user.tasks;

        res.status(200).json({
            message: "Important tasks retrieved successfully",
            tasks: importantTasks
        });
    } catch (error) {
        console.error("Failed to retrieve important tasks", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
