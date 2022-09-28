import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import LoginForm from '../../layouts/authGuard/LoginForm';
import RegisterForm from '../../layouts/authGuard/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import useDroidDialog from '../../hooks/useDroidDialog';
import useWebNotifications from '../../hooks/useWebNotifications';
import Label from '../Label';
import { MAvatar } from '../@material-extend';

function HeaderDropDown() {
  const { onOpen } = useDroidDialog();
  const navigate = useNavigate();

  const { notifications } = useWebNotifications();

  const { user, isAuthenticated, logout } = useAuth();
  const theme = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleDropDown() {
    setDropdownOpen((prevState) => !prevState);
  }

  const securedGuestLinks = [
    { to: '/profile', name: 'Profile' },
    { to: '/account', name: 'Account' },
    { to: '/notifications', name: 'Notifications' },
    { to: '/messages', name: 'Messages' },
    { to: '/bookings', name: 'Bookings' },
    { to: '/favorites', name: 'Favourites' }
  ];

  const securedHostLinks = [
    { to: '/profile', name: 'Profile' },
    { to: '/account', name: 'Account' },
    { to: '/notifications', name: 'Notifications' },
    { to: '/vehicle-listing', name: 'Vehicle Listing' },
    { to: '/messages', name: 'Messages' },
    { to: '/bookings', name: 'Bookings' }
  ];

  return (
    <Button
      sx={{
        width: '100px',
        borderRadius: '100px',
        display: 'flex',
        p: '5px 5px 5px 5px',
        mr: 1,
        boxShadow: theme.customShadows.z8,
        color: 'primary',
        '&:hover': { color: 'primary.main' }
      }}
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <div className="header-menu-btn">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggleDropDown}
          className="header-nav d-flex align-items-center justify-content-center justify-content-md-end mb-2 mb-md-0"
        >
          <DropdownToggle className="dropdown-toggle" style={{ marginRight: '10px' }}>
            <Menu />
          </DropdownToggle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '100px',
              backgroundColor: 'primary.main',
              '&:hover': {
                opacity: [0.9, 0.8, 0.7]
              }
            }}
          >
            {user?.avatarUrl ? (
              <MAvatar
                src={user?.avatarUrl}
                alt={user?.firstName}
                sx={{ width: 32, height: 32, m: 0.1, border: 'solid 2px #f67810' }}
              />
            ) : (
              <Person sx={{ color: '#343c45', fontWeight: 900 }} />
            )}
          </Box>
          {isAuthenticated && (
            <>
              {notifications?.filter((n) => !n.isRead)?.length > 0 && (
                <Label
                  color="primary"
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-25px',
                    borderRadius: '100px'
                  }}
                >
                  {notifications?.filter((n) => !n.isRead)?.length}
                </Label>
              )}
            </>
          )}
          <DropdownMenu className="dropdown-menu">
            {!isAuthenticated ? (
              <>
                <DropdownItem
                  onClick={() =>
                    onOpen(
                      '',
                      <>
                        <LoginForm />
                      </>
                    )
                  }
                >
                  Login
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    onOpen(
                      'Set up an account',
                      <>
                        <RegisterForm />
                      </>
                    )
                  }
                >
                  Sign Up
                </DropdownItem>
              </>
            ) : (
              <>
                {(user.isBusiness ? securedHostLinks : securedGuestLinks).map((item, index) => (
                  <DropdownItem
                    onClick={() => navigate(item.to)}
                    style={{ display: 'flex' }}
                    key={index}
                    sx={{ color: 'inherit', alignItems: 'space-between' }}
                  >
                    <snap style={{ width: '100%' }}>{item.name}</snap>
                    {item.name === 'Notifications' &&
                      notifications?.filter(
                        (n) => !n.isRead && n?.notificationType !== 'MESSAGE' && n?.notificationType !== 'BOOKING'
                      )?.length > 0 && (
                        <snap style={{ color: theme.palette.primary.main }}>
                          {
                            notifications?.filter(
                              (n) => !n.isRead && n?.notificationType !== 'MESSAGE' && n?.notificationType !== 'BOOKING'
                            )?.length
                          }
                        </snap>
                      )}
                    {item.name === 'Messages' &&
                      notifications?.filter((n) => !n.isRead && n?.notificationType === 'MESSAGE')?.length > 0 && (
                        <snap style={{ color: theme.palette.primary.main }}>
                          {notifications?.filter((n) => !n.isRead && n?.notificationType === 'MESSAGE')?.length}
                        </snap>
                      )}
                    {item.name === 'Bookings' &&
                      notifications?.filter((n) => !n.isRead && n?.notificationType === 'BOOKING')?.length > 0 && (
                        <snap style={{ color: theme.palette.primary.main }}>
                          {notifications?.filter((n) => !n.isRead && n?.notificationType === 'BOOKING')?.length}
                        </snap>
                      )}
                  </DropdownItem>
                ))}
              </>
            )}
            <DropdownItem divider />

            <DropdownItem style={{ display: 'flex' }}>
              <Link
                to="/support#1"
                style={{
                  color: 'inherit',
                  width: '100%'
                }}
              >
                Help
              </Link>
            </DropdownItem>

            {isAuthenticated && (
              <>
                {user.isBusiness && (
                  <DropdownItem style={{ display: 'flex' }} className="header-ads-manager">
                    Ads Manager
                    <span className="header-coming-soon">coming soon</span>
                  </DropdownItem>
                )}

                <DropdownItem divider />

                <DropdownItem style={{ display: 'flex' }}>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                    }}
                    style={{
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    Logout
                  </Link>
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Button>
  );
}

export default HeaderDropDown;
