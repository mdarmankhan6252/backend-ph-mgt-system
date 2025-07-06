import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './app/config/db';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cors())

connectDB();

app.get('/', (req: Request, res: Response) => {
   res.send("Server Is Working.")
})

app.listen(port, () => {
   console.log("");
})