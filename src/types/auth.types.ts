import { Document } from "mongoose";

export interface TAuth extends Document {
  _id: any;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  token: string;
  createdAt: Date;
  updateAt: Date;
  __v: any;
}

export type JwtPayload = Pick<TAuth, "_id" | "email" | "fullName" | "phone">;
export type PickRegister = Pick<
  TAuth,
  "email" | "fullName" | "phone" | "password"
>;
export type PickLogin = Pick<TAuth, "email" | "password">;
export type PickLogout = Pick<TAuth, "_id">;
