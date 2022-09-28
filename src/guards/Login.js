import { capitalCase } from 'change-case';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography, Button } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthFirebaseSocials from '../components/authentication/AuthFirebaseSocial';
import MainNavbar from '../layouts/main/MainNavbar';
import MainFooter from '../layouts/main/MainFooter';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, login } = useAuth();

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainNavbar />
      <div>
        <RootStyle title="Login | Minimal-UI">
          <MHidden width="mdDown">
            <SectionStyle>
              <Typography component="snap" variant="h3" sx={{ px: 5, mt: 2, mb: 5 }} sx={{ color: 'text.primary' }}>
                Hi, Welcome Back
              </Typography>
              <img src="/static/illustrations/illustration_login.png" alt="login" />
            </SectionStyle>
          </MHidden>

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <MHidden width="smDown">
                    <Typography
                      variant="body2"
                      sx={{
                        mt: { md: -2 },
                        color: 'text.primary'
                      }}
                    >
                      Don’t have an account? &nbsp;
                      <Link underline="none" variant="subtitle2" component={RouterLink} to={'/register'}>
                        Get started
                      </Link>
                    </Typography>
                  </MHidden>
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography component="snap" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                    Sign in to Minimal
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>

                <Tooltip title={capitalCase(method)}>
                  <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
                </Tooltip>
              </Stack>

              {method === 'firebase' && <AuthFirebaseSocials />}

              <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong>&nbsp;demo1234</strong>
              </Alert>

              {method !== 'auth0' ? (
                <LoginForm />
              ) : (
                <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
                  Login
                </Button>
              )}

              <MHidden width="smUp">
                <Typography component="snap" variant="body2" align="center" sx={{ mt: 3, color: 'text.primary' }}>
                  Don’t have an account?&nbsp;
                  <Link variant="subtitle2" component={RouterLink} to={'/register'}>
                    Get started
                  </Link>
                </Typography>
              </MHidden>
            </ContentStyle>
          </Container>
        </RootStyle>
      </div>
      <MainFooter />
    </>
  );
}
