import Accountsopened from "../models/accountsOpened.js";
import asyncHandler from "express-async-handler";

/** 
export const uploadAccountsData = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);
    await Accounts.insertMany(data);
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ message: "Failed to save data" });
  }
};
*/

export const getAccountsOpened = asyncHandler(async (req, res) => {
  // Get number of accounts opened from MongoDB
  const result = await Accountsopened.find().lean();

  // If no accounts opened
  if (!result?.length) {
    return res.status(400).json({ message: "No accounts found" });
  }

  // DATA ENGINEERING
  // totalAccounts
  const totalAccounts = result.length;
  // Gender
  const maleCount = result.filter(
    (account) => account.gender === "MALE"
  ).length;
  const femaleCount = result.filter(
    (account) => account.gender === "FEMALE"
  ).length;

  const typesofAccounts = [];

  // Get distinct product types
  const productsSet = new Set(result.map((account) => account.product));
  const products = Array.from(productsSet);
  let id = 1; // Initialize id

  for (const product of products) {
    const totalAccounts = result.filter(
      (account) => account.product === product
    ).length;
    typesofAccounts.push({ id: id++, type: product, totalAccounts });
  }

  //Regions
  let regionId = 1;
  let branchId = 1;
  let typeId = 1;

  const regionsData = {};
  for (const account of result) {
    const { region, branch, gender, product } = account;
    if (!regionsData[region]) {
      regionsData[region] = {
        id: regionId++, // Unique numerical identifier for region
        totalAccounts: 0,
        maleCount: 0,
        femaleCount: 0,
        branches: {},
        typesofAccounts: {}, // Add typesofAccounts for each region
      };
    }
    regionsData[region].totalAccounts++;
    if (gender === "MALE") regionsData[region].maleCount++;
    if (gender === "FEMALE") regionsData[region].femaleCount++;
    if (!regionsData[region].branches[branch]) {
      regionsData[region].branches[branch] = {
        id: branchId++, // Unique numerical identifier for branch
        totalAccounts: 0,
        maleCount: 0,
        femaleCount: 0,
        typesofAccounts: {}, // Add typesofAccounts for each branch
      };
    }
    regionsData[region].branches[branch].totalAccounts++;
    if (gender === "MALE") regionsData[region].branches[branch].maleCount++;
    if (gender === "FEMALE") regionsData[region].branches[branch].femaleCount++;
    if (!regionsData[region].branches[branch].typesofAccounts[product]) {
      regionsData[region].branches[branch].typesofAccounts[product] = 0;
    }
    regionsData[region].branches[branch].typesofAccounts[product]++;
    if (!regionsData[region].typesofAccounts[product]) {
      regionsData[region].typesofAccounts[product] = 0;
    }
    regionsData[region].typesofAccounts[product]++;
  }

  const regions = Object.keys(regionsData).map((region) => {
    const branchData = Object.keys(regionsData[region].branches).map(
      (branch) => {
        const typesofAccounts = Object.keys(
          regionsData[region].branches[branch].typesofAccounts
        ).map((type) => ({
          id: typeId++, // Unique numerical identifier for type of account
          type,
          totalAccounts:
            regionsData[region].branches[branch].typesofAccounts[type],
        }));

        return {
          id: regionsData[region].branches[branch].id, // Use the assigned branchId
          branch,
          totalAccounts: regionsData[region].branches[branch].totalAccounts,
          gender: {
            male: regionsData[region].branches[branch].maleCount,
            female: regionsData[region].branches[branch].femaleCount,
          },
          typesofAccounts,
        };
      }
    );

    const typesofAccounts = Object.keys(
      regionsData[region].typesofAccounts
    ).map((type) => ({
      id: typeId++, // Unique numerical identifier for type of account
      type,
      totalAccounts: regionsData[region].typesofAccounts[type],
    }));

    return {
      id: regionsData[region].id, // Use the assigned regionId
      region,
      totalAccounts: regionsData[region].totalAccounts,
      gender: {
        male: regionsData[region].maleCount,
        female: regionsData[region].femaleCount,
      },
      branches: branchData,
      typesofAccounts,
    };
  });

  const uniqueYears = [
    ...new Set(
      result.map((account) => {
        const year = account.date.split("/")[2];
        return isNaN(year) ? null : year; // Return null for invalid dates
      })
    ),
  ].filter((year) => year !== null); // Filter out null values

  const years = uniqueYears.map((year) => year.toString());
  const yearlyData = [];

  for (const year of years) {
    const filteredAccounts = result.filter((account) => {
      const yearOpened = account.date.split("/")[2];
      return yearOpened === year;
    });

    const totalAccounts = filteredAccounts.length;

    const regionsData = {};

    filteredAccounts.forEach((account) => {
      const { region, branch } = account;
      if (!regionsData[region]) {
        regionsData[region] = { totalAccounts: 0, branches: {} };
      }
      regionsData[region].totalAccounts++;
      if (!regionsData[region].branches[branch]) {
        regionsData[region].branches[branch] = 0;
      }
      regionsData[region].branches[branch]++;
    });

    const regions = Object.keys(regionsData).map((region) => ({
      region,
      totalAccounts: regionsData[region].totalAccounts,
      branches: Object.keys(regionsData[region].branches).map((branch) => ({
        branch,
        totalAccounts: regionsData[region].branches[branch],
      })),
    }));

    yearlyData.push({ year, totalAccounts, regions });
  }

  // monthlyData
  const monthToNumber = {
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

  const yearssss = result.map((account) => {
    const dateParts = account.date.split("/");
    return parseInt(dateParts[2], 10); // Parse the year part as an integer
  });

  const recentYear = Math.max(...yearssss);

  const monthlyData = [];

  for (const month of Object.keys(monthToNumber)) {
    const regexMonth = monthToNumber[month];
    const monthAccounts = result.filter((account) => {
      const dateParts = account.date.split("/");
      return (
        dateParts[1] === regexMonth && dateParts[2] === recentYear.toString()
      );
    });

    const totalAccounts = monthAccounts.length;

    const regionsData = {};
    monthAccounts.forEach((account) => {
      const { region, branch, product } = account;
      if (!regionsData[region]) {
        regionsData[region] = { totalAccounts: 0, branches: {} };
      }
      regionsData[region].totalAccounts++;
      if (!regionsData[region].branches[branch]) {
        regionsData[region].branches[branch] = {
          totalAccounts: 0,
          typesofAccounts: {},
        };
      }
      regionsData[region].branches[branch].totalAccounts++;
      if (!regionsData[region].branches[branch].typesofAccounts[product]) {
        regionsData[region].branches[branch].typesofAccounts[product] = 0;
      }
      regionsData[region].branches[branch].typesofAccounts[product]++;
    });

    const regions = Object.keys(regionsData).map((region) => ({
      region,
      totalAccounts: regionsData[region].totalAccounts,
      branches: Object.keys(regionsData[region].branches).map((branch) => ({
        branch,
        totalAccounts: regionsData[region].branches[branch].totalAccounts,
        typesofAccounts: Object.keys(
          regionsData[region].branches[branch].typesofAccounts
        ).map((type) => ({
          type,
          totalAccounts:
            regionsData[region].branches[branch].typesofAccounts[type],
        })),
      })),
    }));

    monthlyData.push({ month, totalAccounts, regions });
  }

  const dailyData = [];

  result.forEach((account) => {
    const { region, branch, product, gender, date } = account;

    let existingDayData = dailyData.find((item) => item.date === date);
    if (!existingDayData) {
      existingDayData = {
        date,
        totalAccounts: 0,
        genders: [],
        regions: [],
      };
      dailyData.push(existingDayData);
    }

    existingDayData.totalAccounts++;

    let existingRegion = existingDayData.regions.find(
      (reg) => reg.region === region
    );
    if (!existingRegion) {
      existingRegion = {
        region,
        totalAccounts: 0,
        genders: [],
        branches: [],
      };
      existingDayData.regions.push(existingRegion);
    }

    existingRegion.totalAccounts++;

    let existingBranch = existingRegion.branches.find(
      (br) => br.branch === branch
    );
    if (!existingBranch) {
      existingBranch = {
        branch,
        totalAccounts: 0,
        genders: [],
        typesofAccounts: [],
      };
      existingRegion.branches.push(existingBranch);
    }

    existingBranch.totalAccounts++;

    let existingType = existingBranch.typesofAccounts.find(
      (type) => type.type === product
    );
    if (existingType) {
      existingType.totalAccounts++;
    } else {
      existingBranch.typesofAccounts.push({ type: product, totalAccounts: 1 });
    }

    if (gender === "MALE" || gender === "FEMALE") {
      let existingGender = existingDayData.genders.find(
        (gen) => gen.gender === gender
      );
      if (existingGender) {
        existingGender.totalAccounts++;
      } else {
        existingDayData.genders.push({ gender, totalAccounts: 1 });
      }

      existingGender = existingRegion.genders.find(
        (gen) => gen.gender === gender
      );
      if (existingGender) {
        existingGender.totalAccounts++;
      } else {
        existingRegion.genders.push({ gender, totalAccounts: 1 });
      }

      existingGender = existingBranch.genders.find(
        (gen) => gen.gender === gender
      );
      if (existingGender) {
        existingGender.totalAccounts++;
      } else {
        existingBranch.genders.push({ gender, totalAccounts: 1 });
      }
    }
  });

  const data = {
    totalAccounts,
    gender: {
      male: maleCount,
      female: femaleCount,
    },
    typesofAccounts,
    regions,
    yearlyData,
    monthlyData,
    dailyData,
  };

  // Hardcoded values
  const dailyDataa = data.dailyData;

  // Assuming dailyData is an array of objects with a 'date' field in the format 'DD/MM/YYYY'
  const yearrs = dailyDataa.map((item) => {
    const dateParts = item.date.split("/");
    return parseInt(dateParts[2], 10); // Parse the year part as an integer
  });

  const currentYear = Math.max(...yearrs);

  // Assuming dailyData is an array of objects with a 'date' field in the format 'DD/MM/YYYY'
  const montths = dailyDataa.map((item) => {
    const dateParts = item.date.split("/");
    return parseInt(dateParts[1], 10); // Parse the month part as an integer
  });

  const recenttMonthIndex = Math.max(...montths);
  const montthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = montthsArray[recenttMonthIndex - 1];

  // Parse the dates in the 'DD/MM/YYYY' format and convert them to Date objects
  const datees = dailyData.map((item) => {
    const dateParts = item.date.split("/");
    return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  });

  // Find the maximum date
  const latestDate = new Date(Math.max(...datees));

  // Get the second element, which is the second latest date
  const previousDate = datees.sort((a, b) => b - a)[1];

  // Format the dates as strings in the 'DD/MM/YYYY' format for comparison
  const currentDay = `${latestDate.getDate().toString().padStart(2, "0")}/${(
    latestDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${latestDate.getFullYear()}`;
  const previousDay = `${previousDate.getDate().toString().padStart(2, "0")}/${(
    previousDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${previousDate.getFullYear()}`;

  // If no accounts opened
  if (data.totalAccounts === 0) {
    return res.status(400).json({ message: "No accounts found" });
  }

  const thisMonthStats = data.monthlyData.find(
    ({ month }) => month === currentMonth
  );

  const todayStats = data.dailyData.find(({ date }) => date === currentDay);

  const thisYearStats = data.yearlyData.find(
    ({ year }) => year === currentYear.toString()
  );

  // Calculate the previous year
  const previousYear = currentYear - 1;
  let previousYearStats = data.yearlyData.find(
    ({ year }) => year === previousYear
  );

  if (!previousYearStats) {
    // If there is no previous year, create a new object with year and set all totalAccounts to 0
    previousYearStats = {
      year: previousYear,
      totalAccounts: 0,
      regions: [],
    };
  } else {
    // If there is a previous year, set all totalAccounts to 0
    previousYearStats.totalAccounts = 0;
    previousYearStats.regions.forEach((region) => {
      region.totalAccounts = 0;
      region.branches.forEach((branch) => {
        branch.totalAccounts = 0;
      });
    });
  }

  const monthsMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let previousMonthIndex = monthsMap.indexOf(currentMonth) - 1;
  let prevYear = currentYear;

  if (previousMonthIndex === -1) {
    previousMonthIndex = 11; // December
    prevYear--;
  }

  const previousMonth = monthsMap[previousMonthIndex];

  let previousMonthStats = data.monthlyData.find(
    ({ month }) => month === previousMonth
  );

  if (!previousMonthStats) {
    // If there is no previous month, create a new object with month and set all totalAccount variables to 0
    previousMonthStats = {
      month: previousMonth,
      totalAccounts: 0,
      regions: [],
    };
  } else {
    // If there is a previous month, set all totalAccount variables to 0
    previousMonthStats.totalAccounts = 0;
    previousMonthStats.regions.forEach((region) => {
      region.totalAccounts = 0;
      region.branches.forEach((branch) => {
        branch.totalAccounts = 0;
        branch.typesofAccounts.forEach((type) => {
          type.totalAccounts = 0;
        });
      });
    });
  }

  // Calculate the previous date
  const previousDateStats = data.dailyData.find(
    ({ date }) => date === previousDay
  );

  res.status(200).json({
    totalAccounts: data.totalAccounts,
    typesofAccounts: data.typesofAccounts,
    regions: data.regions,
    monthlyData: data.monthlyData,
    gender: data.gender,
    thisMonthStats,
    todayStats,
    thisYearStats,
    previousYearStats,
    previousMonthStats,
    previousDateStats,
  });
});
