import { IAuthProvider, IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from 'bcrypt'


const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const ifUserExist = await User.findOne({ email });

    if (ifUserExist) {
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)

    console.log(hashedPassword);


    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email as string }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    })
    return user
};



const getAllUsers = async () => {
    const users = await User.find({})
    return users
}

export const UserServices = {
    createUser,
    getAllUsers
}

