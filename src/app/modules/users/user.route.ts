import { NextFunction, Request, Response, Router } from "express";
import { createUser, getAllUsers } from "./user.controller";
import z, { AnyZodObject } from "zod";
import { createUserZodSchema } from "./user.validation";

const userRouter = Router();

const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {

   try {
      req.body = await zodSchema.parseAsync(req.body);

      console.log(req.body);

   } catch (error) {
      next(error)
   }

}

userRouter.post('/register',
   async (req: Request, res: Response, next: NextFunction) => {

      validateRequest(createUserZodSchema)


      req.body = await createUserZodSchema.parseAsync(req.body)

      console.log(req.body);

   }, createUser);
userRouter.get('/register', getAllUsers);


export default userRouter;