import Task from '../model/task-model.js';
import User from '../model/user-model.js';

export const updateCompletedTask = async (req, res, next) => {
    try {
        const { taskId } = req.params; // Get the task ID from URL parameters
        const userId = req.userId; // Get user ID from auth middleware

        // Find the task and check if it belongs to the user
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if task belongs to the user
        const user = await User.findById(userId);
        if (!user || !user.tasks.includes(taskId)) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // Toggle the task's completion status
        task.complete = !task.complete;
        await task.save();

        res.status(200).json({
            message: `Task updated to ${task.complete ? 'completed' : 'incomplete'} successfully`,
            task
        });
    } catch (error) {
        console.error("Failed to update task completion status", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
