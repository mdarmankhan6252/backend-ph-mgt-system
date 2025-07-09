import { Request, Response } from "express";
import User from "./user.model";
import httpsStatus from 'http-status'

export const createUser = async (req: Request, res: Response) => {
   try {
      const { name, email } = req.body;

      if (!name || !email) {
         res.status(400).json({
            success: false,
            message: 'Data missing'
         })
      }
      const user = await User.create({
         name,
         email
      })

      res.status(httpsStatus.CREATED).json({
         success: true,
         message: 'User created successfully!',
         data: user
      })

   } catch (error: any) {
      console.log(error);
      res.status(400).json({
         success: false,
         message: 'Something went wrong!',
         error: error.message
      })
   }
}