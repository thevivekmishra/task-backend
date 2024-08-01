import Task from '../model/task-model.js';
import User from '../model/user-model.js';

export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId; // Get userId from auth middleware

        console.log('Request Body:', req.body);
        console.log('User ID from auth middleware:', userId);

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are both required"
            });
        }

        // Create new task
        const newTask = new Task({ title, description });
        const saveTask = await newTask.save();

        console.log('Task created successfully:', saveTask);

        // Update user's tasks
        const taskId = saveTask._id;
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { tasks: taskId } }, { new: true });

        console.log('Updated user:', updatedUser);

        res.status(201).json({
            message: "Task created successfully",
            task: saveTask
        });
    } catch (error) {
        console.error("Failed to create task", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
