import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: Number,
      required: true
    },
    typeName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    transactions: {
        type: [mongoose.Types.ObjectId],
        of: Number,
        },
    },
    { timestamps: true }
);

const Accounts = mongoose.model("Accounts", AccountsSchema);
export default Accounts;
