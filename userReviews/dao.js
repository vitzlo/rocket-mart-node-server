import model from "./model.js";

export const createUserReview = (userReview) => model.create(userReview);
export const findReviewsByReviewer = (reviewer) =>
  model.find({ reviewer: reviewer });
export const findReviewBySubject = (subject) =>
  model.find({ subject: subject });
export const findReviewByPair = (reviewer, subject) =>
  model.findOne({ reviewer: reviewer, subject: subject });
export const findReviewById = (id) => model.findById(id);
export const updateReview = (reviewId, review) =>
  model.updateOne({ _id: reviewId }, { $set: review });
export const deleteReviewById = (id) => model.deleteOne({ _id: id });
