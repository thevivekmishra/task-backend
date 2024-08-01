import User from '../model/user-model.js';
import Task from '../model/task-model.js';

export const getTasksByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params; // Get userId from request parameters

        // Fetch the user to get their associated task IDs
        const user = await User.findById(userId).populate('tasks'); // Populate 'tasks' to get task details

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve all tasks associated with the user, sorted by creation date (latest first)
        const tasks = user.tasks.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json({
            message: "User tasks retrieved successfully",
            tasks
        });
    } catch (error) {
        console.error("Failed to retrieve tasks", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
