import { Avatar, ListItem, Rating, Stack, Typography } from '@mui/material';
import avatar from '../assets/User-avatar.svg';
import { fDate } from '../utils/formatTime';
import React from 'react';
import { useNavigate } from 'react-router';

export default function ReviewItem({ review }) {
  const navigate = useNavigate();

  const getRate = () => {
    const t = Number(review?.communicationRating) + Number(review?.vehicleRating) + Number(review?.experienceRating);
    return t / 3 || 1.0;
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 3,
          ml: 1,
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            src={review?.user?.avatarUrl ? review?.user?.avatarUrl : avatar}
            sx={{
              mr: { xs: 2, sm: 0 },
              width: { md: 32 },
              height: { md: 32 }
            }}
          />
          <Stack spacing={0.2}>
            {console.log('PAKISTAN', review)}
            <Typography
              component="snap"
              variant="body2"
              noWrap
              onClick={() => {
                navigate(`/profile/${review?.user?.id}`);
              }}
              className="cpointer hover-orange-color"
            >
              {review?.user?.firstName} {review?.user?.lastName}
            </Typography>
            <Typography component="snap" variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(review?.postedAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Rating size="small" value={getRate()} precision={0.1} readOnly />

          <Typography component="snap" variant="caption" sx={{ maxWidth: '450px' }}>
            {review?.comment}
          </Typography>
        </Stack>
      </ListItem>
    </>
  );
}
