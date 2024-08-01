import express from 'express';
import { signup } from '../controller/signup.js';
import { login } from '../controller/login.js';
import { getAllUser } from '../controller/getAllUser.js';
import { getUserById } from '../controller/getUserById.js';

const router = express.Router();

// Define routes

router.post("/signup", signup);
router.post("/login", login);
router.get("/getalluser", getAllUser);
router.get("/getuserbyid/:id",getUserById);

export default router;
