import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description, increasee, iconn, descriptionn }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="0.3rem 0.3rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
      style={{
        minHeight: "40px", // Set a minimum height for the box
      }}
    >
      <FlexBetween>
        <Typography variant="h7" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h6"
        fontWeight="500"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="0.8rem">
        <Typography
          variant="h7"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography variant="h7">{description}</Typography>
      </FlexBetween>
      <FlexBetween gap="0.8rem">
        <Typography
          variant="h7"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increasee}
          {iconn}
        </Typography>
        <Typography variant="h8">{descriptionn}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
