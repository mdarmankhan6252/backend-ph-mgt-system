import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpsStatus from 'http-status'
import { UserServices } from "./user.service";


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
   Promise.resolve(fn(req, res, next)).catch((error: any) => {
      console.log(error);
      next(error)

   })
}



export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const user = await UserServices.createUser(req.body);

   res.status(httpsStatus.CREATED).json({
      success: true,
      message: 'User created successfully!',
      data: user
   })
})



export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const users = await UserServices.getAllUsers();

   res.status(httpsStatus.OK).json({
      success: true,
      message: 'All users retrieved successfully!',
      data: users
   })
})




/*

1. route matching 
2. controller
3. services
4. model 
5. database

*/