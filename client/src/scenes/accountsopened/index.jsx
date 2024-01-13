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
import LineChart from "../../componets/LineChart";
import PieChart from "../../componets/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { Email, ArrowDropDown } from "@mui/icons-material";
import { useGetAccountsopenedQuery } from "../../state/api";

const AccountsOpened = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const { data, isLoading } = useGetAccountsopenedQuery();

<<<<<<< HEAD

=======
>>>>>>> 870f713a8ec1c3404e7d781539667277da5759a3
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
      flex: 0.01,
    },
  ];

  const regions = ["Central A", "Central B", "Far East", "Western"];

  const handleClick = () => {
    console.info(`You clicked ${regions[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
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
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleClick}>{regions[selectedIndex]}</Button>
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
                    {regions.map((region, index) => (
                      <MenuItem
                        key={region}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {region}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
