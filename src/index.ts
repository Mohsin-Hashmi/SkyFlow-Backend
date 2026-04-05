import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db-connection";
import { authRouter } from "./routes/auth/auth.routes";
import { airLineRouter } from "./routes/airline/airline.routes";
import cookieparser from 'cookie-parser';

const app: Application = express();
const PORT = process.env.PORT || 4000;

// =========== Middleware =========== //
app.use(cookieparser());
app.use(express.json());
``
// =========== Routes =========== //
app.use('/auth', authRouter);
app.use('/airline', airLineRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

// =========== Database Connection =========== //
connectDB()
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})