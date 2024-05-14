import { Box, Button, Card, Link, Typography } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AllMyCoursesBody() {
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

  const [selectedCourse, setSelectedCourse] = React.useState('');

  const [modelOpen, setModelOpen] = React.useState(false);
  const handleModelOpen = (id) => {
    setSelectedCourse(id);
    setModelOpen(true);
  }
  const handleModelClose = () => setModelOpen(false);

  const handleDelete = async() => {
    try {
      const res = await axios.delete(`http://localhost:5000/course/delete/${selectedCourse}`);
      if (res.data.success) {
        handleModelClose();
        getCourse();
      }
    } catch (error) {
      
    }
  }

  return (
    <Box sx={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      {filteredCourses.map(course => (
        <Card key={course.id} sx={{width:'24%', mb: 2}}>
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
              <MenuItem href={`/instructor/update-course/${course._id}`}>
                <Link href={`/instructor/update-course/${course._id}`}>Edit</Link> 
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); handleModelOpen(course._id); }}>
                Delete
              </MenuItem>
              
            </Menu>
          </Typography>
          <img src={course.thumbnail} height={200} width="100%" />
          <Typography sx={{display:'flex', ml:2}}>Current Status: <Typography> &nbsp;{ course.status }</Typography></Typography>
        </Card>
      ))}
      <Modal
        open={modelOpen}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to permanently delete this course?
          </Typography>
          <Box sx={{mt:2}}>
            <Button sx={{color:'success.main'}} onClick={handleModelClose}>Cancel</Button>
            <Button sx={{color:'error.main'}} onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
