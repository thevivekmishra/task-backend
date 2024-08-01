import Task from '../model/task-model.js';
import User from '../model/user-model.js';

export const editTask = async (req, res, next) => {
    try {
        const { taskId } = req.params; // Get task ID from request params
        const { title, description, important, complete } = req.body; // Get updated task details from request body

        // Validate input
        if (!title && !description && important === undefined && complete === undefined) {
            return res.status(400).json({ message: "No fields to update" });
        }

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, important, complete },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.error("Failed to update task", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
