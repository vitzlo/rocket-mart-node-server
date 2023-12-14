import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    seller: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
    },
    timeOfListing: {
      type: Date,
      required: true,
    },
    timeOfPurchase: {
      type: Date,
    },
    pokemonId: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    iv: {
      type: Number,
      required: true,
    },
  },
  { collection: "transactions" }
);

export default transactionSchema;
