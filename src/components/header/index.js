import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  useTheme,
  CardActionArea,
  Dialog,
  DialogTitle,
  IconButton,
  ClickAwayListener
} from '@mui/material';
import Logo from '../../assets/img/logo-main.png';

import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import HeaderDropDown from './HeaderDropDown';
import SearchHeader from './SearchHeader';
import SearchBar from './SearchBar';
import useOffSetTop from '../../hooks/useOffSetTop';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();

  const { pathname } = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const isChat = pathname === '/bookings' || pathname === '/messages' || pathname === '/search';

  const isHome = pathname === '' || pathname === '/';

  const isOffset = useOffSetTop(300);

  const becomeHost = () => {
    if (isAuthenticated) return <></>;
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          size="large"
          component={RouterLink}
          to="/landing-page"
          sx={{ borderRadius: '100px', mx: 1, color: 'white', '&:hover': { color: 'white' } }}
        >
          Become a host
        </Button>
      </>
    );
  };

  const becomeHostWidth = () => {
    if (user) {
      if (user.isBusiness) return '230px';
    }
    return '312px';
  };

  const handleCloseSearch = () => {
    if (!isDatePickerOpen) setSearchOpen(false);
  };

  return (
    <AppBar
      sx={{
        p: 1,
        bgcolor: theme.palette.mode === 'dark' ? '#28293d' : '#f8f9fa',
        boxShadow: isChat ? theme.customShadows.z1 : theme.customShadows.z8
      }}
    >
      <ToolbarStyle disableGutters sx={{ height: { md: APP_BAR_DESKTOP - 38 } }}>
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <RouterLink to="/">
            <img src={Logo} height="50px" alt="logo" />
          </RouterLink>

          <Box sx={{ flexGrow: 1, pl: { xs: '0', lg: becomeHostWidth() } }}>
            {isHome ? (
              <>
                {isOffset && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                    <CardActionArea
                      sx={{ width: 'fit-content', borderRadius: '100px' }}
                      onClick={() => setSearchOpen(!searchOpen)}
                    >
                      <SearchHeader isOpen={searchOpen} />
                    </CardActionArea>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
                  <CardActionArea
                    sx={{ width: 'fit-content', borderRadius: '100px' }}
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <SearchHeader isOpen={searchOpen} />
                  </CardActionArea>
                </Box>
              </>
            )}
          </Box>

          {becomeHost()}

          <Button
            color="primary"
            variant="text"
            size="large"
            component={RouterLink}
            to="/about-us"
            sx={{
              borderRadius: '100px',
              mr: 2,
              ml: 1,
              height: '2.5rem',
              p: '8px 22px',
              boxShadow: theme.customShadows.z1,
              color: 'primary.main',
              '&:hover': { color: 'primary.main' }
            }}
          >
            About Us
          </Button>

          <HeaderDropDown />
        </Container>
      </ToolbarStyle>

      {searchOpen && (
        <>
          {isHome ? (
            <>
              {isOffset && (
                <ToolbarStyle disableGutters sx={{ height: { md: APP_BAR_DESKTOP - 88 } }}>
                  <ClickAwayListener
                    onClickAway={() => {
                      handleCloseSearch();
                    }}
                  >
                    <Container
                      maxWidth="xl"
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2 }}
                    >
                      <SearchBar onClose={handleCloseSearch} setIsDatePickerOpen={setIsDatePickerOpen} />
                    </Container>
                  </ClickAwayListener>
                </ToolbarStyle>
              )}
            </>
          ) : (
            <>
              <ToolbarStyle disableGutters sx={{ height: { md: APP_BAR_DESKTOP - 88 } }}>
                <ClickAwayListener
                  onClickAway={() => {
                    handleCloseSearch();
                  }}
                >
                  <Container
                    maxWidth="xl"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2 }}
                  >
                    <SearchBar onClose={handleCloseSearch} setIsDatePickerOpen={setIsDatePickerOpen} />
                  </Container>
                </ClickAwayListener>
              </ToolbarStyle>
            </>
          )}
        </>
      )}

      <ToolbarShadowStyle />
    </AppBar>
  );
}
