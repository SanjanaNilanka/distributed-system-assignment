import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function Instructor() {
  return (
    <Container
      sx={{
        pt: { xs: 8, sm: 10 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box>
        <img src='images/instructor.jpg' alt='instrucyot.jpg'/>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: { xs: 3, sm: 2 },
        }}
      >
        <Typography>Become an instructor</Typography>
        <Typography>Instructors from around the world teach millions of learners on LearnVerse. We provide the tools and skills to teach what you love.</Typography>
        <Button variant='contained'>Start Teaching Today</Button>
      </Box>
    </Container>
  )
}
