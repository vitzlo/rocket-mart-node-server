import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

// create new express instance
// uncomment once database is up
// mongoose.connect(process.env.MONGO_URL);
const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 4000);
