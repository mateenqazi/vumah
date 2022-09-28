import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MotionContainer, varBounceIn, varFadeInDown } from '../../components/animate';
import { Alert, Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MailIllustration, SeverErrorIllustration } from '../../assets';
import LoginForm from '../../layouts/authGuard/LoginForm';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useMutation } from '@apollo/client';
import { EMAIL_VERIFICATION, PHONE_NUMBER_VERIFICATION } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import RequestForEmailVerification from '../../layouts/authGuard/RequestForEmailVerification';

function PhoneNumberVerification(props) {
  const { onOpen } = useDroidDialog();
  const { token } = useParams();

  const [VerifyNewNumber, { loading, data, error }] = useMutation(PHONE_NUMBER_VERIFICATION, {
    variables: { token: token }
  });

  useEffect(() => {
    VerifyNewNumber()
      .then((res) => {})
      .catch((err) => {});
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {data && (
            <>
              <Container sx={{ p: 5 }}>
                <MotionContainer initial="initial" open>
                  <Box sx={{ maxWidth: 680, margin: 'auto', textAlign: 'center' }}>
                    <Stack spacing={3} sx={{ px: 4 }}>
                      <Alert severity="success">{data.message}</Alert>
                    </Stack>

                    <motion.div variants={varBounceIn}>
                      <MailIllustration sx={{ height: 200, my: { xs: 3, sm: 6 } }} />
                    </motion.div>

                    <motion.div variants={varFadeInDown}>
                      <Paper sx={{ p: 2 }}>
                        <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                          Your Phone Number was successfully updated your can now click the button below to login
                        </Typography>
                      </Paper>
                    </motion.div>

                    <motion.div variants={varBounceIn}>
                      <Button onClick={() => onOpen('', <LoginForm />)} size="large" variant="contained" sx={{ m: 2 }}>
                        Please Login
                      </Button>
                    </motion.div>
                  </Box>
                </MotionContainer>
              </Container>
            </>
          )}
          {error && (
            <>
              <Container sx={{ p: 5 }}>
                <MotionContainer initial="initial" open>
                  <Box sx={{ maxWidth: 680, margin: 'auto', textAlign: 'center' }}>
                    <Stack spacing={3} sx={{ px: 4 }}>
                      <Alert severity="error">{error.message}</Alert>
                    </Stack>

                    <motion.div variants={varBounceIn}>
                      <SeverErrorIllustration sx={{ height: 200, my: { xs: 3, sm: 6 } }} />
                    </motion.div>

                    <motion.div variants={varFadeInDown}>
                      <Paper sx={{ p: 2 }}>
                        <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                          Your Phone Number was not updated due to some errors, you can try again or contact our support
                          team
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>
                </MotionContainer>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}

export default PhoneNumberVerification;
