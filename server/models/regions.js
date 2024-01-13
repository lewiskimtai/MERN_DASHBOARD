import mongoose from "mongoose";

const RegionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    branches: {
        type: [mongoose.Types.ObjectId],
        of: Number,
        },
    },
    { timestamps: true }
);

const Regions = mongoose.model("Regions", RegionsSchema);
export default Regions;
