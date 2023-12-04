import mongoose from "mongoose";

export const USER_TYPES = ["BUYER", "SELLER"];
export const USER_REGIONS = ["KALOS", "UNOVA", "KANTO", "JOHTO", "GALAR"];

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: USER_TYPES,
      default: "BUYER",
    },
    pfp: { type: String },
    email: { type: String, required: true, unique: true },
    region: {
      type: String,
      enum: USER_REGIONS,
      default: "KALOS",
      required: true,
    },
    signUpDate: { type: Date, required: true },
    recentlyViewed: { type: Array, required: true },
    pokemonBought: { type: Array, required: true },
    pokeomonListed: { type: Array },
  },
  { collection: "users" }
);

export default userSchema;
