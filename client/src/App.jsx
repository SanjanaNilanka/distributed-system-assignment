import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button, CssBaseline } from '@mui/material';
import customTheme from './customTheme';
import Error404 from './components/404/Error404'
import LandingPage from './components/home/LandingPage';
import AppAppBar from './components/appbar/AppAppBar';
import CommonStack from './stacks/CommonStack';
import InstructorStack from './stacks/InstructorStack';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import CreateCourse from './components/instructor/CreateCourse';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import InstructorRegistration from './components/auth/InstructorRegistration';
import InstructorLogin from './components/auth/InstructorLogin';
import AllMyCourses from './components/instructor/AllMyCourses';
import UpdateCourse from './components/instructor/UpdateCourse';
import AdminStack from './stacks/AdminStack';





const App = () => {
  const [themeMode, setThemeMode] = React.useState('light')
  const currentTheme = createTheme(customTheme(themeMode),);

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme');
    if (themeFromLocalStorage) {
      setThemeMode(themeFromLocalStorage);
    } else {
      setThemeMode('light');
    }
  }, []);
  
  const theme = useTheme();
  const toogleTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark')
      localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light')
      localStorage.setItem('theme', 'light');
    }
    
  }
  
  const [is404, setIs404] = React.useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = React.useState(false);
  const [isFooterHiddden, setIsFooterHidden] = React.useState(false);
  const currentLocation = window.location.pathname;
  
  useEffect(() => {
    if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/') {
      setIs404(false)
    } else {
      setIs404(true)
    }

  }, []);
  
  useEffect(() => {
    if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/') {
      setIs404(false)
    } else {
      setIs404(true)
    }

  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<CommonStack toggleTheme={toogleTheme} />}>
              <Route index element={<LandingPage/>} />
              <Route path='home' element={<LandingPage/>} />
            </Route>
            <Route path="/instructor" element={<InstructorStack toggleColorMode={toogleTheme}/>}>
              <Route index element={<InstructorDashboard/>} />
              <Route path='dashboard' element={<InstructorDashboard/>} />
              <Route path='create-course' element={<CreateCourse/>} />
              <Route path='all-my-course' element={<AllMyCourses/>} />
              <Route path='update-course/:id' element={<UpdateCourse/>} />
            </Route>
            <Route path="/admin" element={<AdminStack toggleColorMode={toogleTheme}/>}>
              <Route index element={<InstructorDashboard/>} />
              <Route path='dashboard' element={<InstructorDashboard/>} />
            </Route>
            <Route path="/sign-in" element={<SignIn/>} /> 
            <Route path="/sign-up" element={<SignUp/>} /> 
            <Route path="/instructor-sign-in" element={<InstructorLogin/>} /> 
            <Route path="/instructor-sign-up" element={<InstructorRegistration/>} /> 
            <Route path="*" element={<Error404/>} /> 
          </Routes>
        </Router>
      </main>
    </ThemeProvider>
  );
}

export default App;