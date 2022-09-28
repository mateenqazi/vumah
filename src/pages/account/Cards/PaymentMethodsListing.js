// material
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Typography,
  Checkbox,
  Switch
} from '@mui/material';
// components
import Scrollbar from '../../../components/Scrollbar';
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_CARDS, UPDATE_USER } from '../../../graphql/Queries';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../../components/animate';
import LoadingScreen from '../../../components/LoadingScreen';
import useDroidDialog from '../../../hooks/useDroidDialog';
import AddPaymentCard from './AddPamentCard';
import Visa from '../../../assets/svg/payments/visa';
import Amex from '../../../assets/svg/payments/american_express';
import MasterCard from '../../../assets/svg/payments/mastercard';
import { Close, Delete } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';
import { MIconButton } from '../../../components/@material-extend';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function PaymentMethodsListing({ loading, error, paymentMethods, getCards }) {
  const { onOpen } = useDroidDialog();

  const { user, updateUser: getUserNewInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [UpdateUserInfo] = useMutation(UPDATE_USER);

  if (loading || loadingUpdate) return <LoadingScreen />;

  if (error) return <>Error while fetching data</>;

  const setDefaultCard = async (id) => {
    setLoadingUpdate(true);
    await UpdateUserInfo({
      variables: {
        user: {
          id: user.id,
          businessName: user.businessName,
          address: user.address,
          address2: user.address2,
          city: user.city,
          country: user.country,
          description: user.description,
          postalCode: user.postalCode,
          cover: user.cover,
          avatarUrl: user.avatarUrl,
          license: user.license,
          checkInCode: user.checkInCode,
          licensesType: user.licensesType,
          businessNumber: user.businessNumber,
          defaultCard: id
        }
      }
    })
      .then(() => {
        getUserNewInfo();
        enqueueSnackbar('Default card updated successfully', {
          variant: 'success'
        });
        setLoadingUpdate(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Default card update failed', {
          variant: 'error'
        });
        setLoadingUpdate(false);
      });
  };

  return (
    <>
      <div className="add-staff-member">
        <div className="row align-items-center mb-4">
          <div className="col-8">
            <h2 className="m-0">Payment Methods</h2>
          </div>
          <div className="col-4 text-right-align">
            <button
              className="add-icon mr-2 p-0"
              onClick={() => onOpen('Add Card', <AddPaymentCard getCards={getCards} />)}
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
        <div>
          <Card sx={{ py: 2, px: 0.5 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 200, my: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Default
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Bank
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Card Number
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Expiry Date
                      </TableCell>
                      <TableCell align="center" sx={{ p: '8px' }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {!loading && (
                    <TableBody>
                      {paymentMethods?.map((paymentMethod) => (
                        <TableRow key={paymentMethod?.id}>
                          <TableCell>
                            <Switch
                              checked={paymentMethod?.id === user?.defaultCard}
                              onClick={() => setDefaultCard(paymentMethod?.id)}
                            />
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            {paymentMethod?.card?.brand === 'mastercard' && <MasterCard />}
                            {paymentMethod?.card?.brand === 'visa' && <Visa />}
                            {paymentMethod?.card?.brand === 'american_express' && <Amex />}
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            **** **** **** {paymentMethod?.card?.last4}
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            {Number(paymentMethod?.card?.expMonth) > 10
                              ? paymentMethod?.card?.expMonth
                              : `0${paymentMethod?.card?.expMonth}`}{' '}
                            / {paymentMethod?.card?.expYear}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              disabled={paymentMethod?.id === user?.defaultCard}
                              sx={{
                                color: 'error.main'
                              }}
                            >
                              <Delete />
                            </IconButton>
                            {/*<PaymentMethodsTableMore />*/}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {!loading && (
                <>
                  {paymentMethods?.length < 1 && (
                    <>
                      <Box sx={{ position: 'relative' }}>
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
                          <motion.div variants={varFadeInDown}>
                            <Typography component="snap" variant="body1">
                              There are no staff members yet for display
                            </Typography>
                          </motion.div>
                        </Container>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Scrollbar>
          </Card>
        </div>
      </div>
    </>
  );
}
