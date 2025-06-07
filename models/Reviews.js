const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Please provide restaurant"],
    },
    comment: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["dine-in", "takeaway", "delivery", "other"],
      default: "dine-in",
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
reviewSchema.index({ restaurant: 1, createdBy: 1 }, { unique: true });
module.exports = mongoose.model("Review", reviewSchema);
