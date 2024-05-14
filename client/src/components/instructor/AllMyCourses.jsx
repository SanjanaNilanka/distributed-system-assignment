import { Box, Button, Card, Container, Grid, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ForumIcon from '@mui/icons-material/Forum';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import MyCourses from './MyCourses';
import AllMyCoursesBody from './AllMyCoursesBody';

export default function AllMyCourses() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>All My Courses</Typography>
            <Box sx={{display: 'flex', gap: 2}}>
              <Button variant='contained' href='/instructor/create-course'>Create Course</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <AllMyCoursesBody/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
