import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
    let statusCode = 500;
    let message = 'Something went  wrong';

    if(err instanceof AppError){
        statusCode = err.statusCode,
        message = err.message
    }

    res.status(statusCode).json({
       success: false,
       message,
       error: err,
       stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
 }
 