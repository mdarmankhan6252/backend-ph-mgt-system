import { NextFunction, Request, Response, Router } from "express";
import { createUser, getAllUsers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interface";
import httpStatus from 'http-status'


const userRouter = Router();


userRouter.post('/register',
   validateRequest(createUserZodSchema)
   , createUser);

userRouter.get('/get-users', async (req: Request, res: Response, next: NextFunction) => {

   try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
         throw new Error("Token is not found!")
      }

      const verifyToken = jwt.verify(accessToken, 'Secret');

      if (!verifyToken) {
         throw new Error("Token is not verified!")
      }

      if ((verifyToken as JwtPayload).role !== Role.ADMIN || Role.SUPPER_ADMIN) {
         throw new Error("You are not permitted to access.")
      }

      console.log(verifyToken);

      next()

   } catch (error) {
      res.send(httpStatus.UNAUTHORIZED).json({
         success: false,
         message: 'You are not permitted to access. 2'
      })
   }


}, getAllUsers);


export default userRouter;