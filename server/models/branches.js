import mongoose from "mongoose";

const BranchesSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    accountNumbers: {
        type: [mongoose.Types.ObjectId],
        of: Number,
        },
    },
    { timestamps: true }
);

const Branches = mongoose.model("Branches", BranchesSchema);
export default Branches;
