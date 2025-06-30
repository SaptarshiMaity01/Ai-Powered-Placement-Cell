import React, { useState, useEffect } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { getProfile } from "../services/profileService";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const user = useSelector((state) => state.user.user);
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

  return (
    <AppBar
      sx={{
        position: "static",
        background: "#030A1C", // Dark blue background
        boxShadow: "none",
        borderBottom: "1px solid #0B1C3E", // Darker blue border
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ color: "#FFFFFF" }} // White icon
          >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor="#0B1C3E" // Darker blue for search background
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase 
              placeholder="Search..." 
              sx={{ 
                color: "#D1D5DB", // Light gray text
                "&::placeholder": {
                  color: "#9CA3AF", // Gray placeholder
                }
              }} 
            />
            <IconButton sx={{ color: "#9CA3AF" }}> {/* Gray search icon */}
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton>
            <SettingsOutlined sx={{ 
              fontSize: "25px",
              color: "#9CA3AF", // Gray icon
              "&:hover": {
                color: "#FFFFFF", // White on hover
              }
            }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                "&:hover": {
                  backgroundColor: "transparent",
                }
              }}
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
                  bgcolor="#11244A" // Dark blue background for initials
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#FFFFFF" // White text
                  fontWeight="bold"
                  fontSize="1.1rem"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Box>
              )}

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "#FFFFFF" }} // White text
                >
                  {user?.name || "Guest"}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: "#9CA3AF" }} // Gray text
                >
                  {user?.role || "User"}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: "#9CA3AF", fontSize: "25px" }} // Gray icon
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              PaperProps={{
                style: {
                  backgroundColor: "#030A1C", // Dark blue background
                  color: "#FFFFFF", // White text
                  border: "1px solid #0B1C3E", // Darker blue border
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logoutUser());
                  window.location.href = "/";
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#0B1C3E", // Darker blue on hover
                  }
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;