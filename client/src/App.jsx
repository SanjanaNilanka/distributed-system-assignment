import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, CssBaseline } from "@mui/material";
import customTheme from "./customTheme";
import Error404 from "./components/404/Error404";
import LandingPage from "./components/home/LandingPage";
import AppAppBar from "./components/appbar/AppAppBar";
import CommonStack from "./stacks/CommonStack";
import InstructorStack from "./stacks/InstructorStack";
import InstructorDashboard from "./components/instructor/InstructorDashboard";
import CreateCourse from "./components/instructor/CreateCourse";
import LearnerDashboard from "./components/learner/learnerDashboard";
import LearnerStack from "./stacks/LearnerStack";
import EnrolledCourses from "./components/learner/enrolledCourses";
const App = () => {
  const [themeMode, setThemeMode] = React.useState("light");
  const currentTheme = createTheme(customTheme(themeMode));

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem("theme");
    if (themeFromLocalStorage) {
      setThemeMode(themeFromLocalStorage);
    } else {
      setThemeMode("light");
    }
  }, []);

  const theme = useTheme();
  const toogleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    }
  };

  const [is404, setIs404] = React.useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = React.useState(false);
  const [isFooterHiddden, setIsFooterHidden] = React.useState(false);
  const currentLocation = window.location.pathname;

  useEffect(() => {
    if (currentLocation === "/") {
      setIs404(false);
    } else if (currentLocation === "/") {
      setIs404(false);
    } else if (currentLocation === "/") {
      setIs404(false);
    } else {
      setIs404(true);
    }
  }, []);

  useEffect(() => {
    if (currentLocation === "/") {
      setIs404(false);
    } else if (currentLocation === "/") {
      setIs404(false);
    } else if (currentLocation === "/") {
      setIs404(false);
    } else {
      setIs404(true);
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      <main>
        <Router>
          <Routes>
            <Route path="/" element={<CommonStack toggleTheme={toogleTheme} />}>
              <Route index element={<LandingPage />} />
              <Route path="home" element={<LandingPage />} />
            </Route>
            <Route
              path="/instructor"
              element={<InstructorStack toggleColorMode={toogleTheme} />}
            >
              <Route index element={<InstructorDashboard />} />
              <Route path="dashboard" element={<InstructorDashboard />} />
              <Route path="create-course" element={<CreateCourse />} />
            </Route>
            <Route path="*" element={<Error404 />} />

            <Route
              path="/learner"
              element={<LearnerStack toggleColorMode={toogleTheme} />}
            >
              <Route index element={<LearnerDashboard />} />
              <Route path="dashboard" element={<LearnerDashboard />} />
              
            </Route>
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
          </Routes>
        </Router>
      </main>
    </ThemeProvider>
  );
};

export default App;
