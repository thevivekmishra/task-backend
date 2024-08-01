import express from 'express';
import auth from '../middleware/auth.js';
import { createTask } from '../controller/createTask.js';
import { getAllTasks } from '../controller/getAllTasks.js';
import { getTasksByUserId } from '../controller/getTasksByUserId.js';
import { deleteTask } from '../controller/deleteTask.js';
import { editTask } from '../controller/editTask.js';
import { getImportantTasks } from '../controller/getImportantTask.js';
import { getCompletedTasks } from '../controller/getCompletedTask.js';
import { updateCompletedTask } from '../controller/updateCompletedTask.js';
import { updateIncompleteTask } from '../controller/updateIncompleteTask.js';
import { updateImportantTask } from '../controller/updateImportantTask.js';
import { getIncompletedTasks } from '../controller/getIncompletedTask.js';


const router = express.Router();

router.post('/createtask', auth, createTask);
router.get('/getalltask', auth, getAllTasks);
router.get('/importanttask', auth, getImportantTasks);
router.get('/completedtask', auth, getCompletedTasks);
router.get('/incompletedtask', auth, getIncompletedTasks);
router.get('/gettaskbyuserid/:userId', auth, getTasksByUserId)
// router.get('/gettaskbyuserid', auth, getTasksByUserId);
router.put('/completed/:taskId', auth, updateCompletedTask);
router.put('/important/:taskId', auth, updateImportantTask);
router.put('/incomplete/:taskId', auth, updateIncompleteTask);
router.delete('/deletetask/:taskId', auth, deleteTask);
router.put('/updatetask/:taskId', auth, editTask);


export default router;

