import mongoose from "mongoose";

const accountsopenedSchema = new mongoose.Schema(
  {
    year: Number,
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
        totalAccounts: {
          type: Number,
        },
      },
    ],
    regions: [
      {
        region: {
          type: String,
        },
        totalAccounts: {
          type: Number,
        },
        gender: {
          male: Number,
          female: Number,
        },
        typesofAccounts: [
          {
            type: {
              type: String,
            },
            totalAccounts: {
              type: Number,
            },
          },
        ],
        branches: [
          {
            branch: String,
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
                totalAccounts: {
                  type: Number,
                },
              },
            ],
          },
        ],
      },
    ],
    monthlyData: [
      {
        month: String,
        totalAccounts: Number,
        gender: {
          male: Number,
          female: Number,
        },
        regions: [
          {
            region: {
              type: String,
            },
            totalAccounts: {
              type: Number,
            },
            gender: {
              male: Number,
              female: Number,
            },
            typesofAccounts: [
              {
                type: {
                  type: String,
                },
                totalAccounts: {
                  type: Number,
                },
              },
            ],
            branches: [
              {
                branch: String,
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
                    totalAccounts: {
                      type: Number,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    dailyData: [
      {
        date: String,
        totalAccounts: Number,
        gender: {
          male: Number,
          female: Number,
        },
        regions: [
          {
            region: {
              type: String,
            },
            totalAccounts: {
              type: Number,
            },
            gender: {
              male: Number,
              female: Number,
            },
            typesofAccounts: [
              {
                type: {
                  type: String,
                },
                totalAccounts: {
                  type: Number,
                },
              },
            ],
            branches: [
              {
                branch: String,
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
                    totalAccounts: {
                      type: Number,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Accountsopened = mongoose.model("Accountsopened", accountsopenedSchema);
export default Accountsopened;
