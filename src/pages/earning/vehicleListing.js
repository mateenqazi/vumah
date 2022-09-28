import React, { useEffect, useState } from 'react';
// material
import {
  Box,
  Table,
  Switch,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Container,
  Typography
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
import { useNavigate } from 'react-router';

//
import SortingSelectingHead from '../../components/tables/sorting-selecting/SortingSelectingHead';
import SortingSelectingToolbar from '../../components/tables/sorting-selecting/SortingSelectingToolbar';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../components/animate';
import LoadingScreen from '../../components/LoadingScreen';
import { SET_VEHICLE_STATUS } from '../../graphql/Queries';
import { useMutation } from '@apollo/client';
import { InsertPhoto } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import VehicleMoreMenu from './VehicleMoreMenu';
import moment from 'moment';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: false,
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'Status'
  },
  {
    id: false,
    center: true,
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'Image'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Name'
  },
  {
    id: 'reg',
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'License plate'
  },
  {
    id: false,
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'Bookings'
  },
  {
    id: 'rate',
    numeric: false,
    disablePadding: false,
    align: 'center',
    label: 'Rate'
  },
  {
    id: 'earnings',
    numeric: false,
    disablePadding: true,
    align: 'center',
    label: 'Earnings'
  },
  {
    id: '',
    align: 'center'
  }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function SortingSelecting({ trips, earnings, data, getVehicles }) {
  const originalVehicles = data;
  const navigate = useNavigate();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [csvData, setCsvData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [vehicles, setVehicles] = useState(originalVehicles);

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isSelectedState = (id) => selectedState.indexOf(id) !== -1;
  const emptyRows = 0;
  const updateFilters = (val) => {
    setSelectedFilters(val);
  };

  const [setVehicleStatus, { loading }] = useMutation(SET_VEHICLE_STATUS);

  useEffect(() => {
    if (data?.length) setVehicles(originalVehicles);

    if (vehicles?.length > 0) {
      const csvData = [];

      vehicles?.map((row) => {
        csvData.push({
          Vehicle: `${row.make} ${row?.model === '' ? '' : `(${row.model})`}`,
          License_Plate: row?.reg,
          Type: row?.type,
          Status: Boolean(row?.status),
          Hourly_Rates: `£${row.hourlyRates}`,
          Daily_Rates: `£${row.dailyRates}`,
          Earnings: `£${getVehicleEarnings(row?.id)}`,
          Date: moment(row?.date).format('DD/MM/YY')
        });
      });

      setCsvData([...csvData]);
    }
  }, [loading, data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (vehicles) {
      if (event.target.checked) {
        const newSelecteds = vehicles?.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleClickState = (event, id) => {
    const selectedIndex = selectedState.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedState, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedState.slice(1));
    } else if (selectedIndex === selectedState.length - 1) {
      newSelected = newSelected.concat(selectedState.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedState.slice(0, selectedIndex), selectedState.slice(selectedIndex + 1));
    }
    setSelectedState(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getVehicleEarnings = (id) => {
    const vehicleEarnings = earnings?.GetUserSummaryEarning?.filter(
      (e) => Number(e?.vehicleId) === Number(id) && e?.status === 'PROCESSED'
    );
    let t = 0;
    vehicleEarnings?.map((v) => {
      t = t + Number(v?.amount) - Number(v?.fee);
    });
    return t || 0;
  };

  const getVehicleTrips = (id) => {
    const t = trips?.GetUserSummaryTrips?.filter(
      (e) => Number(e?.vehicleId) === Number(id) && e?.status === 'COMPLETE'
    ).length;
    return t || 0;
  };

  const filterVehicle = () => {
    const v = [];
    if (selectedFilters?.length < 1) {
      v.push(...vehicles);
    } else {
      selectedFilters.map((filter) => {
        v.push(...vehicles?.filter((r) => r?.vehicleType?.toLowerCase() === filter.toLowerCase()));
      });
    }
    return v;
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <SortingSelectingToolbar
            numSelected={0}
            title={'Vehicle Listing'}
            isVehicleTable={true}
            selected={selectedFilters}
            updateFilters={updateFilters}
            csvData={csvData}
          />

          {vehicles && (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 600 }}>
                  <Table size="small">
                    <SortingSelectingHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      rowCount={vehicles?.length}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {stableSort(filterVehicle(), getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          isSelectedState(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          {
                            console.log('Mateen row', row);
                          }
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox checked={isItemSelected} onClick={(event) => handleClick(event, row.id)} />
                              </TableCell>
                              <TableCell
                                component="th"
                                onClick={(event) => handleClickState(event, row.id)}
                                i
                                d={labelId}
                                sx={{ pr: 4, pl: 0 }}
                                style={{ paddingLeft: 0, paddingRight: 0, maxWidth: 44 }}
                                scope="row"
                                padding="none"
                              >
                                {row?.isDraft ? (
                                  <Label color="primary" variant="ghost">
                                    Draft
                                  </Label>
                                ) : (
                                  <Switch
                                    checked={row?.status}
                                    onClick={() => {
                                      setVehicleStatus({
                                        variables: { id: row?.id, status: !Boolean(row?.status) }
                                      }).then(async () => {
                                        await getVehicles();
                                      });
                                    }}
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  px: 0,
                                  padding: '5px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                {row?.images?.length < 1 ? (
                                  <InsertPhoto
                                    sx={{
                                      width: '80px',
                                      height: '80px',
                                      minHeight: '60px',
                                      color: (theme) => alpha(theme.palette.grey[900], 0.72)
                                    }}
                                  />
                                ) : (
                                  <>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                        minHeight: '60px'
                                      }}
                                    >
                                      <img src={row?.images[0]?.url} alt="Vumah" style={{ width: '90px' }} />
                                    </div>
                                  </>
                                )}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{ px: 0 }}
                                onClick={() => {
                                  navigate(`/vehicle/${row?.id}`);
                                }}
                              >
                                {row.make} {row.model} <br /> {row.year}
                              </TableCell>
                              <TableCell align="center" sx={{ px: 0 }}>
                                {row?.reg}
                              </TableCell>
                              <TableCell align="center">{getVehicleTrips(row?.id)}</TableCell>
                              <TableCell align="center" sx={{ px: 0 }}>
                                {/*{Number(row?.pastHourlyRates) > Number(row?.hourlyRates) && (*/}
                                {/*  <strike>(£{row?.pastHourlyRates})</strike>*/}
                                {/*)}{' '}*/}£{row.hourlyRates}/hr
                                <br />
                                {/*{Number(row?.pastDailyRates) > Number(row?.dailyRates) && (*/}
                                {/*  <strike>(£{row?.pastDailyRates})</strike>*/}
                                {/*)}{' '}*/}£{row.dailyRates}/day
                              </TableCell>
                              <TableCell align="center">£{getVehicleEarnings(row?.id)}</TableCell>
                              <TableCell align="center">
                                <VehicleMoreMenu vehicle={row} getVehicles={getVehicles} />
                              </TableCell>
                            </TableRow>
                          );
                        })}

                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <>
                {vehicles?.length < 1 && (
                  <>
                    <Box sx={{ position: 'relative' }}>
                      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
                        <motion.div variants={varFadeInDown}>
                          <Typography component="snap" variant="body1">
                            There are no vehicles for display
                          </Typography>
                        </motion.div>
                      </Container>
                    </Box>
                  </>
                )}
              </>
            </>
          )}

          {vehicles && (
            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={vehicles?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }} />
            </Box>
          )}
        </>
      )}
    </>
  );
}
