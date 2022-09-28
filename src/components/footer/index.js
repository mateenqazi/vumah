import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import googleFill from '@iconify/icons-eva/google-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill }
];

const LINKS = [
  {
    headline: 'Company',
    children: [
      { name: 'About us', href: '/about-us' },
      { name: 'Careers', href: '/career' },
      { name: 'Partner with us', href: '/partnership' },
      { name: 'Terms & Conditions', href: '/tos' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  },
  {
    headline: 'Become a Host',
    children: [
      { name: 'Start your business', href: '/host-guide#create-a-listing' },
      { name: 'Host support', href: '/support#2' },
      { name: 'Host ranking', href: '/host-guide#host-rankings-and-performance' },
      { name: 'Vehicle protection & insurance', href: '/tos#37' }
    ]
  },
  {
    headline: 'Guest Support',
    children: [
      { name: 'Kickstart your journey', href: '/guest-guide#getting-started-with-vumah' },
      { name: 'Trouble with booking', href: '/guest-guide#trouble-with-booking' },
      { name: 'Guest fees', href: '/guest-guide#guest-fees' },
      { name: 'Account safety', href: '/guest-guide#account-safety' }
    ]
  },
  {
    headline: 'Support Centre',
    children: [
      { name: 'Support page', href: '/support#1' },
      { name: 'Trust & safety', href: '/trust' },
      { name: 'Cancellations', href: '/tos#6' },
      { name: 'Covid-19 guidelines', href: '/covid' },
      { name: 'FAQs', href: '/faq' }
    ]
  }
];

const DarkModeBtn = () => {
  const theme = useTheme();

  return (
    <div className="dark-light-mode-main">
      <label>
        <input className="toggle-checkbox" type="checkbox" onChange={theme.toggleDarkMode} />
        <div className="toggle-slot">
          <div className="sun-icon-wrapper">
            <Icon icon="feather-sun" className="sun-icon" />
          </div>
          <div className="toggle-button"></div>
          <div className="moon-icon-wrapper">
            <Icon icon="feather-moon" className="moon-icon" />
          </div>
        </div>
      </label>
    </div>
  );
};

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  py: 4
}));

function Index(props) {
  return (
    <RootStyle>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} container justifyContent="center" sx={{ my: 5, mx: 4 }}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="snap" variant="h4">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        <Typography component="snap" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          {link.name}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} container justifyContent="space-between" sx={{ mx: 4 }}>
            <Grid item xs={12} md={6} container justifyContent="flex-start">
              <Grid item xs={12}>
                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontSize: 13,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  © 2021. All rights reserved
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1.5} direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ my: 1 }}>
                  {SOCIALS.map((social) => (
                    <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                      <Icon icon={social.icon} width={16} height={16} />
                    </IconButton>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent="flex-end">
              <DarkModeBtn />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

export default Index;
