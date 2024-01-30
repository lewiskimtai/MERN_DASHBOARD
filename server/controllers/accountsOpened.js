import Accountsopened from "../models/accountsOpened.js";
import asyncHandler from "express-async-handler";

export const getAccountsOpened = asyncHandler(async (req, res) => {
  // hardcoded values
  const currentMonth = "January";
  const currentDay = "2021-01-02";

  // Get number of accounts opened from MongoDB
  const accountsOpened = await Accountsopened.find().lean();

  // If no accounts opened
  if (!accountsOpened?.length) {
    return res.status(400).json({ message: "No accounts found" });
  }

  const { year, totalAccounts, typesofAccounts, regions, monthlyData, gender } =
    accountsOpened[0];

  const thisMonthStats = accountsOpened[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = accountsOpened[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  res.status(200).json({
    year,
    totalAccounts,
    typesofAccounts,
    regions,
    monthlyData,
    gender,
    thisMonthStats,
    todayStats,
  });
});
