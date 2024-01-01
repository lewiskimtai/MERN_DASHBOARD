import mongoose from "mongoose";

const accountsopenedSchema = new mongoose.Schema(
  {
    totalAccounts: Number,
    gender: {
      male: Number,
      female: Number,
    },
    typesofAccounts: [
      {
        type: {
          type: String,
        },
        sumofAccounts: {
          type: Number,
        },
      },
    ],
    regions: [
      {
        region: {
          type: String,
        },
        sumofAccounts: {
          type: Number,
        },
      },
    ],
    monthlyData: [
      {
        month: String,
        totalAccounts: Number,
        male: Number,
        female: Number,
        mamasSafeIndividualSavingsAccount: Number,
        noFeeJointSavingsAccount: Number,
        noFeeSavingsIndividualAccount: Number,
        trustHalalPersonalAccount: Number,
        trustSaversAccount: Number,
        centralA: Number,
        centralB: Number,
        farEast: Number,
        western: Number,
        aruaBranch: Number,
        busiaBranch: Number,
        kalerweBranch: Number,
        kamwengeBranch: Number,
        kapchorwaBranch: Number,
        katweBranch: Number,
        kumiBranch: Number,
        masakaBranch: Number,
        mbararaBranch: Number,
        mukonoBranch: Number,
        nakivuboBranch: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalAccounts: Number,
        male: Number,
        female: Number,
        mamasSafeIndividualSavingsAccount: Number,
        noFeeJointSavingsAccount: Number,
        noFeeSavingsIndividualAccount: Number,
        trustHalalPersonalAccount: Number,
        trustSaversAccount: Number,
        centralA: Number,
        centralB: Number,
        farEast: Number,
        western: Number,
        aruaBranch: Number,
        busiaBranch: Number,
        kalerweBranch: Number,
        kamwengeBranch: Number,
        kapchorwaBranch: Number,
        katweBranch: Number,
        kumiBranch: Number,
        masakaBranch: Number,
        mbararaBranch: Number,
        mukonoBranch: Number,
        nakivuboBranch: Number,
      },
    ],
  },
  { timestamps: true }
);

const Accountsopened = mongoose.model("Accountsopened", accountsopenedSchema);
export default Accountsopened;
