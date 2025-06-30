import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import useAuth from "../../components/hooks/useAuth"

const Layout = () => {
    useAuth();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Sidebar state added

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            {/* ✅ Pass required props to Sidebar */}
            <Sidebar 
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen} // ✅ Fix: Pass isSidebarOpen
                setIsSidebarOpen={setIsSidebarOpen} // ✅ Fix: Pass setIsSidebarOpen
            />
            <Box flexGrow={1}>
                {/* ✅ Navbar controls the sidebar */}
                <Navbar 
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;

