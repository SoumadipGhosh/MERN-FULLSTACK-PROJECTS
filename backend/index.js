import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
dotenv.config();

let port = process.env.PORT || 5000;

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log("Server is running on port ", port);
    connectDB();
});