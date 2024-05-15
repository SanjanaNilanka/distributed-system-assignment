import { Box, Button, Card, Typography } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Course() {
  const [courses, setCourses] = useState([])

  const getCourse = async () => { 
    try {
      const res = await axios.get('http://localhost:5000/course/get');
      setCourses(res.data.courses)
    } catch (error) {
      
    }
  }

  const filteredCourses = courses.filter(course => course.status === 'approved');


  React.useEffect(() => {
    getCourse();
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const enroll = (price) => {
    localStorage.setItem('price', price)
    window.location.pathname = '/payments'
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      {filteredCourses.slice(0, 4).map(course => (
        <Card key={course.id} sx={{width:'24%'}}>
          <Typography variant='h6' sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p:2, mb:1, pr:2}}>
            {course.title}
            <Button variant='contained' onClick={()=> enroll(course.price)}>Enroll</Button>
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
              
              <MenuItem onClick={handleClose}>
                More
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Delete
              </MenuItem>
              
            </Menu>
          </Typography>
          <img src={course.thumbnail} height={200} width="100%" />
          <Typography>{course.price} USD</Typography>
        </Card>
      ))}
    </Box>
  )
}
