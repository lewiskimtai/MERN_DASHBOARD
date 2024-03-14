import mongoose from "mongoose";

const accountsopenedSchema = new mongoose.Schema(
  {
    region: String,
    branch: String,
    product: String,
    gender: String,
    date: String,
  },
  { timestamps: true }
);

const Accountsopened = mongoose.model("Accountsopened", accountsopenedSchema);
export default Accountsopened;
