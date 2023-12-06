import mongoose from "mongoose";
import userSchema from "./schema.js";

const model = mongoose.model("users", userSchema);

export default model;