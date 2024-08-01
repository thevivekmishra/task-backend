// import Task from '../model/task-model.js';
// import User from '../model/user-model.js';

// export const getAllTasks = async (req, res, next) => {
//     try {
//         // Fetch all tasks from the database
//         const tasks = await Task.find();

//         // Check if tasks were found
//         if (!tasks.length) {
//             return res.status(404).json({ message: "No tasks found" });
//         }

//         // Send tasks in response
//         res.status(200).json({
//             message: "Tasks retrieved successfully",
//             tasks
//         });
//     } catch (error) {
//         console.error("Failed to retrieve tasks", error);
//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// };

import Task from '../model/task-model.js';
import User from '../model/user-model.js';

export const getAllTasks = async (req, res, next) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();

        // Check if tasks were found
        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }

        // Fetch the user details (assuming the user ID is available in the request, e.g., req.userId)
        const userId = req.userId; // Adjust this to however you get the user ID from the request
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send tasks and user details in response
        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Failed to retrieve tasks", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
