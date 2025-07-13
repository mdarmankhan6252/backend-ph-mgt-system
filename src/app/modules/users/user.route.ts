import { Router } from "express";
import { createUser, getAllUsers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";


const userRouter = Router();


userRouter.post('/register',
   validateRequest(createUserZodSchema)
   , createUser);

userRouter.get('/register', getAllUsers);


export default userRouter;