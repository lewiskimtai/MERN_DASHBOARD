import Accountsopened from "../models/accountsOpened.js";
import asyncHandler from "express-async-handler";

export const getAccountsOpened = asyncHandler(async (req, res) => {
  // Hardcoded values
  const currentMonth = "February";
  const currentDay = "2021-02-02";
  const currentYear = 2023;

  // Get number of accounts opened from MongoDB
  const accountsOpened = await Accountsopened.find().lean();

  // If no accounts opened
  if (!accountsOpened?.length) {
    return res.status(400).json({ message: "No accounts found" });
  }

  const { totalAccounts, typesofAccounts, regions, monthlyData, gender } =
    accountsOpened[0];

  const thisMonthStats = accountsOpened[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = accountsOpened[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  const thisYearStats = accountsOpened[0].yearlyData.find(({ year }) => {
    return year === currentYear;
  });

  // Calculate the previous year
  const previousYear = currentYear - 1;
  const previousYearStats = accountsOpened[0].yearlyData.find(({ year }) => {
    return year === previousYear;
  });

  // Calculate the previous month
  function mapMonthNameToNumber(monthName) {
    const monthsMap = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return monthsMap[monthName];
  }

  function mapMonthNumberToName(monthNumber) {
    const monthsMap = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return monthsMap[monthNumber];
  }

  let previousMonth = "";
  let prevYear = currentYear;

  if (currentMonth === "January") {
    previousMonth = "December";
    prevYear = currentYear - 1;
  } else {
    const monthNumber = mapMonthNameToNumber(currentMonth);
    const prevMonthNum = (parseInt(monthNumber, 10) - 1)
      .toString()
      .padStart(2, "0");
    previousMonth = mapMonthNumberToName(prevMonthNum);
  }

  const previousMonthStats = accountsOpened[0].monthlyData.find(
    ({ month }) => month === previousMonth
  );

  //Previous Date
  // Convert the current date string to a Date object
  const currentDateObj = new Date(currentDay);

  // Calculate the previous date
  let previousDateObj = new Date(currentDateObj);
  if (currentDateObj.getMonth() === 0 && currentDateObj.getDate() === 1) {
    // If the current date is the first day of the year, get the last day of the previous year
    previousDateObj.setFullYear(currentDateObj.getFullYear() - 1); // Set the year to the previous year
    previousDateObj.setMonth(11); // Set the month to December (11)
    previousDateObj.setDate(31); // Set the date to the last day of December
  } else {
    // Otherwise, get the previous day
    previousDateObj.setDate(currentDateObj.getDate() - 1); // Get the previous date
  }

  // Format the previous date as a string in the 'YYYY-MM-DD' format
  const formattedPreviousDate = `${previousDateObj.getFullYear()}-${(
    "0" +
    (previousDateObj.getMonth() + 1)
  ).slice(-2)}-${("0" + previousDateObj.getDate()).slice(-2)}`;

  // Assuming your MongoDB document has a 'date' field
  const previousDateStats = accountsOpened[0].dailyData.find(
    ({ date }) => date === formattedPreviousDate
  );

  res.status(200).json({
    totalAccounts,
    typesofAccounts,
    regions,
    monthlyData,
    gender,
    thisYearStats,
    previousYearStats,
    thisMonthStats,
    previousMonthStats,
    todayStats,
    previousDateStats,
  });
});
