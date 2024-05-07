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
import AppAppBar from './components/home/AppAppBar';
import Payment from './components/payments/Payment';

/*const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'dark' && {
        main: "#105bd8",
      }),
      ...(mode === 'light' && {
        main: "#105bd8",
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
        navbar: "rgb(0, 0, 0, 0.8)"
      },
    }),
    ...(mode === 'light' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
        navbar: "rgb(255, 255, 255, 0.8)"
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});*/





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
  const currentLocation = window.location.pathname;
  useEffect(() => {
    if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/mrp-home') {
      setIs404(false)
    } else if (currentLocation === '/mrp') {
      setIs404(false)
    } else {
      setIs404(true)
    }

  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <header>
        {is404? <div></div> : <AppAppBar toggleColorMode={toogleTheme} />}
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="*" element={<Error404/>} />
            <Route path="/payments" element={<Payment/>} />
          </Routes>
        </Router>
      </main>
      <footer>
        
      </footer>
    </ThemeProvider>
  );
}

export default App;