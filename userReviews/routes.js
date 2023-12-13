import * as dao from "./dao.js";

function UserReviewRoutes(app) {
  const findReviewById = async (req, res) => {
    const review = await dao.findReviewById(req.params.id);
    res.json(review);
  };
  const createUserReview = async (req, res) => {
    if (req.session["currentUser"]) {
      const review = await dao.findReviewByPair(
        req.session["currentUser"].username,
        req.body.subject
      );
      if (review) {
        const newReview = {
          ...req.body,
          time: new Date().toJSON(),
        };
        dao.updateReview(review._id, newReview);
        res.json(newReview);
      } else {
        const userReview = await dao.createUserReview({
          ...req.body,
          reviewer: req.session["currentUser"].username,
          time: new Date().toJSON(),
        });
        res.json(userReview);
      }
    } else {
      res.json(undefined);
    }
  };
  const findReviewsByReviewer = async (req, res) => {
    const reviews = await dao.findReviewsByReviewer(req.params.reviewer);
    res.json(reviews);
  };
  const findReviewBySubject = async (req, res) => {
    const review = await dao.findReviewBySubject(req.params.subject);
    res.json(review);
  };
  const deleteReview = async (req, res) => {
    const status = await dao.deleteReviewById(req.params.id);
    res.json(status);
  };

  app.get("/api/reviews/:id", findReviewById);
  app.post("/api/reviews", createUserReview);
  app.get("/api/reviews/reviewer/:reviewer", findReviewsByReviewer);
  app.get("/api/reviews/subject/:subject", findReviewBySubject);
  app.delete("/api/reviews/:id", deleteReview);
}

export default UserReviewRoutes;