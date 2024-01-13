import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetAccountsopenedQuery } from "state/api";

const PieChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetAccountsopenedQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";
  const colors = [theme.palette.secondary[500], theme.palette.secondary[300]];
  const formattedData = Object.entries(data.gender).map(
    ([gender, accounts], i) => ({
      id: gender,
      label: gender,
      value: accounts,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "35px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "188px" : undefined}
      minWidth={isDashboard ? "120px" : undefined}
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
        margin={
          isDashboard
            ? { top: 10, right: 1, bottom: 70, left: 1 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
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
            translateX: isDashboard ? 1 : 0,
            translateY: isDashboard ? 50 : 56,
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
      <Box
        position="absolute"
        top="50%"
        left="55%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} {data.totalAccounts}
        </Typography>
      </Box>
    </Box>
  );
};

export default PieChart;
