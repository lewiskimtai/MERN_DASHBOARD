import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import FlexBetween from "../../componets/FlexBetween";
import Header from "../../componets/Header";
import StatBox from "../../componets/StatBox";
import { ResponsivePie } from "@nivo/pie";
import PieChart from "../../componets/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDropDown } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useGetAccountsopenedQuery } from "../../state/api";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

/** 
import moment from "moment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
*/

import { ResponsiveLine } from "@nivo/line";

const regions = ["Central A", "Central B", "Far East", "Mid East", "Western"];

const branches = {
  "Central A": [
    "Central Branch",
    "Corporate Branch",
    "Head Office Main",
    "Kalerwe Branch",
    "Kampala Road Branch",
    "Kikuubo",
    "Kitintale Branch",
    "Mukono Branch",
    "Nakivubo Branch",
    "Nansana",
  ],

  "Central B": [
    "Entebbe Branch",
    "Gomba Branch",
    "Kalangala Branch",
    "Katwe Branch",
    "Lwengo Branch",
    "Masaka Branch",
    "Nateete Branch",
    "Owino Branch",
  ],
  "Far East": [
    "Arua Branch",
    "Busia Branch",
    "Kapchorwa",
    "Kumi Branch",
    "Mbale Branch",
    "Pallisa Branch",
    "Soroti Branch",
    "Tororo Branch",
  ],
  "Mid East": [
    "Iganga Branch",
    "Jinja Branch",
    "Kamuli Branch",
    "Kayunga Branch",
    "Lugazi Branch",
  ],
  Western: [
    "Ishaka Branch",
    "Kabarole Branch",
    "Kamwenge Branch",
    "Mbarara Branch",
    "Ntungamo Branch",
  ],
};

// REGION BUTTON
const RegionsButtonGroup = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    onSelect(regions[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="first split button"
      >
        <Button>{regions[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {regions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

// BRANCH BUTTON
const BranchesButtonGroup = ({ selectedOption, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = React.useRef(null);

  const secondOptions = branches[selectedOption] || branches[regions[0]] || [];


  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setOpen(false);
    onSelect(secondOptions[index]); // Notify the parent component about the selected branch
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="second split button"
      >
        <Button onClick={handleToggle}>{secondOptions[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {secondOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

const AccountsOpened = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  // eslint-disable-next-line
  const [selectedBranch, setSelectedBranch] = useState(
    branches[selectedRegion]?.[0] || ""
  );

  /**
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  */

  const handleRegionSelect = (selectedRegion) => {
    setSelectedRegion(selectedRegion);
    // Reset the selected branch when a new region is selected
    setSelectedBranch(branches[selectedRegion]?.[0] || "");
  };

  const handleBranchSelect = (selectedBranch) => {
    setSelectedBranch(selectedBranch);
    // You may perform any other actions needed when a new branch is selected
  };

  /** 
  // FILE UPLOADER
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const InputFileUpload = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: "DD/MM/YYYY",
          cellDates: true,
        });

        const formattedData = excelData.map((row) => ({
          region: row.region,
          branch: row.branch,
          product: row.product,
          gender: row.gender,
          date: moment(row.date).format("DD/MM/YYYY"),
        }));

        // Upload all chunks and remaining data at once
        const jsonString = JSON.stringify(formattedData);
        try {
          const response = await fetch(`${baseUrl}/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonString,
          });

          if (response.ok) {
            console.log("Data uploaded successfully");
            setSuccessMessage("Data uploaded successfully");
            window.location.reload();
          } else {
            console.error("Failed to upload data");
            setErrorMessage("Failed to upload data");
          }
        } catch (error) {
          console.error("Error uploading data:", error);
          setErrorMessage(`Error uploading data: ${error.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    return (
      <>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Excel file
          <VisuallyHiddenInput
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </Button>

        {successMessage && (
          <Alert variant="filled" severity="success">
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
      </>
    );
  };
  */

  const { data, isLoading } = useGetAccountsopenedQuery();

  /**
  console.log("DATA", data);
  */

  const typeofaccountscolumns = [
    {
      field: "type",
      headerName: "Type of Account",
      flex: 0.6,
    },
    {
      field: "totalAccounts",
      headerName: "Sum",
      flex: 0.01,
    },
  ];
  const regionscolumns = [
    {
      field: "region",
      headerName: "Region",
      flex: 0.6,
    },
    {
      field: "totalAccounts",
      headerName: "Sum",
      flex: 0.2,
    },
  ];
  const branchcolumns = [
    {
      field: "branch",
      headerName: "Branch",
      flex: 0.6,
    },
    {
      field: "totalAccounts",
      headerName: "Sum",
      flex: 0.01,
    },
  ];

  // REGION LOGIC SECTION //
  // Total Accounts opened for the selected region
  const regionAccounts = data
    ? [data].flatMap((item) =>
      item.regions
        .filter((regionItem) => regionItem.region === selectedRegion)
        .map(({ region, totalAccounts }) => ({ region, totalAccounts }))
    )
    : [];

  // This Months Total Accounts opened for the selected region
  const thisMonthRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.thisMonthStats]
        .filter((thisMonthItem) =>
          thisMonthItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // This Year's Total Accounts opened for the selected region
  const thisYearRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.thisYearStats]
        .filter((thisYearItem) =>
          thisYearItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          year: filteredItem.year,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Previous Year's Total Accounts opened for the selected region
  const prevYearRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.previousYearStats]
        .filter((prevYearItem) =>
          prevYearItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          year: filteredItem.year,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Previous Months Total Accounts opened for the selected region
  const prevMonthRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.previousMonthStats]
        .filter((thisMonthItem) =>
          thisMonthItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Today's Total Accounts opened for selected region
  const todayRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.todayStats]
        .filter((todayItem) =>
          todayItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Previous Day's Total Accounts opened for selected region
  const prevDayRegionAccounts = data
    ? [data].flatMap((item) =>
      [item.previousDateStats]
        .filter((todayItem) =>
          todayItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Prepare data for Region Line Chart
  const filteredData = data
    ? [data].flatMap((item) =>
      item.monthlyData
        .filter((monthlyItem) =>
          monthlyItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          region: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ), // Find the specific region
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts, // Assuming totalAccounts is what you want to display
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Region Line CHart
  const regionLineChartData = [
    {
      id: "regionAccountsOpened",
      color: theme.palette.secondary.main,
      data: filteredData.map((item) => ({
        x: item.month,
        y: item.value,
      })),
    },
  ];

  // Branch Line Chart
  const branchLineChartData = [
    {
      id: "branchAccountsOpened",
      color: theme.palette.secondary.main,
      data: filteredData.map((item) => ({
        x: item.month,
        y: item.branchvalue,
      })),
    },
  ];

  // Prepare data for General Line Chart
  const filteredDataa = data
    ? [data].flatMap((item) =>
      item.monthlyData.map((monthlyItem) => ({
        x: monthlyItem.month,
        y: monthlyItem.totalAccounts,
      }))
    )
    : [];

  // General Line Chart Data
  const lineChartData = [
    {
      id: "totalAccountsOpened",
      color: theme.palette.secondary.main,
      data: filteredDataa,
    },
  ];

  // Gender for the selected region
  const genderRegionAccounts = data
    ? [data].flatMap((item) =>
      item.regions
        .filter((regionItem) => regionItem.region === selectedRegion)
        .flatMap(({ gender }) =>
          Object.entries(gender).map(([key, value]) => ({
            gender: key,
            value,
          }))
        )
    )
    : [];

  // Prepare data for Region gender pie chart
  const colors = [theme.palette.secondary[500], theme.palette.secondary[300]];
  const formattedData = genderRegionAccounts.map(({ gender, value }, i) => ({
    id: gender,
    label: gender,
    value: value,
    color: colors[i],
  }));

  // Gender for the selected branch
  const genderBranchAccounts = data
    ? data.regions
      .filter((regionItem) => regionItem.region === selectedRegion)
      .flatMap((region) =>
        region.branches
          .filter((branchItem) => branchItem.branch === selectedBranch)
          .flatMap(({ gender }) =>
            Object.entries(gender).map(([key, value]) => ({
              gender: key,
              value,
            }))
          )
      )
    : [];

  // Prepare data for Branch gender pie chart
  const formattedDataBranch = genderBranchAccounts.map(
    ({ gender, value }, i) => ({
      id: gender,
      label: gender,
      value: value,
      color: colors[i],
    })
  );

  // Types of Accounts opened for the selected region
  const regionTypesOfAccounts = data
    ? data.regions
      .filter((regionItem) => regionItem.region === selectedRegion)
      .flatMap(({ typesofAccounts }) =>
        typesofAccounts
          ? typesofAccounts.map((account) => ({ ...account }))
          : []
      )
    : [];

  // Types of Accounts opened for the selected branch
  const branchTypesOfAccounts = data
    ? data.regions
      .filter((regionItem) => regionItem.region === selectedRegion)
      .flatMap((region) =>
        region.branches
          .filter((branchItem) => branchItem.branch === selectedBranch)
          .flatMap(({ typesofAccounts }) =>
            typesofAccounts.map((account) => ({ ...account }))
          )
      )
    : [];

  // Branches and Accounts opened for the selected region
  const regionBranchAccounts = data
    ? data.regions
      .filter((regionItem) => regionItem.region === selectedRegion)
      .flatMap(({ branches }) => branches.map((branch) => ({ ...branch })))
    : [];

  // BRANCH LOGIC SECTION //
  // Total Accounts opened for the selected Branch
  const branchAccounts = data
    ? data.regions
      .filter((regionItem) => regionItem.region === selectedRegion)
      .flatMap((region) =>
        region.branches
          .filter((branchItem) => branchItem.branch === selectedBranch)
          .map(({ branch, totalAccounts }) => ({ branch, totalAccounts }))
      )
    : [];


  // Today's Total Accounts opened for selected Branch
  const todayBranchAccounts = data
    ? [data].flatMap((item) =>
      [item.todayStats]
        .filter((todayItem) =>
          todayItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  // Previous Day's Total Accounts opened for selected Branch
  const prevDayBranchAccounts = data
    ? [data].flatMap((item) =>
      [item.previousDateStats]
        .filter((todayItem) =>
          todayItem.regions.some(
            (region) =>
              (!selectedRegion || region.region === selectedRegion) &&
              (!selectedBranch ||
                region.branches.some(
                  (branch) => branch.branch === selectedBranch
                ))
          )
        )
        .map((filteredItem) => ({
          month: filteredItem.month,
          value: filteredItem.regions.find(
            (region) => region.region === selectedRegion
          ).totalAccounts,
          branchvalue: filteredItem.regions
            .find((region) => region.region === selectedRegion)
            .branches.find((branch) => branch.branch === selectedBranch)
            .totalAccounts,
        }))
    )
    : [];

  return (
    <Box m="0.4rem 2.5rem">
      <FlexBetween>
        <Header
          title={`ACCOUNTS OPENED BETWEEN 02/01/2024 AND ${data?.todayStats?.date}`}
          subtitle="General Statistics"
        />
      </FlexBetween>
      <Box
        mt="2px"
        mb="3px"
        display="grid"
        gridTemplateColumns="repeat(20, 1fr)"
        gridAutoRows="50px"
        gap="1px"
        borderBottom="3px"
        borderColor="theme.palette.background.alt"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 20" },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          display="flex"
          flexDirection="Column"
          rowGap="6px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "100px" }}
          >
            <StatBox
              title="Total Accounts"
              value={data && data.totalAccounts}
              description="Total Accounts Opened"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={data?.thisYearStats?.totalAccounts}
              increase={
                <span
                  style={{
                    color:
                      data?.thisYearStats?.totalAccounts -
                        data?.previousYearStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.previousYearStats?.totalAccounts !== 0 &&
                    ((data?.thisYearStats?.totalAccounts -
                      data?.previousYearStats?.totalAccounts) /
                      data?.previousYearStats?.totalAccounts) *
                    100}
                  %{data?.previousYearStats?.totalAccounts !== 0 && "%"}
                </span>
              }
              description="This Year"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      data?.thisYearStats?.totalAccounts -
                        data?.previousYearStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.thisYearStats?.totalAccounts -
                    data?.previousYearStats?.totalAccounts}
                </span>
              }
              descriptionn={data?.thisYearStats?.year}
              iconn={
                data?.thisYearStats?.totalAccounts -
                  data?.previousYearStats?.totalAccounts >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "97px" }}
          >
            <StatBox
              title="Total Accounts"
              value={data && data.thisMonthStats.totalAccounts}
              increase={
                <span
                  style={{
                    color:
                      data?.thisMonthStats?.totalAccounts -
                        data?.previousMonthStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {
                    data?.previousMonthStats?.totalAccounts !== 0 &&
                    ((data?.thisMonthStats?.totalAccounts - data?.previousMonthStats?.totalAccounts) / data?.previousMonthStats?.totalAccounts * 100).toFixed(0)
                  }
                  %

                </span>
              }
              description="This Month"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      data?.thisMonthStats?.totalAccounts -
                        data?.previousMonthStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.thisMonthStats?.totalAccounts -
                    data?.previousMonthStats?.totalAccounts}
                </span>
              }
              descriptionn={data?.thisMonthStats?.month.substring(0, 3)}
              iconn={
                data?.thisMonthStats?.totalAccounts -
                  data?.previousMonthStats?.totalAccounts >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
            <StatBox
              title="Total Accounts"
              value={data && data.todayStats.totalAccounts}
              increase={
                <span
                  style={{
                    color:
                      data?.todayStats?.totalAccounts -
                        data?.previousDateStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {(
                    ((data?.todayStats?.totalAccounts -
                      data?.previousDateStats?.totalAccounts) /
                      data?.previousDateStats?.totalAccounts) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              }
              description="Todate"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      data?.todayStats?.totalAccounts -
                        data?.previousDateStats?.totalAccounts >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.todayStats?.totalAccounts -
                    data?.previousDateStats?.totalAccounts}
                </span>
              }
              descriptionn={data?.todayStats?.date}
              iconn={
                data?.todayStats?.totalAccounts -
                  data?.previousDateStats?.totalAccounts >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem"
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h7" sx={{ color: theme.palette.secondary[300] }}>
            By Gender
          </Typography>
          <PieChart isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem 0.8rem 0.3rem "
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <ResponsiveLine
            data={lineChartData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                return v.slice(0, 3);
              },
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 1,
              tickRotation: 0,
              legend: "",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={undefined}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={(data && data.typesofAccounts) || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={(data && data.regions) || []}
            columns={regionscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
      </Box>

      <FlexBetween>
        <Header subtitle="Regional Statistics" />
        <RegionsButtonGroup onSelect={handleRegionSelect} />
      </FlexBetween>
      <Box
        mt="2px"
        mb="3px"
        display="grid"
        gridTemplateColumns="repeat(20, 1fr)"
        gridAutoRows="50px"
        gap="1px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 20",
          },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          display="flex"
          flexDirection="Column"
          rowGap="6px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "100px" }}
          >
            <StatBox
              title="Total Accounts"
              value={regionAccounts.map(({ totalAccounts }) => totalAccounts)}
              description="Total Accounts Opened"
              icon={
                <AccountBalanceWalletIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "20px",
                  }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={thisYearRegionAccounts.map((item) => item.value)}
              increase={
                <span
                  style={{
                    color:
                      thisYearRegionAccounts.map((item) => item.value) -
                        prevYearRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.previousYearStats?.totalAccounts !== 0 &&
                    ((thisYearRegionAccounts.map((item) => item.value) -
                      prevYearRegionAccounts.map((item) => item.value)) /
                      prevYearRegionAccounts.map((item) => item.value)) *
                    100}
                  %{data?.previousYearStats?.totalAccounts !== 0 && "%"}
                </span>
              }
              description="This Year"
              icon={
                <AccountBalanceWalletIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "20px",
                  }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      thisYearRegionAccounts.map((item) => item.value) -
                        prevYearRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {thisYearRegionAccounts.map((item) => item.value) -
                    prevYearRegionAccounts.map((item) => item.value)}
                </span>
              }
              descriptionn={data?.thisYearStats?.year}
              iconn={
                thisYearRegionAccounts.map((item) => item.value) -
                  prevYearRegionAccounts.map((item) => item.value) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "97px" }}
          >
            <StatBox
              title="Total Accounts"
              value={thisMonthRegionAccounts.map((item) => item.value)}
              increase={
                <span
                  style={{
                    color:
                      thisMonthRegionAccounts.map((item) => item.value) -
                        prevMonthRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {
                    data?.previousMonthStats?.totalAccounts !== 0 &&
                    (
                      ((thisMonthRegionAccounts.reduce((sum, item) => sum + item.value, 0) -
                        prevMonthRegionAccounts.reduce((sum, item) => sum + item.value, 0)) /
                        prevMonthRegionAccounts.reduce((sum, item) => sum + item.value, 0)) *
                      100
                    ).toFixed(0)
                  }
                  %

                </span>
              }
              description="This Month"
              icon={
                <AccountBalanceWalletIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "20px",
                  }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      thisMonthRegionAccounts.map((item) => item.value) -
                        prevMonthRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {thisMonthRegionAccounts.map((item) => item.value) -
                    prevMonthRegionAccounts.map((item) => item.value)}
                </span>
              }
              descriptionn={data?.thisMonthStats?.month.substring(0, 3)}
              iconn={
                thisMonthRegionAccounts.map((item) => item.value) -
                  prevMonthRegionAccounts.map((item) => item.value) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
            <StatBox
              title="Total Accounts"
              value={todayRegionAccounts.map((item) => item.value)}
              increase={
                <span
                  style={{
                    color:
                      todayRegionAccounts.map((item) => item.value) -
                        prevDayRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {(
                    ((todayRegionAccounts.map((item) => item.value) -
                      prevDayRegionAccounts.map((item) => item.value)) /
                      prevDayRegionAccounts.map((item) => item.value)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              }
              description="Todate"
              icon={
                <AccountBalanceWalletIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "20px",
                  }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      todayRegionAccounts.map((item) => item.value) -
                        prevDayRegionAccounts.map((item) => item.value) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {todayRegionAccounts.map((item) => item.value) -
                    prevDayRegionAccounts.map((item) => item.value)}
                </span>
              }
              descriptionn={data?.todayStats?.date}
              iconn={
                todayRegionAccounts.map((item) => item.value) -
                  prevDayRegionAccounts.map((item) => item.value) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem"
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h7" sx={{ color: theme.palette.secondary[300] }}>
            By Gender
          </Typography>
          <Box
            height={"35px"}
            width={undefined}
            minHeight={"188px"}
            minWidth={"120px"}
            position="relative"
          >
            <ResponsivePie
              data={formattedData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              colors={{ datum: "data.color" }}
              margin={{ top: 10, right: 1, bottom: 70, left: 1 }}
              sortByValue={true}
              innerRadius={0.45}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              enableArcLinkLabels={false}
              arcLinkLabelsTextColor={theme.palette.secondary[200]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              legends={[
                {
                  anchor: "bottom",
                  direction: "column",
                  justify: false,
                  translateX: 1,
                  translateY: 50,
                  itemsSpacing: 10,
                  itemWidth: 60,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.primary[500],
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem 0.8rem 0.3rem "
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <ResponsiveLine
            data={regionLineChartData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                return v.slice(0, 3);
              },
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 1,
              tickRotation: 0,
              legend: "",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={undefined}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={regionTypesOfAccounts || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={(data && regionBranchAccounts) || []}
            columns={branchcolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
      </Box>

      <FlexBetween>
        <Header subtitle="Branch Statistics" />
        <BranchesButtonGroup
          selectedOption={selectedRegion}
          onSelect={handleBranchSelect}
        />
      </FlexBetween>
      <Box
        mt="2px"
        mb="3px"
        display="grid"
        gridTemplateColumns="repeat(20, 1fr)"
        gridAutoRows="50px"
        gap="1px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 20" },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          display="flex"
          flexDirection="Column"
          rowGap="6px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "100px" }}
          >
            <StatBox
              title="Total Accounts"
              value={branchAccounts.map((item) => item.totalAccounts)}
              description="Total Accounts Opened"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={thisYearRegionAccounts.map((item) => item.branchvalue)}
              increase={
                <span
                  style={{
                    color:
                      thisYearRegionAccounts.map((item) => item.branchvalue) -
                        prevYearRegionAccounts.map(
                          (item) => item.branchvalue
                        ) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {data?.previousYearStats?.totalAccounts !== 0 &&
                    ((thisYearRegionAccounts.map((item) => item.branchvalue) -
                      prevYearRegionAccounts.map((item) => item.branchvalue)) /
                      prevYearRegionAccounts.map((item) => item.branchvalue)) *
                    100}
                  %{data?.previousYearStats?.totalAccounts !== 0 && "%"}
                </span>
              }
              description="This Year"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      thisYearRegionAccounts.map((item) => item.branchvalue) -
                        prevYearRegionAccounts.map(
                          (item) => item.branchvalue
                        ) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {thisYearRegionAccounts.map((item) => item.branchvalue) -
                    prevYearRegionAccounts.map((item) => item.branchvalue)}
                </span>
              }
              descriptionn={data?.thisYearStats?.year}
              iconn={
                thisYearRegionAccounts.map((item) => item.branchvalue) -
                  prevYearRegionAccounts.map((item) => item.branchvalue) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
            style={{ minHeight: "97px" }}
          >
            <StatBox
              title="Total Accounts"
              value={thisMonthRegionAccounts.map((item) => item.branchvalue)}
              increase={
                <span
                  style={{
                    color:
                      thisMonthRegionAccounts.map((item) => item.branchvalue) -
                        prevMonthRegionAccounts.map(
                          (item) => item.branchvalue
                        ) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {
                    data?.previousMonthStats?.totalAccounts !== 0 &&
                    (
                      ((thisMonthRegionAccounts.reduce((sum, item) => sum + item.branchvalue, 0) -
                        prevMonthRegionAccounts.reduce((sum, item) => sum + item.branchvalue, 0)) /
                        prevMonthRegionAccounts.reduce((sum, item) => sum + item.branchvalue, 0)) *
                      100
                    ).toFixed(0)
                  }
                  %

                </span>
              }
              description="This Month"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      thisMonthRegionAccounts.map((item) => item.branchvalue) -
                        prevMonthRegionAccounts.map(
                          (item) => item.branchvalue
                        ) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {thisMonthRegionAccounts.map((item) => item.branchvalue) -
                    prevMonthRegionAccounts.map((item) => item.branchvalue)}
                </span>
              }
              descriptionn={data?.thisMonthStats?.month.substring(0, 3)}
              iconn={
                thisMonthRegionAccounts.map((item) => item.branchvalue) -
                  prevMonthRegionAccounts.map((item) => item.branchvalue) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
            <StatBox
              title="Total Accounts"
              value={todayBranchAccounts.map((item) => item.branchvalue)}
              increase={
                <span
                  style={{
                    color:
                      todayBranchAccounts.map((item) => item.branchvalue) -
                        prevDayBranchAccounts.map((item) => item.branchvalue) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {(() => {
                    const percentageChange = (
                      ((todayBranchAccounts.map((item) => item.branchvalue) -
                        prevDayBranchAccounts.map((item) => item.branchvalue)) /
                        prevDayBranchAccounts.map((item) => item.branchvalue)) *
                      100
                    ).toFixed(0);

                    return isFinite(percentageChange)
                      ? `${percentageChange}%`
                      : "%";
                  })()}
                </span>
              }
              description="Todate"
              icon={
                <AccountBalanceWalletIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
              increasee={
                <span
                  style={{
                    color:
                      todayRegionAccounts.map((item) => item.branchvalue) -
                        prevDayRegionAccounts.map((item) => item.branchvalue) >=
                        0
                        ? theme.palette.secondary[999]
                        : theme.palette.secondary[888],
                  }}
                >
                  {todayRegionAccounts.map((item) => item.branchvalue) -
                    prevDayRegionAccounts.map((item) => item.branchvalue)}
                </span>
              }
              descriptionn={data?.todayStats?.date}
              iconn={
                todayRegionAccounts.map((item) => item.branchvalue) -
                  prevDayRegionAccounts.map((item) => item.branchvalue) >=
                  0 ? (
                  <ArrowDropUpIcon
                    style={{
                      color: theme.palette.secondary[999],
                      fontSize: "30px",
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: theme.palette.secondary[888],
                      fontSize: "30px",
                    }}
                  />
                )
              }
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem"
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h7" sx={{ color: theme.palette.secondary[300] }}>
            By Gender
          </Typography>
          <Box
            height={"35px"}
            width={undefined}
            minHeight={"188px"}
            minWidth={"120px"}
            position="relative"
          >
            <ResponsivePie
              data={formattedDataBranch}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              colors={{ datum: "data.color" }}
              margin={{ top: 10, right: 1, bottom: 70, left: 1 }}
              sortByValue={true}
              innerRadius={0.45}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              enableArcLinkLabels={false}
              arcLinkLabelsTextColor={theme.palette.secondary[200]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              legends={[
                {
                  anchor: "bottom",
                  direction: "column",
                  justify: false,
                  translateX: 1,
                  translateY: 50,
                  itemsSpacing: 10,
                  itemWidth: 60,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.primary[500],
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          borderRadius="0.55rem"
          p="0.3rem 0.3rem 0.8rem 0.3rem "
          marginLeft="6px"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
        >
          <ResponsiveLine
            data={branchLineChartData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                return v.slice(0, 3);
              },
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 6,
              tickSize: 5,
              tickPadding: 1,
              tickRotation: 0,
              legend: "",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={undefined}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={branchTypesOfAccounts || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          marginLeft="6px"
          borderRadius="0.55rem"
          marginTop="6px"
          backgroundColor={theme.palette.background.alt}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[300],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={(data && data.regions) || []}
            columns={regionscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AccountsOpened;
