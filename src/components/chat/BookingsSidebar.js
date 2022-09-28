import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import iconOpen from '@iconify/icons-eva/bookmark-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { useTheme, styled, alpha } from '@mui/material/styles';
import {
  Box,
  useMediaQuery,
  Stack,
  Drawer,
  IconButton,
  Tooltip,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  ListItem,
  Typography,
  Checkbox,
  TextField,
  InputAdornment,
  Rating,
  Divider
} from '@mui/material';
import { MIconButton, MHidden } from '../@material-extend';
import Scrollbar from '../Scrollbar';
import { useQuery } from '@apollo/client';
import { GET_USER_CONTACTS, GET_USER_REVIEWS_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../LoadingScreen';
import { FilterListRounded, Person, KeyboardArrowDown } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import MessageAvatar from './components/MessageAvatar';
import ChatBookingsList from './ChatBookingsList';
import { getLastSeen } from '../../utils/TimeCalc';

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

export default function BookingsSidebar({ participant, bookings }) {
  const OPTIONS = ['All', 'Requests', 'Ongoing', 'Complete', 'Rejected'];

  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { conversationKey } = useParams();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCollapse = !isMobile && !openSidebar;
  const [isOpenList, setOpenList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { loading: loadingReviews, data: reviews } = useQuery(GET_USER_REVIEWS_BY_ID, {
    variables: { id: participant.id }
  });

  const getReviews = (reviews) => {
    let total = 0.0;
    reviews?.GetUserByIdReviews?.map((review) => {
      const t = Number(review?.communicationRating) + Number(review?.vehicleRating) + Number(review?.experienceRating);
      total = total + t;
    });

    return reviews?.GetUserByIdReviews?.length > 0
      ? (total / (reviews?.GetUserByIdReviews?.length * 3)).toFixed(1)
      : '0.0';
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };
  const handleClose = () => {
    setOpenList(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenList(null);
  };

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

  const filterBookings = (bookings) => {
    const option = OPTIONS[selectedIndex];
    if (option === 'Requests') return bookings?.filter((b) => b?.isAccepted === null && b?.isDeclined === null);
    if (option === 'Ongoing')
      return bookings?.filter((b) => b?.isAccepted && !b?.isCheckOutComplete && !b?.isCancelled);
    if (option === 'Complete') return bookings?.filter((b) => b?.isCheckOutComplete);
    if (option === 'Rejected') return bookings?.filter((b) => b?.isDeclined);
    return bookings;
  };

  const ongoingBookings = (bookings) => {
    return bookings?.filter((b) => b?.isAccepted && !b?.isCheckOutComplete && !b?.isCancelled);
  };

  const pastBookings = (bookings) => {
    return bookings?.filter((b) => b?.isCheckOutComplete);
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 1, pl: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
          {!isCollapse && (
            <>
              <MessageAvatar
                user={participant}
                sx={{
                  cursor: 'pointer',
                  width: '60px',
                  height: '60px',
                  border: 'solid 3px black',
                  borderColor: (theme) => theme.palette.primary.main
                }}
              />
            </>
          )}

          {!isCollapse && (
            <Stack alignItems="flex-start" justifyContent="center">
              <Typography
                component="snap"
                variant="subtitle1"
                sx={{ color: 'text.primary' }}
                onClick={() => {
                  navigate(`/profile/${participant.id}`);
                }}
                className="hover-orange-color cpointer"
              >
                {participant.firstName + ' ' + participant.lastName}
              </Typography>
              <Stack direction="row" alignItems="flex-start" justifyContent="center">
                <Rating
                  readOnly
                  name="half-rating"
                  value={loadingReviews ? 0.0 : getReviews(reviews)}
                  precision={0.5}
                  size="small"
                />
                <Stack direction={'row'} spacing={1} alignItems="center">
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    ({loadingReviews ? 0.0 : getReviews(reviews)} stars |
                  </Typography>
                  <Person sx={{ fontSize: 16 }} />
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    {loadingReviews ? 0 : reviews?.GetUserByIdReviews?.length})
                  </Typography>
                </Stack>
              </Stack>
              <Typography component="snap" variant="body2" color="primary">
                {getLastSeen(new Date(Number(participant.lastSeen)))}
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

      <Stack alignItems="flex-start" justifyContent="center" spacing={0} sx={{ p: 0 }}>
        <Divider style={{ height: 0, width: '100%' }} />
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: '100%', py: 1 }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ px: 2 }}>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.disabled,
                fontSize: (theme) => theme.typography.pxToRem(13)
              }}
            >
              Active Bookings:
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: (theme) => theme.typography.pxToRem(15)
              }}
            >
              {ongoingBookings(bookings)?.length}
            </Typography>
          </Stack>
          <Divider orientation="vertical" style={{ height: '100%' }} />
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ px: 2 }}>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.disabled,
                fontSize: (theme) => theme.typography.pxToRem(13)
              }}
            >
              Past Bookings:
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: (theme) => theme.typography.pxToRem(15)
              }}
            >
              {pastBookings(bookings)?.length}
            </Typography>
          </Stack>
        </Stack>
        <Divider style={{ height: 0, width: '100%' }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: '100%', p: 2 }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.text.disabled,
              fontSize: (theme) => theme.typography.pxToRem(15)
            }}
          >
            Recent Conversations
          </Typography>
          <>
            <Tooltip title="Filter list">
              <Button
                variant="text"
                size="small"
                onClick={handleClickListItem}
                endIcon={<KeyboardArrowDown color="primary" />}
              >
                <ListItemText primary="" secondary={OPTIONS[selectedIndex]} />
              </Button>
            </Tooltip>
            <Menu keepMounted id="lock-menu" anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
              {OPTIONS.map((option, index) => (
                <MenuItem
                  key={index}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        </Stack>
      </Stack>
      <Scrollbar>
        <ChatBookingsList
          bookings={filterBookings(bookings)}
          isOpenSidebar={openSidebar}
          activeBookingId={conversationKey}
          sx={{ ...(isSearchFocused && { display: 'none' }) }}
        />
      </Scrollbar>
    </>
  );

  return (
    <>
      {conversationKey && (
        <MHidden width="mdUp">
          <ToggleButtonStyle onClick={handleToggleSidebar} sx={{ mt: 10 }}>
            <Icon width={16} height={16} icon={iconOpen} />
          </ToggleButtonStyle>
        </MHidden>
      )}

      {/* Mobile */}
      <MHidden width="mdUp">
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={conversationKey ? openSidebar : true}
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
