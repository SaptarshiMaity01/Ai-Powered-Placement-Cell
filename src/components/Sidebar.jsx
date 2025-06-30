import React, { useEffect, useState } from "react";
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
  DashboardOutlined,
  AnnouncementOutlined,
  CalendarTodayOutlined,
  AccountCircleOutlined,
  PsychologyAltOutlined,
  MessageOutlined,
  PeopleAltOutlined,
  WorkOutlineOutlined,
  ChatBubbleOutlineOutlined,
  AssignmentOutlined,
  SchoolOutlined,
  BusinessOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

import { useSelector } from "react-redux";
import { getProfile } from "../services/profileService";

const navItems = {
  student: [
    { text: "StudentDashboard", icon: <SchoolOutlined /> },
    { text: "Announcements", icon: <AnnouncementOutlined /> },
    { text: "EventCalendar", icon: <CalendarTodayOutlined /> },
    { text: "ResumeBuilder", icon: <AssignmentOutlined /> },
    { text: "Profile", icon: <AccountCircleOutlined /> },
    { text: "ResumeParser", icon: <PsychologyAltOutlined /> },
    { text: "AIMock", icon: <PsychologyAltOutlined /> },
    { text: "CareerChatbot", icon: <ChatBubbleOutlineOutlined /> },
    { text: "Message", icon: <MessageOutlined /> },
    { text: "Jobs", icon: <WorkOutlineOutlined /> },

  ],
  admin: [
    { text: "AdminDashboard", icon: <DashboardOutlined /> },
    { text: "Announcements", icon: <AnnouncementOutlined /> },
    { text: "EventCalendar", icon: <CalendarTodayOutlined /> },
    { text: "Message", icon: <MessageOutlined /> },
    { text: "Students", icon: <PeopleAltOutlined /> },
    { text: "Recruiter ", icon: <PeopleAltOutlined /> },
    { text: "JobListing", icon: <WorkOutlineOutlined /> },
  ],
  company: [
    { text: "Company Dashboard", icon: <BusinessOutlined /> },
    { text: "EventCalendar", icon: <CalendarTodayOutlined /> },
    { text: "Message", icon: <MessageOutlined /> },
    { text: "JobPosting", icon: <WorkOutlineOutlined /> },
    { text: "JobApplicants", icon: <PeopleAltOutlined /> },
    { text: "ResumeScreening",icon: <PeopleAltOutlined />},
  ],
};

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

  const user = useSelector((state) => state.user.user);

  // Debugging user object
  useEffect(() => {
    console.log("User from Redux:", user);
  }, [user]);

  const userRole = user?.role?.toLowerCase() || null;
  const itemsToRender = userRole ? navItems[userRole] || [] : [];
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

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
              color: "#051024", // Dark blue for text
              backgroundColor: "#030A1C", // Darker blue for background
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color="#061831"> {/* Medium blue for heading */}
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                  PLACEMENT PORTAL
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ color: "#FFFFFF" }} />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {itemsToRender.map(({ text, icon }) => {
                const lcText = text.toLowerCase().replace(/\s+/g, "");
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
                            ? "#11244A" // Active item background
                            : "transparent",
                        color:
                          active === lcText
                            ? "#FFFFFF" // White text for active item
                            : "#D1D5DB", // Light gray for inactive text
                        "&:hover": {
                          backgroundColor: "#0B1C3E", // Hover color
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "#FFFFFF" // White for active icon
                              : "#9CA3AF", // Gray for inactive icon
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto", color: "#FFFFFF" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {user && (
            <Box position="absolute" bottom="2rem">
              <Divider sx={{ backgroundColor: "#0B1C3E" }} />
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                {profile?.profilePicture ? (
                  <Box
                    component="img"
                    alt="profile"
                    src={profile.profilePicture}
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    bgcolor="#11244A"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#FFFFFF"
                    fontWeight="bold"
                    fontSize="1.1rem"
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Box>
                )}
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: "#FFFFFF" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: "#9CA3AF" }}
                  >
                    {user.role}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "25px",
                    "&:hover": {
                      color: "#FFFFFF",
                    },
                  }}
                />
              </FlexBetween>
            </Box>
          )}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
