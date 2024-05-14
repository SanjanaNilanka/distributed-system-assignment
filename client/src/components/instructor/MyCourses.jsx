import { Box, Card, Typography } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function MyCourses() {
  const [courses, setCourses] = useState([])

  const getCourse = async () => { 
    try {
      const res = await axios.get('http://localhost:5000/course/get');
      setCourses(res.data.courses)
    } catch (error) {
      
    }
  }

  const filteredCourses = courses.filter(course => course.author === localStorage.getItem('userID'));


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

  return (
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      {filteredCourses.slice(0, 4).map(course => (
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
          <img src={course.thumbnail} height={200} width="100%"/>
        </Card>
      ))}
    </Box>
  )
}
