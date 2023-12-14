import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema(
  {
    reviewer: { type: String, required: true },
    subject: { type: String, required: true },
    time: { type: Date, required: true },
    stars: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { collection: "userReviews" }
);

export default userReviewSchema;
