import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
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
