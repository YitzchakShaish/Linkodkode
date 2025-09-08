import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from "dotenv";
import postsRouter from "./routers/postsRouter.js"
import path from 'path';
import { fileURLToPath } from 'url';


config()
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middleware to parse cookies
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/posts", postsRouter);

// Error handling middleware
app.use((req, res) => {
    console.log(req.ip);

    res.status(404).json('Not found');
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
