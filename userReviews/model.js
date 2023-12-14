import mongoose from "mongoose";
import userReviewSchema from "./schema.js";

const model = mongoose.model("userReviews", userReviewSchema);

export default model;
