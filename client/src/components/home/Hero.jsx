import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          pl: { xs: 8, sm: 12 },
          height: '100%',
          position: 'fixed',
          zIndex: -1,
          width: '70%',
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
          <Typography
            variant="h2"
            sx={{
              display: { xs: 'block', md: 'flex' },
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: '',
              textAlign: '',
            }}
          >
            Empower Your Mind with&nbsp;
            <Typography
              component="span"
              variant="h2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Knowledge
            </Typography>
          </Typography>
          <Typography
            textAlign=""
            color="text.secondary"
            sx={{ alignSelf: '', width: { sm: '100%', md: '80%' } }}
          >
            Welcome to LearnVerse, your gateway to a world of learning opportunities!
            Whether you're a student, a professional, or simply curious,
            our course learning app is designed to elevate your skills and expand your horizons.
            Dive into a vast array of courses covering topics ranging from technology and business to arts and humanities.
            With expert instructors, interactive lessons, and flexible learning options,
            LearnVerse makes acquiring new knowledge enjoyable and convenient.
            Start your learning journey today and unlock your potential with LearnVerse!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf=""
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        {/*<Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />*/}
        
      </Box>
      <Box sx={{ height: '85vh', position: 'fixed', bottom: 0, right: 0, zIndex: -1 }}>
        <img
          src="images/uni-std.png"
          alt="hero-light"
          height="100%"
        />
      </Box>
    </Box>
  );
}
