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
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
  Container,
  Toolbar,
  Button,
  Stack,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
//
import SortingSelectingHead from '../../components/tables/sorting-selecting/SortingSelectingHead';
import SortingSelectingToolbar from '../../components/tables/sorting-selecting/SortingSelectingToolbar';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import { Download, FilterListRounded, Visibility } from '@mui/icons-material';
import { varBounceIn, varFadeInDown } from '../../components/animate';
import { SeverErrorIllustration } from '../../assets';
import { motion } from 'framer-motion';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { CSVLink } from 'react-csv';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

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

export default function EarningListing({ head, content, title, isProcessed, totalEarning }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [csvData, setCsvData] = useState([]);

  const [isOpenList, setOpenList] = useState(null);

  const [fromDate, setFromDate] = useState(moment(Date.now() - 1000 * 60 * 60 * 24 * 365));
  const [toDate, setToDate] = useState(moment(Date.now()));

  function handleEvent(event, picker) {
    setFromDate(picker.startDate);
    setToDate(picker.endDate);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = earningsData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty content.

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const updateFilters = (val) => {
    setSelectedFilters(val);
  };

  const feeTotal = 0;
  const earnTotal = 0;

  useEffect(() => {
    let filteredVehicles = [];
    if (selectedFilters.length) {
      const lowerCaseFilters = selectedFilters.map((val) => val.toLowerCase());
      filteredVehicles = content.filter((earning) => {
        return lowerCaseFilters.includes(earning.vehicle.vehicleType.toLowerCase());
      });
      setEarningsData(filteredVehicles);
    } else {
      setEarningsData(content);
    }

    if (earningsData.length > 0) {
      const data = [];

      earningsData.forEach((row) => {
        data.push({
          Vehicle: `${row?.vehicle?.make} - (${row?.vehicle?.model})`,
          Booking_Id: row?.booking?.id,
          Date: moment(row?.date).format('DD/MM/YY h:mm a'),
          Status: row?.status,
          Fee: `£${row?.fee}`,
          Amount: `£${row?.amount}`,
          Total_Amount: `£${Number(row?.amount) - Number(row?.fee)}`
        });
      });

      setCsvData([...data]);
    }
  }, [content, selectedFilters]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - earningsData.length) : 0;

  const filterVehicle = () => {
    const v = [];
    if (selectedFilters?.length < 1) {
      v.push(...earningsData);
    } else {
      selectedFilters.map((filter) => {
        v.push(...earningsData?.filter((r) => r?.vehicle?.vehicleType?.toLowerCase() === filter.toLowerCase()));
      });
    }
    return v.filter((s) => moment(s?.date).isBetween(fromDate, toDate));
  };

  const removeItem = (s) => {
    const updatedFilters = selectedFilters.filter((item) => item !== s);
    updateFilters(updatedFilters);
  };

  const ifSelected = (s) => {
    let r = false;
    selectedFilters.forEach((item) => {
      if (item === s) r = true;
    });
    return r;
  };

  const getSelected = () => {
    if (selectedFilters.length === 1) return selectedFilters[0];
    if (selectedFilters.length === 0) return 'All';
    if (selectedFilters.length > 1 && selectedFilters.length < 4) return 'Custom';
    return 'All';
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };

  const handleClose = () => {
    setOpenList(null);
  };

  const OPTIONS = ['Car', 'Bicycle', 'Motorcycle', 'Campervan'];

  return (
    <>
      <RootStyle>
        <Typography variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        <Stack alignItems="center" direction="row" spacing={0.5}>
          <DateRangePicker
            initialSettings={{
              timePicker: false,
              opens: 'left',
              endDate: toDate,
              startDate: fromDate,
              maxDate: moment()
            }}
            onChange={() => {}}
            alwaysShowCalendars={true}
            onEvent={handleEvent}
          >
            <div className="contact-form-field field-label">
              <input
                type="text"
                name="daterange"
                value={`${fromDate.format('M/DD/YYYY')} - ${toDate.format('M/DD/YYYY')}`}
                style={{
                  borderColor: '#f67810',
                  height: '30px',
                  textAlign: 'center',
                  paddingLeft: '10px',
                  paddingRight: '10px'
                }}
              />
            </div>
          </DateRangePicker>
          <CSVLink
            data={[
              ...csvData,
              {
                Vehicle: 'Total Net Earning',
                Total_Amount: `£${totalEarning}`
              }
            ]}
            filename={'download.csv'}
          >
            <Button variant="outlined" sx={{ color: 'text.secondary' }} endIcon={<Download color="primary" />}>
              Download
            </Button>
          </CSVLink>
          <>
            <Tooltip title="Filter list">
              <Button
                variant="outlined"
                sx={{ color: 'text.secondary' }}
                onClick={handleClickListItem}
                endIcon={<FilterListRounded color="primary" />}
              >
                {getSelected()}
              </Button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={isOpenList}
              open={Boolean(isOpenList)}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem>
                <Checkbox
                  checked={selectedFilters.length < 1}
                  onChange={() => {
                    const updatedFilter = [];
                    updateFilters(updatedFilter);
                    setOpenList(undefined);
                  }}
                />
                All
              </MenuItem>
              {OPTIONS.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    if (ifSelected(option)) {
                      removeItem(option);
                    } else {
                      const updatedFilters = [...selectedFilters, option];
                      updateFilters(updatedFilters);
                    }
                  }}
                >
                  <Checkbox label={option} checked={ifSelected(option)} onChange={() => {}} />
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        </Stack>
      </RootStyle>

      <Scrollbar>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table size={dense ? 'small' : 'medium'}>
            <SortingSelectingHead
              order={order}
              orderBy={orderBy}
              headLabel={head}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={earningsData?.length || 0}
              onSelectAllClick={handleSelectAllClick}
              hideCheckBox={true}
            />

            <TableBody>
              {stableSort(filterVehicle(), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        style={{
                          padding: '5px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        align="center"
                      >
                        <div
                          style={{
                            width: '90px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            marginRight: 0,
                            minHeight: '60px'
                          }}
                        >
                          <img src={row?.vehicle?.images?.[0]?.url} alt="Vumah" style={{ width: '90px' }} />
                        </div>
                      </TableCell>
                      <TableCell id={labelId} padding="none" align="center">
                        {row?.vehicle?.make} {row?.vehicle?.model}
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0 }}>
                        {row?.vehicle?.reg}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {new moment(row?.date).format('DD/MM/YYYY')}
                        <br />
                        {new moment(row?.date).format('h:mm a')}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.amount}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.fee}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        0
                      </TableCell>
                      <TableCell align="center" style={{ paddingRight: 0 }} padding="none">
                        {row?.amount - row?.fee}
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

      {earningsData.length < 1 && (
        <>
          <Box sx={{ position: 'relative' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
              <motion.div variants={varFadeInDown}>
                <Typography component="snap" variant="body1">
                  There are no data for display
                </Typography>
              </motion.div>
            </Container>
          </Box>
        </>
      )}

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={earningsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }} />
      </Box>
    </>
  );
}
