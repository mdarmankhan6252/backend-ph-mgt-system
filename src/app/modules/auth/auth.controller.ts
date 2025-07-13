import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status'
import { AuthServices } from "./auth.services";

const credentialsLogin = async(req: Request, res: Response, next: NextFunction) =>{

   const loginInfo = await AuthServices.credentialsLogin(req.body);


   res.status(httpStatus.OK).json({
      success: true,
      message: "User Log In Successful!",
      data: loginInfo
   })
}

export const AuthControllers = {
   credentialsLogin
}