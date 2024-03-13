import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema(
  {
    region: String,
    branch: String,
    product: String,
    gender: String,
    date: String,
  },
  { timestamps: true }
);

const Accounts = mongoose.model("Accounts", AccountsSchema);
export default Accounts;
