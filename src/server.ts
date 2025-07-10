import express, { NextFunction, request, Request, response, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './app/config/db';
import userRouter from './app/modules/users/user.route';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/errorHelpers/notFound';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

//middlewares
app.use(express.json());
app.use(cors())

//connection with mongodb
connectDB();


//root routes
app.get('/', (req: Request, res: Response) => {
   res.send("Server Is Working.")
})


//application routes
app.use('/api/v1', router)



app.listen(port, () => {
   console.log("Server is working", port);
})

//error handling => globally

app.use(globalErrorHandler)
app.use(notFound)