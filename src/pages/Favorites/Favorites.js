import React, { useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../components/animate';
import VehicleCard from '../../components/Cards/VehicleCard';
import { useQuery } from '@apollo/client';
import { GET_USER_FAVORITES } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';

function Favotites() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const { loading, data } = useQuery(GET_USER_FAVORITES);

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="flex-start" spacing={2} sx={{ py: 5 }}>
        <Grid item xs={12} container justifyContent="flex-start" alignContent="center">
          <Link to="/search" style={{ color: 'inherit', width: '100%', '&:hover': { textDecoration: 'underlined' } }}>
            <Typography sx={{ color: 'text.primary' }}>
              <ArrowBackIos sx={{ width: '12px', height: '14px', pb: '4px' }} /> Discover more vehicles
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography component="snap" variant="h4" sx={{ color: 'text.primary' }}>
            {user.firstName} {user.lastName}'s Favorites
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-start" spacing={1}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {data !== undefined ? (
                <>
                  {data.GetUserFavorites !== undefined ? (
                    <>
                      {data.GetUserFavorites.length < 1 ? (
                        <Grid item xs={12}>
                          <Container>
                            <MotionContainer initial="initial" open>
                              <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                                <motion.div variants={varBounceIn}>
                                  <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                                    You currently have nothing in your favorites
                                  </Typography>
                                </motion.div>
                                {/* Discover Vehicles Button */}
                                {/* <motion.div variants={varBounceIn}>
                                  <Button to="/search" size="large" variant="contained" component={RouterLink}>
                                    Discover Vehicles
                                  </Button>
                                </motion.div> */}
                              </Box>
                            </MotionContainer>
                          </Container>
                        </Grid>
                      ) : (
                        <>
                          {data.GetUserFavorites.map((item, index) => {
                            const isSelected = selected === index;

                            return (
                              <Grid
                                key={index}
                                spacing={2}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                xl={3}
                                onClick={() => {
                                  if (!isSelected) setSelected(index);
                                  else navigate(`/vehicle/${item.id}`);
                                }}
                              >
                                <VehicleCard vehicle={item} isSelected={isSelected} />
                              </Grid>
                            );
                          })}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Container>
                        <MotionContainer initial="initial" open>
                          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                            <motion.div variants={varBounceIn}>
                              <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                                You currently have nothing in your favorites
                              </Typography>
                            </motion.div>

                            {/* <motion.div variants={varBounceIn}>
                              <Button to="/search" size="large" variant="contained" component={RouterLink}>
                                Discover Vehicles
                              </Button>
                            </motion.div> */}
                          </Box>
                        </MotionContainer>
                      </Container>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Container>
                    <MotionContainer initial="initial" open>
                      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                          <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                            You currently have nothing in your favorites
                          </Typography>
                        </motion.div>

                        {/* <motion.div variants={varBounceIn}>
                          <Button to="/search" size="large" variant="contained" component={RouterLink}>
                            Discover Vehicles
                          </Button>
                        </motion.div> */}
                      </Box>
                    </MotionContainer>
                  </Container>
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Favotites;
