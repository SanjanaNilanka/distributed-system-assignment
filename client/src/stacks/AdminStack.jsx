import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../components/instructor/listItems';
import InstructorDashboard from '../components/instructor/InstructorDashboard';
import ToggleColorMode from '../components/toggle-mode/ToggleColorMode';
import CreateCourse from '../components/instructor/CreateCourse';
import axios from 'axios';
import { Avatar } from '@mui/material';
import AllMyCourses from '../components/instructor/AllMyCourses';
import UpdateCourse from '../components/instructor/UpdateCourse';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
export default function AdminStack({ mode, toggleColorMode }) {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [loggedInUserDetails, setLoggedInUserDetails] = React.useState(null);
  
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    
    const getLooggedInUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/auth/logged-user`, {
          headers: {
            Authorization: `${token}`
          }
        });
        
        if (response.data.success) {
          setLoggedInUser(response.data.user)
          localStorage.setItem('role', response.data.user.role)
          localStorage.setItem('userID', response.data.user._id)
          console.log(loggedInUser)
          console.log(response.data.user)
        }
      } catch (err) {
        
      }
    };
    
    const getLooggedInUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/instructor/get/${localStorage.getItem('userID')}`);
        
        
          setLoggedInUserDetails(response.data)
        
      } catch (err) {
        
      }
    };

    getLooggedInUser();
    getLooggedInUserDetails();
  }, [])
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" sx={{bgcolor: 'background.navbar'}} open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="text.primary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                px: 0,
                gap: 1
              }}
          >
            {!window.location.pathname.startsWith('/instructor') &&
              <img
                src="images/logo.png" 
                style={{width: '25px'}}
                alt="logo of sitemark"
              />
            }
            {(window.location.pathname.startsWith('/instructor') && !window.location.pathname.startsWith('/instructor/up') ) &&
              <img
                src="../images/logo.png" 
                style={{width: '25px'}}
                alt="logo of sitemark"
              />
            }
            {window.location.pathname.startsWith('/instructor/up') &&
              <img
                src="../../images/logo.png" 
                style={{width: '25px'}}
                alt="logo of sitemark"
              />
            }
              
              <Typography variant='h4' color='primary.main' sx={{}}>LearnVerse</Typography>
            </Box>
          <Typography
            component="h1"
            variant="h6"
            color="text.primary"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Instructor Dashboard
          </Typography>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          <IconButton color="inherit">
            
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {isLoggedIn &&
            <Box sx={{display:'flex', alignItems:'center', gap:1, ml:2}}>
              <Typography >{loggedInUserDetails?.fullName}</Typography>
              <Avatar/>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{...(!open && { display: 'none' }),}}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path='/' element={<InstructorDashboard/>} />
          <Route path='dashboard' element={<InstructorDashboard/>} />
          <Route path='/create-course' element={<CreateCourse />} />
          <Route path='/all-my-course' element={<AllMyCourses />} />
          <Route path='/update-course/:id' element={<UpdateCourse/>} />
        </Routes>
      </Box>
    </Box>
  )
}
