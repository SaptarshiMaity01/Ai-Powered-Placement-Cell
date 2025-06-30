import React, { useMemo, useState } from "react";
import { Routes, Route, useLocation, Navigate, useBlocker } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

import Navheader from "./components/Navheader";
import LandingPage from "./components/LandingPage";
import Contact from "./components/pages/ContactUs";
import Read from "./components/pages/Read";
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import Resumeparser from "components/resumeparser";
import ResumeBuilder from "./ResumeBuilder/resumebuilder";
import EventCalendar from "components/eventcalendar";
import Jobs from "components/jobs"
import Student from "admin/students"
import Message from "admin/message"
import Announcements from "admin/announcements"
import Recruiter from "admin/recruiter"
import JobListing from "admin/joblisting"
import CareerChatbot from "chatbot/careerchatbot"
import JobPosting from "recruiter/jobposting";
import JobApplicants from "recruiter/jobapplicants";
import AiMock from "MockInterview/aimock"
import SplashCursor from "components/SplashCursor";
import ResumeScreening  from "recruiter/ResumeScreening"


import StudentDashboard from "../src/dashboard/studentdashboard"
import CompanyDashboard from "../src/dashboard/companydashboard"
import AdminDashboard from "../src/dashboard/admindashboard"
import Layout from "scenes/layout";
import Profil from "../src/profile"

import NotFound from "./ResumeBuilder/NotFound";
import { themeSettings } from "./theme";
import { useAuth } from '../src/services/AuthContext'; 

const queryClient = new QueryClient();

// Wrapper to use `useLocation` in the top App structure
const AppWrapper = () => {
  const location = useLocation();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { isAuthenticated, user, } = useAuth(); // Get auth state
  const role = user?.role?.toLowerCase();
  // Block public routes if authenticated
  const BlockPublicRoutes = ({ children }) => {
    if (isAuthenticated) {
      
      // Redirect to dashboard if trying to access public pages
      if (role === 'admin') return <Navigate to="/admindashboard" replace />;
    if (role === 'company') return <Navigate to="/companydashboard" replace />;
    if (role === 'student') return <Navigate to="/studentdashboard" replace />;
   
    }
    return children;
  };

  // Protect private routes (unchanged)
  const ProtectedRoute = ({ children,}) => {
    const { isAuthenticated, isLoading} = useAuth();


    if (isLoading) {
      return <div className="text-center p-6">Loading...</div>; // or a spinner
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/SignIn" replace state={{ from: location }} />;
    }
    
  
    return children;
  };

  const dashboardPaths = ["/resumebuilder", "/admin", "/performance", "/eventcalendar", "/profile" , "/admindashboard" ,"/jobposting", 
    "/studentdashboard", "/companydashboard", "/profile", "/jobs","/students","/message", "/announcements","/recruiter","/joblisting","/resumescreening",
    "/careerchatbot","/jobapplicants","/resumeparser","/aimock"];
  const isDashboard = dashboardPaths.some(path => 
    location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isDashboard ? (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="dashboard-container">
            
                <Routes>
                  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/resumebuilder" element={<ResumeBuilder />} />
                  <Route path="/eventcalendar" element={<EventCalendar />} />
                  <Route path="/resumeparser" element={<Resumeparser/>}/>
                  <Route path="/admindashboard" element={<AdminDashboard/>} />
                  <Route path="/studentdashboard" element={<StudentDashboard/>} />
                  <Route path="/companydashboard" element={<CompanyDashboard/>} />
                  <Route path="/profile" element={<Profil/>} />
                  <Route path="/jobs" element={<Jobs/>}/>
                  <Route path="/students" element={<Student/>}/>
                  <Route path="/message" element={<Message/>}/>
                  <Route path="/announcements" element={<Announcements/>}/>
                  <Route path="/recruiter" element={<Recruiter/>}/>
                  <Route path="/joblisting" element={<JobListing/>}/>
                  <Route path="/careerchatbot" element={<CareerChatbot/>}/>
                  <Route path="/jobposting" element={<JobPosting/>}/>
                  <Route path="/jobapplicants" element={<JobApplicants/>}/>
                  <Route path="/aimock" element={<AiMock/>}/>
                  <Route path="/resumescreening" element={<ResumeScreening/>}/>
                  
                  
                 
                  {/* Other protected routes... */}
                </Route>
                {/* Catch-all for invalid dashboard paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeProvider>
        ) : (
          <div className="landing-container">
            
            <Navheader />
            <Routes>
              {/* Public routes wrapped in BlockPublicRoutes */}
              <Route path="/" element={<BlockPublicRoutes><LandingPage /></BlockPublicRoutes>} />
              <Route path="/SignIn" element={<BlockPublicRoutes><SignIn /></BlockPublicRoutes>} />
              <Route path="/SignUp" element={<BlockPublicRoutes><SignUp /></BlockPublicRoutes>} />
              <Route path="/ContactUs" element={<BlockPublicRoutes><Contact /></BlockPublicRoutes>} />
              <Route path="/Read" element={<BlockPublicRoutes><Read /></BlockPublicRoutes>} />
               {/* Example: Optional public route */}
              {/* Catch-all for non-dashboard paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default AppWrapper;
