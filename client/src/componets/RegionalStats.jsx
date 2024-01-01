import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Header from "componets/Header";
import StatBox from "componets/StatBox";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

const RegionalStats = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box m="0.4rem 2.5rem">
      <FlexBetween>
        <Header title="ACCOUNTS OPENED" subtitle="General Statistics" />
      </FlexBetween>
      <Box
        mt="2px"
        display="grid"
        gridTemplateColumns="repeat(20, 1fr)"
        gridAutoRows="24px"
        gap="1px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 20" },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 8"
          display="flex"
          flexDirection="Column"
          rowGap="6px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
          >
            <StatBox
              title="Total Accounts Opened"
              value="50"
              increase="+14%"
              description="Since last month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Customers"
              value="50"
              increase="+14%"
              description="Since last month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            display="flex"
            flexDirection="Row"
            columnGap="6px"
          >
            <StatBox
              title="Total Customers"
              value="50"
              increase="+14%"
              description="Since last month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
            <StatBox
              title="Total Customers"
              value="50"
              increase="+14%"
              description="Since last month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "20px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegionalStats;
