import { Types } from "mongoose";

//ROLE OF THE USER
export enum Role {
   SUPPER_ADMIN = 'SUPPER_ADMIN',
   ADMIN = 'ADMIN',
   USER = 'USER',
   GUIDE = 'GUIDE'
}

export enum IsActive {
   ACTIVE = 'ACTIVE',
   INACTIVE = 'INACTIVE',
   BLOCKED = 'BLOCKED'
}
//AUTH PROVIDER
/*



*/

export interface IAuthProvider {
   provider: string; // 'google', 'credential'
   providerId: string;
}

export interface IUser {
   name: string;
   email: string;
   password?: string;
   phone?: string;
   picture?: string;
   address?: string;
   isDeleted?: boolean;
   isActive?: IsActive;
   isVerified?: boolean;
   role: Role;
   auths: IAuthProvider[];
   booking?: Types.ObjectId[];
   guides?:Types.ObjectId[]
}