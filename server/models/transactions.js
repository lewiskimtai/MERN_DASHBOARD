import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema(
    {
        date: {
        type: Date,
        required: true
        },
        credit: {
        type: Number,
        required: true
        },
        date: {
        type: Date,
        required: true
        },
        debit: {
        type: Number,
        required: true
        },
        balance: {
        type: Number,
        required: true
        },
    },
    { timestamps: true }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema);
export default Transactions;
