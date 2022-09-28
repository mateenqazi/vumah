import { Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavbar from '../../components/header';
import MainFooter from '../../components/footer/footer';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isFooterHidden =
    pathname.startsWith('/chat') ||
    pathname.startsWith('/search') ||
    pathname.startsWith('/messages') ||
    pathname.startsWith('/bookings') ||
    pathname.startsWith('/booking');

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
    if (theme.palette.mode === 'light') {
      document.body.classList.remove('dark-theme');
    } else document.body.classList.add('dark-theme');
  }, []);

  return (
    <>
      <MainNavbar />
      <Container
        maxWidth="xl"
        sx={{ mt: '80px', display: 'block', p: 0 }}
        style={{ padding: 0, minHeight: 'calc(100vh - 494px)' }}
      >
        <Outlet />
      </Container>
      {!isFooterHidden && <MainFooter />}
    </>
  );
}
