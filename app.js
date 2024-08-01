import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user-route.js';
import taskRoutes from './routes/task-routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'id']
}));

// app.use(cors())
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);

app.get("/", (req, res) => {
    res.send("HELLO");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully!!!');
    // console.log('MongoDB URL:', process.env.MONGODB_URL);

}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
    console.log(`App is running on port no ${PORT}`);
});
