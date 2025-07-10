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

// const createUserFunction = async (req: Request, res: Response) => {
//    const user = await UserServices.createUser(req.body)

//    res.status(httpsStatus.CREATED).json({
//       message: "User created successfully!",
//       data: user
//    })
// }



// export const createUser = async (req: Request, res: Response, next: NextFunction) => {
//    // try {

//    //    createUserFunction(req, res)

//    //    res.status(httpsStatus.CREATED).json({
//    //       success: true,
//    //       message: 'User created successfully!',
//    //       data: user
//    //    })

//    // } catch (error: any) {
//    //    console.log(error);
//    //    next(error)
//    // }



// }



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



// export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const users = await UserServices.getAllUsers();
//       return users;
//    } catch (error) {
//       console.log(error);
//       next(error)
//    }
// }

//function => req - res function. try catch => req res


/*

1. route matching 
2. controller
3. services
4. model 
5. database

*/