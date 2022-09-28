import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import iconOpen from '@iconify/icons-eva/bookmark-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
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
  Typography,
  TextField,
  Rating,
  Divider
} from '@mui/material';
import { MIconButton, MHidden } from '../@material-extend';
import Scrollbar from '../Scrollbar';
import { useQuery } from '@apollo/client';
import { GET_USER_CONTACTS, GET_USER_REVIEWS_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../LoadingScreen';
import { Person } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import MessageAvatar from '../chat/components/MessageAvatar';
import ChatVehiclesList from './ChatVehiclesList';
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

export default function VehiclesSidebar({ vehicles, participant }) {
  const { user } = useAuth();

  const theme = useTheme();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCollapse = !isMobile && !openSidebar;

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
              <Typography component="snap" variant="subtitle1" sx={{ color: 'text.primary' }}>
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
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ width: '100%', p: 2 }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.disabled,
              fontSize: (theme) => theme.typography.pxToRem(15)
            }}
          >
            Recent Conversations
          </Typography>
        </Stack>
      </Stack>
      <Scrollbar>
        <ChatVehiclesList
          vehicles={vehicles}
          isOpenSidebar={openSidebar}
          activeBookingId={conversationKey}
          sx={{ ...(isSearchFocused && { display: 'none' }) }}
        />
      </Scrollbar>
    </>
  );

  return (
    <>
      <>
        <MHidden width="mdUp">
          <ToggleButtonStyle onClick={handleToggleSidebar} sx={{ mt: 10 }}>
            <Icon width={16} height={16} icon={iconOpen} />
          </ToggleButtonStyle>
        </MHidden>

        {/* Mobile */}
        <MHidden width="mdUp">
          <Drawer
            ModalProps={{ keepMounted: true }}
            open={openSidebar}
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
    </>
  );
}
