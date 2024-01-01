import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "../../componets/FlexBetween";
import Header from "../../componets/Header";
import StatBox from "../../componets/StatBox";
import LineChart from "../../componets/LineChart";
import PieChart from "../../componets/PieChart";
import { DataGrid } from "@mui/x-data-grid";

import {
  Email,
} from "@mui/icons-material";

import { useGetAccountsopenedQuery } from "../../state/api";

const AccountsOpened = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data, isLoading } = useGetAccountsopenedQuery();

  const typeofaccountscolumns = [
    {
      field: "type",
      headerName: "Type of Account",
      flex: 0.6,
    },
    {
      field: "sumofAccounts",
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
      field: "sumofAccounts",
      headerName: "Sum",
      flex: 0.01,
    },
  ];

  return (
    <Box m="0.4rem 2.5rem">
      <FlexBetween>
        <Header title="ACCOUNTS OPENED" subtitle="General Statistics" />
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
              increase="+14%"
              description="Total Accounts Opened"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value="50"
              increase="+14%"
              description="This Year"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
              increase="+14%"
              description="This Month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={data && data.todayStats.totalAccounts}
              increase="+14%"
              description="Todate"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
          <LineChart isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
            rows={(data && data.typesofAccounts) || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
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
              value={data && data.totalAccounts}
              increase="+14%"
              description="Total Accounts Opened"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value="50"
              increase="+14%"
              description="This Year"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
              increase="+14%"
              description="This Month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={data && data.todayStats.totalAccounts}
              increase="+14%"
              description="Todate"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
          <LineChart isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
            rows={(data && data.typesofAccounts) || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
            rows={(data && data.regions) || []}
            columns={regionscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
      </Box>
      <FlexBetween>
        <Header subtitle="Branch Statistics" />
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
              value={data && data.totalAccounts}
              increase="+14%"
              description="Total Accounts Opened"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value="50"
              increase="+14%"
              description="This Year"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
              increase="+14%"
              description="This Month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Accounts"
              value={data && data.todayStats.totalAccounts}
              increase="+14%"
              description="Todate"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
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
          <LineChart isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
            rows={(data && data.typesofAccounts) || []}
            columns={typeofaccountscolumns}
            rowHeight={25}
            headerHeight={25}
            hideFooter={true}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
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
            getRowId={(row) => row._id}
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
