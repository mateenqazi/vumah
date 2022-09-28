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
  Typography
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
import { Done, MoreVert, Remove } from '@mui/icons-material';
import createAvatar from '../../utils/createAvatar';
import { MAvatar } from '../../components/@material-extend';
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_STAFF_MEMBERS } from '../../graphql/Queries';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../components/animate';
import LoadingScreen from '../../components/LoadingScreen';
import { getLastSeen } from '../../utils/TimeCalc';
import moment from 'moment';
import useDroidDialog from '../../hooks/useDroidDialog';
import EditStaffMember from './EditStaffMember';
import DeleteStaffMember from './DeleteStaffMember';
import AddStaffMember from './AddStaffMemberNew';
import StaffMembersTableMore from './StaffMembersTableMore';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;

// ----------------------------------------------------------------------

export default function StaffMembersListing({ loading, data, error, getMembers }) {
  const { onOpen } = useDroidDialog();

  if (loading) return <LoadingScreen />;

  if (error) return <>Error while fetching data</>;

  return (
    <>
      <div className="add-staff-member">
        <div className="row align-items-center mb-4">
          <div className="col-8">
            <h2 className="m-0">Staff Members</h2>
          </div>
          <div className="col-4 text-right-align">
            <button
              className="add-icon mr-2 p-0"
              onClick={() => onOpen('Add Staff Member', <AddStaffMember getMembers={getMembers} />)}
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
                      <TableCell />
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Email
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Permissions
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Last Login
                      </TableCell>
                      <TableCell align="left" sx={{ p: '8px' }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {!loading && data && (
                    <TableBody>
                      {data?.GetStaffMembers?.map((row, index) => (
                        <TableRow key={row?.id}>
                          <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                            <MAvatar
                              src={row?.user?.avatarUrl}
                              alt={'Vumah'}
                              color={row?.user?.avatarUrl ? 'default' : createAvatar(row?.user?.firstName).color}
                              sx={{ mx: 'auto', mb: 2, height: 30, width: 30, fontSize: '20px' }}
                            >
                              {createAvatar(row?.user?.firstName).name}
                            </MAvatar>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row?.user?.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row?.roleGroup?.name}
                          </TableCell>
                          <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                            {moment(new Date(Number(row?.user?.lastSeen))).format('DD/MMM/YYYY (HH:mm A)')}
                          </TableCell>
                          <TableCell align="center">
                            <StaffMembersTableMore row={row} getMembers={getMembers} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {!loading && data && (
                <>
                  {data?.GetStaffMembers?.length < 1 && (
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
