import { Box, Button, Card, Container, Grid, Link, Paper, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ForumIcon from '@mui/icons-material/Forum';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';

export default function InstructorDashboard() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5'>My Courses</Typography>
            <Box sx={{display: 'flex', gap: 2}}>
              <Button variant='contained' href='/instructor/create-course'>Create Course</Button>
              <Button variant='contained'>All My Courses</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              
            </Paper>
          </Grid>
          <Grid item sx={{textAlign: 'center', my:2}} xs={12}>
            <Typography>
              Based on your experience, we think these resources will be helpful.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ px: 15, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
              <img src={window.location.pathname.startsWith('/instructor')?"../images/e-learning.png":"images/e-learning.png"} width={'300px'} />
              <Box>
                <Typography variant='h5' sx={{mb: 3}}>Create an Engaging Course</Typography>
                <Typography >
                  Whether you've been teaching for years or are teaching for the first time, you can make an engaging course.
                  We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                </Typography>
                <Link
                href='/ss'
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                  gap: 0.2,
                  mt: 1
                }}
              >
                <span>Get Started</span>
                <ArrowForwardIcon
                  sx={{ mt: '1px', ml: '2px', fontSize: 18 }}
                />
              </Link>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <img src={window.location.pathname.startsWith('/instructor')?"../images/teach.png":"images/teach.png"} width={'220px'} />
              <Box>
                <Typography variant='h5' sx={{mb: 3}}>Get Started with Video</Typography>
                <Typography >
                  Quality video lectures can set your course apart. Use our resources to learn the...
                </Typography>
                <Link
                href='/ss'
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                  gap: 0.2,
                  mt: 1
                }}
              >
                <span>Get Started</span>
                <ArrowForwardIcon
                  sx={{ mt: '1px', ml: '2px', fontSize: 18 }}
                />
              </Link>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <img src={window.location.pathname.startsWith('/instructor')?"../images/teach.png":"images/teach.png"} width={'220px'} />
              <Box>
                <Typography variant='h5' sx={{mb: 3}}>Build Your Audience</Typography>
                <Typography >
                  Build Your Audience
                  Set your course up for success by building your audience.
                </Typography>
                <Link
                href='/ss'
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                  gap: 0.2,
                  mt: 1
                }}
              >
                <span>Get Started</span>
                <ArrowForwardIcon
                  sx={{ mt: '1px', ml: '2px', fontSize: 18 }}
                />
              </Link>
              </Box>
            </Paper>
          </Grid>

          

          <Grid item sx={{textAlign: 'center', my:2}} xs={12}>
            <Typography>
              Have questions? Here are our most popular instructor resources.
            </Typography>
          </Grid>

          
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  px: 4,
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%'
                }}
              >
                <OndemandVideoIcon />
                <Link
                  href='/ss'
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                    gap: 0.2,
                    mt: 1
                  }}
                >
                  Test Video
                </Link>
                <Typography sx={{textAlign: 'center'}}>
                  Send us a sample video and get expert feedback.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  px: 4,
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%'
                }}
              >
                <ForumIcon />
                <Link
                  href='/ss'
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                    gap: 0.2,
                    mt: 1
                  }}
                >
                  Instructor Comunity
                </Link>
                <Typography sx={{textAlign: 'center'}}>
                  Connect with experienced instructors. Ask questions, browse discussions, and more.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  px: 4,
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%'
                }}
              >
                <BarChartIcon />
                <Link
                  href='/ss'
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                    gap: 0.2,
                    mt: 1
                  }}
                >
                  Marketplace Insights
                </Link>
                <Typography sx={{textAlign: 'center'}}>
                  Validate your course topic by exploring our marketplace supply and demand.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  px: 4,
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%'
                }}
              >
                <HelpIcon />
                <Link
                  href='/ss'
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                    gap: 0.2,
                    mt: 1
                  }}
                >
                  Help & Support
                </Link>
                <Typography sx={{textAlign: 'center'}}>
                  Send us a sample video and get expert feedback.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

        
      </Container>
    </div>
  )
}
