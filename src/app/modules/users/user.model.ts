import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";


const authProviderSchema = new Schema<IAuthProvider>({
   provider: {
      type: String,
      required: true
   },
   providerId: {
      type: String,
      required: true
   }

}, {
   versionKey: false,
   _id: false
})


const userSchema = new Schema<IUser>({
   name: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      trim: true
   },
   role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER
   },
   phone: {
      type: String,
      trim: true
   },
   picture: {
      type: String,
      trim: true
   },
   address: {
      type: String,
      trim: true
   },
   isDeleted: {
      type: Boolean,
      default: false
   },
   isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   auths: [authProviderSchema]
}, { timestamps: true, versionKey: false });

const User = model<IUser>("User", userSchema);
export default User;