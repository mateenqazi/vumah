import React, { useState } from 'react';
import { Avatar, Box, Card, Divider, Grid, List, ListItem, Pagination, Rating, Stack, Typography } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { fData, fShortenNumber } from '../../utils/formatNumber';
import { useCallback } from 'react';
import UploadSingleFile from '../../components/upload/UploadAvatar';
import { styled, useTheme } from '@mui/material/styles';
import { LocalActivity, VerifiedRounded, VerifiedUser } from '@mui/icons-material';
import CustomerReview from '../../assets/img/customer-review-img-1.png';
import { fDate } from '../../utils/formatTime';
import CarouselProfile from '../Profile/CarouselProfile';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE_BY_ID, GET_USER_REVIEWS_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import { useParams } from 'react-router-dom';
import { isString } from 'lodash';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`
}));

export default function NewGuestProfile({ profile, loadingReviews, reviews }) {
  const theme = useTheme();

  if (loadingReviews) return <LoadingScreen />;

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

  const getReviewsC = (reviews) => {
    let total = 0.0;
    reviews?.GetUserByIdReviews?.map((review) => {
      const t = Number(review?.communicationRating);
      total = total + t;
    });
    return reviews?.GetUserByIdReviews?.length > 0 ? (total / reviews?.GetUserByIdReviews?.length).toFixed(1) : '0.0';
  };

  const getReviewsV = (reviews) => {
    let total = 0.0;
    reviews?.GetUserByIdReviews?.map((review) => {
      const t = Number(review?.vehicleRating);
      total = total + t;
    });
    return reviews?.GetUserByIdReviews?.length > 0 ? (total / reviews?.GetUserByIdReviews?.length).toFixed(1) : '0.0';
  };

  const getReviewsE = (reviews) => {
    let total = 0.0;
    reviews?.GetUserByIdReviews?.map((review) => {
      const t = Number(review?.experienceRating);
      total = total + t;
    });
    return reviews?.GetUserByIdReviews?.length > 0 ? (total / reviews?.GetUserByIdReviews?.length).toFixed(1) : '0.0';
  };

  const getViews = () => {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < reviews?.GetUserByIdReviews?.length; i += chunkSize) {
      const chunk = reviews?.GetUserByIdReviews?.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    let r = [];
    chunks?.map((item, index) => {
      r.push(
        <List disablePadding>
          {item?.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </List>
      );
    });
    return r;
  };

  return (
    <Stack
      sx={{ justifyContent: 'center', alignItems: 'center', my: 4, mt: 6, pt: 5, px: { xs: 0.2, md: 1, lg: 2, xl: 4 } }}
    >
      <Grid container spacing={4} sx={{ maxWidth: '1500px' }}>
        <Grid item xs={12} md={4} sx={{ minHeight: '100%' }}>
          <Card sx={{ pt: 2, pb: 1, px: 0, textAlign: 'center', minHeight: '100%' }}>
            <RootStyle>
              <Box
                component="img"
                alt="avatar"
                src={profile?.avatarUrl}
                sx={{
                  zIndex: 8,
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}
              />
            </RootStyle>

            <Stack sx={{ pt: 4 }}>
              <Typography component="snap" variant="h3">
                {profile?.firstName} {profile?.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <RatingStyle readOnly value={getReviews(reviews)} precision={0.1} sx={{ mb: 0 }} />
              <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                ({fShortenNumber(reviews?.GetUserByIdReviews?.length)}
                &nbsp;reviews)
              </Typography>
            </Stack>
            <Divider style={{ height: 0 }} />
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', mt: 2, mb: 1, px: 3 }}
            >
              <LocalActivity sx={{ fontSize: 24 }} color="primary" />
              <Typography component="snap" variant="body2" sx={{ textAlign: 'start' }}>
                All-Star guests like Franky are the top-rated and most experienced guests on Vumah.
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', mt: 1, mb: 2, px: 3 }}
            >
              <VerifiedUser sx={{ fontSize: 24 }} color="primary" />
              <Typography component="snap" variant="body2">
                Identity verified
              </Typography>
            </Stack>
            <Divider style={{ height: 0 }} sx={{ mx: 3 }} />
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3, px: 3 }}
            >
              <Typography component="snap" variant="body2" sx={{ textAlign: 'start' }}>
                Personal Identity
              </Typography>
              <VerifiedRounded color="success" />
            </Stack>
            <Stack
              direction="row"
              spacing={0}
              sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 1, px: 3 }}
            >
              <Typography component="snap" variant="body2" sx={{ textAlign: 'start' }}>
                Approved To Drive
              </Typography>
              <VerifiedRounded color="success" />
            </Stack>
            <Divider style={{ height: 0 }} sx={{ mx: 1 }} />
            <Stack sx={{ justifyContent: 'center', alignItems: 'flex-start', mt: 3, mb: 1, px: 3 }}>
              <Typography component="snap" variant="caption" sx={{ textAlign: 'start' }}>
                <a href="/guest-guide" style={{ color: theme.palette.primary.main }}>
                  {' '}
                  Learn more{' '}
                </a>{' '}
                about how confirming account info helps keep the Vumah community secure.
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ pt: 6, pb: 6, px: 3, minHeight: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  <Stack
                    sx={{
                      px: 3,
                      pb: 3,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography component="snap" variant="h4" sx={{ mb: 3 }}>
                      Ratings & Reviews
                    </Typography>
                    <Typography component="snap" variant="subtitle1" gutterBottom>
                      Average rating
                    </Typography>
                    <Typography component="snap" variant="h2" gutterBottom>
                      {getReviews(reviews)}/5
                    </Typography>
                    <RatingStyle readOnly value={getReviews(reviews)} precision={0.1} />
                    <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                      ({fShortenNumber(reviews?.GetUserByIdReviews?.length)}
                      &nbsp;reviews)
                    </Typography>
                  </Stack>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} sx={{ width: 1, justifyContent: 'space-between' }}>
                      <Typography>Guest Communication?</Typography>
                      <Rating value={getReviewsC(reviews)} precision={0.1} readOnly />
                    </Stack>
                    <Divider style={{ height: 0 }} />
                    <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
                      <Typography>Vehicle Condition?</Typography>
                      <Rating value={getReviewsV(reviews)} precision={0.1} readOnly />
                    </Stack>
                    <Divider style={{ height: 0 }} />
                    <Stack direction="row" spacing={2} sx={{ width: 1, justifyContent: 'space-between' }}>
                      <Typography>Overall Experience?</Typography>
                      <Rating value={getReviewsE(reviews)} precision={0.1} readOnly />
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={7}>
                <Stack spacing={2} sx={{ pl: 2, borderLeft: '1px #faaf0070 solid' }}>
                  <CarouselProfile reviews={getViews()} />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function ReviewItem({ review }) {
  const getRate = () => {
    const t = Number(review?.communicationRating) + Number(review?.vehicleRating) + Number(review?.experienceRating);
    return t / 3 || 1.0;
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            src={review?.user?.avatarUrl ? review?.user?.avatarUrl : CustomerReview}
            sx={{
              mr: { xs: 2, sm: 0 },
              width: { md: 64 },
              height: { md: 64 }
            }}
          />
          <Stack>
            <Typography component="snap" variant="subtitle2" noWrap>
              {review?.user?.firstName} {review?.user?.lastName}
            </Typography>
            <Typography component="snap" variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(review?.postedAt)}
            </Typography>
            <Rating size="small" value={getRate()} precision={0.1} readOnly />
          </Stack>
        </Stack>

        <div>
          <Typography component="snap" variant="body2">
            {review?.comment}
          </Typography>
        </div>
      </ListItem>
    </>
  );
}
