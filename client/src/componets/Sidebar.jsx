import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/FTBlogo.png";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const navHome = [
  {
    text: "Home",
    icon: <DashboardIcon />,
  },
  {
    text: "Accounts Opened",
    icon: <DashboardIcon />,
  },
  {
    text: "Deposits",
    icon: <DashboardIcon />,
  },
  {
    text: "Dormancy",
    icon: <DashboardIcon />,
  },
  {
    text: "Closed",
    icon: <DashboardIcon />,
  },
  {
    text: "Regional Stats",
    icon: <DashboardIcon />,
  },
];

const centralA = [
  {
    text: "Central A Stats",
    icon: <DashboardIcon />,
  },
  {
    text: "Kalerwe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kampala Road Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Mukono Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nakivubo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nansana Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Central Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kikuubo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kitintale Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Corporate Branch",
    icon: <AccountBalanceIcon />,
  },
];

const centralB = [
  {
    text: "Central B Stats",
    icon: <DashboardIcon />,
  },
  {
    text: "Masaka Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Katwe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Entebbe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Gomba Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kalangala Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nateete Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Owino Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Lwengo Branch",
    icon: <AccountBalanceIcon />,
  },
];

/* const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Accounts",
    icon: null,
  },
  {
    text: "Trust Savers Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Trust Savers Joint Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "No Fee Savings Individual Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "No Fee Savings Joint  Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Trust Savers Company Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Trust Halal Personal Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Mamas Safe Individual Savings Account",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    text: "Branches",
    icon: null,
  },
  {
    text: "Central Region A",
    icon: null,
  },
  {
    text: "Kalerwe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kampala Road Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Mukono Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nakivubo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nansana Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Central Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kikuubo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kitintale Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Corporate Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Central Region B",
    icon: null,
  },
  {
    text: "Masaka Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Katwe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Entebbe Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Gomba Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kalangala Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Nateete Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Owino Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Lwengo Branch",
    icon: <AccountBalanceIcon />,
  }, 
  {
    text: "Western",
    icon: null,
  },
  {
    text: "Mbarara Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Ntungamo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Ishaka Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kabarole Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kamwenge Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Far East",
    icon: null,
  },
  {
    text: "Arua Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Busia Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kapchorwa Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kumi Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Pallisa Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Soroti Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Tororo Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Mbale Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Mid East",
    icon: null,
  },
  {
    text: "Iganga Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kayunga Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Jinja Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Kamuli Branch",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Lugazi Branch",
    icon: <AccountBalanceIcon />,
  },
]; */

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const [openCentrala, setOpencentrala] = React.useState(true);
  const openCentralA = () => {
    setOpencentrala(!openCentrala);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="0.5rem 2rem 0.5rem 1rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Department of Analytics
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List className="list-scrollbar">
              {navHome.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lCtext = text.toLowerCase();
                const lcText = lCtext.split(" ").join("");
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0.2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ fontSize: 12.5 }}
                        disableTypography
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}

              {/***** CENTRAL A REGION *****/}
              <ListItemButton onClick={openCentralA}>
                <ListItemText
                  primary="Central A Region"
                  sx={{ fontSize: 14, ml: "3rem" }}
                  disableTypography
                />
                {active === "centralaregion" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
                {openCentrala ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCentrala} timeout="auto" unmountOnExit>
                {centralA.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "0.2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          sx={{ fontSize: 12.5 }}
                          disableTypography
                        />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Collapse>

              {/***** CENTRAL B REGION *****/}
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary="Central B Region"
                  sx={{ fontSize: 14, ml: "3rem" }}
                  disableTypography
                />
                {active === "centralbregion" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {centralB.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "0.2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          sx={{ fontSize: 12.5 }}
                          disableTypography
                        />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Collapse>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
