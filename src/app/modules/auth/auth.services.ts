import { IUser } from "../users/user.interface"
import User from "../users/user.model";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt'


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

   return {
      email
   }

}

export const AuthServices = {
   credentialsLogin
}