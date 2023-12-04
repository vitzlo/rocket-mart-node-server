import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import TransactionRoutes from "./transactions/routes.js";

mongoose.connect(
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas"
);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
TransactionRoutes(app);

app.listen(process.env.PORT || 4000);
