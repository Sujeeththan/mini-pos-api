import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customer: {
      type: Object,
      ref: "Customer",
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    total: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("Sale", saleSchema);
