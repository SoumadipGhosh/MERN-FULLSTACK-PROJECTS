import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

let port = process.env.PORT || 5000;

let app = express();

app.get('/', (req, res) => {
    res.send("Welcome to So2Mart Backend!");
});

app.listen(port, () => {
    console.log("Server is running on port ", port);
    connectDB();
});