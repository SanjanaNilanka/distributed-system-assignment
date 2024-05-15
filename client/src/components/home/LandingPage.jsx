import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Hero from './Hero';
import LogoCollection from './LogoCollection';
import Highlights from './Highlights';
import Pricing from './Pricing';
import Features from './Features';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Instructor from './Instructor';
import Course from './Course';
import { Container, Typography } from '@mui/material';

export default function LandingPage() {



  return (
    <div>
      <CssBaseline />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <LogoCollection />
        <Container sx={{mb:5}}>
          <Typography sx={{textAlign: 'center', mb:2}} variant='h4'>Courses</Typography>
          <Course/>
        </Container>
        
        <Features />
        <Testimonials />
        <Highlights />
        {/*<Pricing />*/}
        <FAQ />
        <Instructor/>
      </Box>
    </div>
  );
}
