import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from "../users/user.interface";
import User from "../users/user.model";


const credentialsLogin = async (payload: Partial<IUser>) => {

   const { email, password } = payload;

   const isUserExist = await User.findOne({ email });

   if (!isUserExist) {
      throw new Error("User does not exist.")
   }

   const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string);

   if (!isPasswordMatched) {
      throw new Error("Incorrect Password")
   }

   const jwtPayload = {
      userid: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role
   }

   const accessToken = jwt.sign(jwtPayload, 'Secret', { expiresIn: "1d" })


   return {
      accessToken
   }

}

export const AuthServices = {
   credentialsLogin
}