import { Box, Button, Card, Container, Grid, Link, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ForumIcon from '@mui/icons-material/Forum';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import MyCourses from '../instructor/MyCourses';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function AdminDashboard() {
  const [courses, setCourses] = useState([])

  const getCourse = async () => { 
    try {
      const res = await axios.get('http://localhost:5000/course/get');
      setCourses(res.data.courses)
    } catch (error) {
      
    }
  }

  const approveCourse = async () => { 
    try {
      const res = await axios.put(`http://localhost:5000/course/approve/${selectedCourse}`);
      getCourse()
    } catch (error) {
      
    }
  }
  
  const rejectCourse = async () => { 
    try {
      const res = await axios.put(`http://localhost:5000/course/reject/${selectedCourse}`);
      getCourse()
    } catch (error) {
      
    }
  }

  const pendingCourses = courses.filter(course => course.status === 'pending');
  const approvedCourses = courses.filter(course => course.status === 'approved');
  const rejectedCourses = courses.filter(course => course.status === 'rejected');


  React.useEffect(() => {
    getCourse();
  }, [])

  const [selectedCourse, setSelectedCourse] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>Pending Courses</Typography>
            
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
              {pendingCourses.map(course => (
                <Card key={course.id} sx={{width:'24%', mb:2}}>
                  <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'center', pl:2, mb:1}}>
                    {course.title}
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => { setSelectedCourse(course._id); handleClick(e); }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      
                      <MenuItem onClick={() => { setSelectedCourse(course._id); approveCourse(); }}>
                        Accept
                      </MenuItem>
                      <MenuItem onClick={()=>{ setSelectedCourse(course._id); rejectCourse(); }}>
                        Reject
                      </MenuItem>
                      
                    </Menu>
                  </Typography>
                  <img src={course.thumbnail} height={200} width="100%"/>
                </Card>
              ))}
            </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>Approved Courses</Typography>
            
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
              {approvedCourses.map(course => (
                <Card key={course.id} sx={{width:'24%'}}>
                  <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'center', pl:2, mb:1}}>
                    {course.title}
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      
                      <MenuItem onClick={()=>approveCourse(course._id)}>
                        Accept
                      </MenuItem>
                      <MenuItem onClick={()=>rejectCourse(course._id)}>
                        Reject
                      </MenuItem>
                      
                    </Menu>
                  </Typography>
                  <img src={course.thumbnail} height={200} width="100%"/>
                </Card>
              ))}
            </Box>
            </Paper>
          </Grid>


          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>Rejected Courses</Typography>
            
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
              {rejectedCourses.map(course => (
                <Card key={course.id} sx={{width:'24%'}}>
                  <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'center', pl:2, mb:1}}>
                    {course.title}
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      
                      <MenuItem onClick={()=>approveCourse(course._id)}>
                        Accept
                      </MenuItem>
                      <MenuItem onClick={()=>rejectCourse(course._id)}>
                        Reject
                      </MenuItem>
                      
                    </Menu>
                  </Typography>
                  <img src={course.thumbnail} height={200} width="100%"/>
                </Card>
              ))}
            </Box>
            </Paper>
          </Grid>

        </Grid>

        
      </Container>
    </div>
  )
}
