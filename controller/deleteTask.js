import Task from '../model/task-model.js';
import User from '../model/user-model.js';

export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params; // Get task ID from request params
        const userId = req.userId; // Get user ID from auth middleware

        // Find and delete the task
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Remove task reference from the user's tasks
        await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete task", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
