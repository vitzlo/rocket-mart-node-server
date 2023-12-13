import * as dao from "./dao.js";

function UserReviewRoutes(app) {
  const findReviewById = async (req, res) => {
    const review = await dao.findReviewById(req.params.id);
    res.json(review);
  };
  const createUserReview = async (req, res) => {
    console.log(req.body);
    if (req.session["currentUser"]) {
      const review = await dao.findReviewByPair(
        req.session["currentUser"].username,
        req.body.subject
      );
      // only create if there is no review for this pair
      if (!review) {
        const userReview = await dao.createUserReview({
          ...req.body,
          reviewer: req.session["currentUser"].username,
          time: new Date().toJSON(),
        });
        console.log(userReview);
        res.json(userReview);
      } else {
        res.status(400).send("Review already exists between user and subject");
      }
    } else {
      res.status(401).send("Unauthorized, not logged in");
    }
  };
  const updateReview = async (req, res) => {
    const status = await dao.updateReview(req.params.id, {
      ...req.body,
      time: new Date().toJSON(),
    });
    res.json(status);
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

  app.get("/api/userReviews/:id", findReviewById);
  app.post("/api/userReviews", createUserReview);
  app.put("/api/userReviews/:id", updateReview);
  app.get("/api/userReviews/reviewer/:reviewer", findReviewsByReviewer);
  app.get("/api/userReviews/subject/:subject", findReviewBySubject);
  app.delete("/api/userReviews/:id", deleteReview);
}

export default UserReviewRoutes;
