import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, IconButton, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// redux
// utils
//
import { MHidden, MIconButton } from '../@material-extend';
import Scrollbar from '../Scrollbar';
import ChatAccount from './ChatAccount';
import ChatConversationList from './ChatConversationList';
import { SearchOutlined } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import Label from '../Label';
import useWebNotifications from '../../hooks/useWebNotifications';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 320;
const COLLAPSE_WIDTH = 96;

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker
  }
}));

// ----------------------------------------------------------------------

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SearchTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: 4
  }
}));

// ----------------------------------------------------------------------

export default function ChatSidebar({ contacts }) {
  const { user } = useAuth();
  const { notifications } = useWebNotifications();

  const theme = useTheme();
  const { pathname } = useLocation();
  const { contactKey } = useParams();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [search, setSearch] = useState('');

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCollapse = !isMobile && !openSidebar;

  useEffect(() => {
    if (isMobile) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isMobile, pathname]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleChecked = (event) => {
    setAllSelected(event.target.checked);
  };

  const findParticipant = (conversation) => {
    if (user.id !== conversation.owner1.id) return conversation.owner1;
    if (user.id !== conversation.owner2.id) return conversation.owner2;

    return {};
  };

  const filterSearch = (contacts) => {
    if (!contacts) return [];
    if (search === '') return contacts;
    return contacts?.filter(
      (c) =>
        findParticipant(c)?.firstName?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        findParticipant(c)?.lastName?.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  };

  const getUnread = () => {
    let num = 0;
    const contacts = [];
    notifications
      ?.filter((n) => !n.isRead && n?.notificationType === 'BOOKING')
      .map((n) => {
        let already = false;
        contacts?.map((v) => {
          if (v === n?.contactID) {
            already = true;
          }
        });
        if (!already) {
          contacts.push(n?.contactID);
          num = num + 1;
        }
      });
    return num;
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 1, pl: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
          {!isCollapse && (
            <Link to="/profile">
              <ChatAccount />
            </Link>
          )}

          {!isCollapse && (
            <Stack alignItems="flex-start" justifyContent="center" sx={{ height: '100%' }}>
              {/* <Link to="/profile"> */}
              <Typography
                component="snap"
                variant="h6"
                sx={{ color: 'text.primary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                // className="cpointer hover-orange-color"
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                }}
              >
                {user.firstName + ' ' + user.lastName}
              </Typography>
              {/* </Link> */}
              <Typography component="snap" variant="body2" color="primary">
                {user.isBusiness ? 'BUSINESS' : 'GUEST'}
              </Typography>
            </Stack>
          )}

          {isCollapse && (
            <MIconButton onClick={handleToggleSidebar}>
              <Icon width={20} height={20} icon={openSidebar ? arrowIosBackFill : arrowIosForwardFill} />
            </MIconButton>
          )}
        </Stack>
      </Box>

      <Stack alignItems="flex-start" justifyContent="center" spacing={2} sx={{ pt: '24px', pb: '25px', pl: 2, pr: 1 }}>
        <SearchTextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          sx={{ pl: 0.5, width: '100%' }}
        >
          <Typography
            sx={{
              fontSize: (theme) => theme.typography.pxToRem(17),
              fontWeight: (theme) => theme.typography.fontWeightBold
            }}
          >
            Inbox
          </Typography>
          <Label sx={{ fontSize: (theme) => theme.typography.pxToRem(12) }}>{getUnread()} new</Label>
        </Stack>
        {/*<Stack*/}
        {/*  direction="row"*/}
        {/*  alignItems="flex-start"*/}
        {/*  justifyContent="space-between"*/}
        {/*  spacing={1}*/}
        {/*  sx={{ width: '100%' }}*/}
        {/*>*/}
        {/*  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>*/}
        {/*    <Checkbox*/}
        {/*      checked={allSelected}*/}
        {/*      onChange={handleChecked}*/}
        {/*      inputProps={{ 'aria-label': 'controlled' }}*/}
        {/*      sx={{ color: (theme) => theme.palette.text.disabled }}*/}
        {/*    />*/}
        {/*    <Typography*/}
        {/*      sx={{*/}
        {/*        color: (theme) => theme.palette.text.disabled,*/}
        {/*        fontSize: (theme) => theme.typography.pxToRem(13)*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Select All*/}
        {/*    </Typography>*/}
        {/*  </Stack>*/}
        {/*  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>*/}
        {/*    <IconButton>*/}
        {/*      <FilterListRounded />*/}
        {/*    </IconButton>*/}
        {/*    <IconButton>*/}
        {/*      <MoreHoriz />*/}
        {/*    </IconButton>*/}
        {/*  </Stack>*/}
        {/*</Stack>*/}
      </Stack>

      <Scrollbar>
        <ChatConversationList
          allSelected={allSelected}
          conversations={filterSearch(contacts)}
          isOpenSidebar={openSidebar}
          activeContact={contactKey}
          sx={{ ...(isSearchFocused && { display: 'none' }) }}
        />
      </Scrollbar>
    </>
  );

  return (
    <>
      {contactKey && (
        <MHidden width="mdUp">
          <ToggleButtonStyle onClick={handleToggleSidebar}>
            <Icon width={16} height={16} icon={peopleFill} />
          </ToggleButtonStyle>
        </MHidden>
      )}

      {/* Mobile */}
      <MHidden width="mdUp">
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={contactKey ? openSidebar : true}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      {/* Desktop */}
      <MHidden width="mdDown">
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: DRAWER_WIDTH
            },
            ...(isCollapse && {
              width: COLLAPSE_WIDTH,
              '& .MuiDrawer-paper': {
                width: COLLAPSE_WIDTH,
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important'
              }
            })
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </>
  );
}
