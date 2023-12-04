import mongoose from "mongoose";
import transactionSchema from "./schema.js";

const model = mongoose.model("transactions", transactionSchema);

export default model;
