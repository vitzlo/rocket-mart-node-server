import mongoose from "mongoose";
import userReviewSchema from "./schema";

const model = mongoose.model("userReviews", userReviewSchema);

export default model;
