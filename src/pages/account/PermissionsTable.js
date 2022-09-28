import { useState } from 'react';
// material
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
import { Done, Remove } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GET_GROUP_ROLES } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';

// ----------------------------------------------------------------------

const BASIC_TABLE = [
  { id: 1, name: 'View Profile', readOnly: true, standard: true, admin: true },
  { id: 2, name: 'View Listings', readOnly: true, standard: true, admin: true },
  { id: 3, name: 'Edit Listings', readOnly: false, standard: true, admin: true },
  { id: 4, name: 'View Earnings', readOnly: false, standard: true, admin: true },
  { id: 5, name: 'View Availability', readOnly: true, standard: true, admin: true },
  { id: 6, name: 'Edit Availability', readOnly: false, standard: true, admin: true },
  { id: 7, name: 'Edit Profile', readOnly: false, standard: true, admin: true },
  { id: 8, name: 'View Account', readOnly: false, standard: false, admin: true },
  { id: 9, name: 'View Billing', readOnly: false, standard: false, admin: true },
  { id: 10, name: 'Edit Account', readOnly: false, standard: false, admin: true },
  { id: 11, name: 'Edit Billing info', readOnly: false, standard: false, admin: true },
  { id: 12, name: 'Add User', readOnly: false, standard: false, admin: true },
  { id: 13, name: 'Edit User', readOnly: false, standard: false, admin: true },
  { id: 14, name: 'View Messages', readOnly: true, standard: true, admin: true },
  { id: 15, name: 'Send Messages', readOnly: false, standard: true, admin: true },
  { id: 16, name: 'View Bookings', readOnly: true, standard: true, admin: true },
  { id: 17, name: 'Control Bookings', readOnly: false, standard: true, admin: true }
];

// ----------------------------------------------------------------------

export default function PermissionsTable({ setPermissions, permissions }) {
  const { error, data, loading } = useQuery(GET_GROUP_ROLES);

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    data.GetRoleGroups.map((group) => {
      if (group?.name === event.target.value) {
        setPermissions({
          id: group?.id,
          name: group?.name
        });
        setValue(event.target.value);
      }
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <Scrollbar>
      <RadioGroup aria-label="gender" name="customized-radios" value={value} onChange={handleChange}>
        <TableContainer sx={{ minWidth: 400, mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: '8px' }}>Details</TableCell>
                <TableCell align="right" sx={{ p: '8px' }}>
                  <FormControlLabel
                    value="Read Only"
                    control={<Radio />}
                    label="Read Only"
                    labelPlacement="bottom"
                    sx={{ whiteSpace: 'nowrap' }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ p: '8px' }}>
                  <FormControlLabel value="Standard" control={<Radio />} label="Standard" labelPlacement="bottom" />
                </TableCell>
                <TableCell align="right" sx={{ p: '8px' }}>
                  <FormControlLabel value="Admin" control={<Radio />} label="Admin" labelPlacement="bottom" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BASIC_TABLE.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.readOnly ? <Done color="success" /> : <Remove color="error" />}
                  </TableCell>
                  <TableCell align="center">
                    {row.standard ? <Done color="success" /> : <Remove color="error" />}
                  </TableCell>
                  <TableCell align="center">
                    {row.admin ? <Done color="success" /> : <Remove color="error" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>
    </Scrollbar>
  );
}
