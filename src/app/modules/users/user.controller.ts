import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpsStatus from 'http-status'
import { UserServices } from "./user.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      
      const user = await UserServices.createUser(req.body);

      res.status(httpsStatus.CREATED).json({
         success: true,
         message: 'User created successfully!',
         data: user
      })

   } catch (error: any) {
      console.log(error);
      next(error)
   }
}

const getAllUsers = async(req: Request, res: Response, next: NextFunction) =>{
  try {
   const users = await  UserServices.getAllUsers();
  } catch (error) {
console.log(error);   
   next(error)
  }

}


/*

1. route matching 
2. controller
3. services
4. model 
5. database

*/