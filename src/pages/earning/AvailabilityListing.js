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
  TableHead,
  TableSortLabel
} from '@mui/material';
// components
import Scrollbar from '../../components/Scrollbar';
//
import SortingSelectingToolbar from '../../components/tables/sorting-selecting/SortingSelectingToolbar';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import { InsertPhoto, Visibility } from '@mui/icons-material';
import { varBounceIn, varFadeInDown } from '../../components/animate';
import { motion } from 'framer-motion';
import LoadingScreen from '../../components/LoadingScreen';
import moment from 'moment';
import { alpha } from '@mui/material/styles';
import useDroidDialog from '../../hooks/useDroidDialog';
import EditSpecificAvailabilityDate from './EditSpecificAvailabilityDate';

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

export default function AvailabilityListing({ data, loading, getVehicles }) {
  const originalVehicles = data;
  const { onOpen } = useDroidDialog();

  const dateeeStart = moment(moment().unix() * 1000 - 1000 * 60 * 60 * 24 * moment().day());
  const dateeeEnd = moment(moment().unix() * 1000 - 1000 * 60 * 60 * 24 * moment().day() + 1000 * 60 * 60 * 24 * 6);

  const [endDate, setEndDate] = useState(dateeeEnd);
  const [startDate, setStartDate] = useState(dateeeStart);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [vehicles, setVehicles] = useState(originalVehicles);
  const updateFilters = (val) => {
    setSelectedFilters(val);
  };
  useEffect(() => {
    if (!loading) {
      if (data?.length) setVehicles(data);
    }
  }, [loading, data]);

  const head = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      align: 'center',
      label: 'Name'
    },
    {
      id: 'reg',
      numeric: false,
      disablePadding: false,
      align: 'center',
      label: 'License Plate'
    }
  ];

  const content = [
    {
      image: (
        <div className="booking-vechile-outer">
          <div className="bookingVechile-img margin-right-ten">
            <img src={Mercedes} alt="car" />
          </div>
          <div className="bookingVechile-detail mt-2">
            <h2 className="text-dark-white" style={{ textAlign: 'left' }}>
              Mercedes
            </h2>
            <p className="mb-0" style={{ textAlign: 'left' }}>
              <span style={{ fontWeight: '500', marginRight: '5px' }}>£24/hr</span>
              (£100/day)
            </p>
          </div>
        </div>
      ),
      reg: 'MA68LXG',
      sun: '04:00 - 16:00',
      mon: 'Available',
      tue: 'Unavailable',
      wed: '04:00 - 16:00',
      thu: 'Available',
      fri: '04:00 - 16:00',
      sat: 'Unavailable'
    }
  ];

  const color = (s) => {
    if (s === 'Unavailable') {
      return 'error.main';
    }
    if (s === 'Available') {
      return 'success.main';
    }
    if (s === 'All Day') {
      return 'success.main';
    }
    return 'warning.main';
  };

  const getAlignment = (headCell) => {
    if (headCell.label === 'Image') return 'center';
    if (headCell.numeric) return 'right';
    return 'left';
  };

  useEffect(() => {
    const doDays = [];

    for (let i = 0; i < 7; i++) {
      const day = moment(startDate).add(i, 'days');

      doDays.push({
        id: i,
        numeric: false,
        disablePadding: false,
        day: day
      });
    }

    setDays(doDays);
  }, [startDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const emptyRows = 0;

  const SortingHead = (
    <TableHead>
      <TableRow>
        <TableCell padding={'normal'} sortDirection={false} align="left">
          Image
        </TableCell>
        {head.map((headCell, index) => (
          <TableCell
            key={index}
            // align={getAlignment(headCell)}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ padding: '6px 0px' }}
            align="left"
          >
            {headCell.label}
          </TableCell>
        ))}
        {days.map((headCell, index) => (
          <TableCell key={index} align="center" padding="normal" sortDirection={false} sx={{ pl: 0 }}>
            {headCell.day.format('ddd Do')}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  useEffect(() => {
    let tempHead = [];
    let tempData = [];

    if (vehicles !== null) {
      head.forEach((headCell) => {
        if (headCell.label !== 'Image')
          tempHead.push({
            label: headCell.label,
            key: headCell.label
          });
      });

      days.forEach((headCell) => {
        tempHead.push({
          label: headCell.day.format('ddd Do'),
          key: headCell.day.format('ddd Do')
        });
      });

      vehicles?.forEach((val) => {
        let row = { 'License Plate': val.reg, id: val.id };

        val.availability.forEach((item, idx) => {
          days.forEach((dayVal) => {
            if (item.label === dayVal.day.format('dddd')) {
              row = {
                ...row,
                [dayVal.day.format('ddd Do')]:
                  item.timeType === 'Custom Hours'
                    ? new moment(item.dayStart).format('h:mm a') + '-' + new moment(item.dayEnd).format('h:mm a')
                    : item.timeType
              };
            }
          });
        });
        tempData.push({ ...row });
      });

      setCsvHeaders([...tempHead]);
      setCsvData([...tempData]);
    }
  }, [vehicles]);

  const getSpecificAvailability = (vehicle, date) => {
    let a = null;
    vehicle?.availableSpecificDates?.map((item) => {
      if (moment(date).format('M/DD/YYYY') === moment(item?.date).startOf('day').format('M/DD/YYYY')) a = item;
    });
    // console.log('----------------------------------------------------------------------');
    // console.log(data);
    // console.log(vehicle);
    // console.log(vehicle?.availableSpecificDates);
    // console.log(a);
    return a;
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
          <Scrollbar>
            <SortingSelectingToolbar
              numSelected={0}
              title=""
              csvData={csvData}
              csvHeaders={csvHeaders}
              hasDownload={false}
              selected={selectedFilters}
              updateFilters={updateFilters}
              endDate={endDate}
              setEndDate={setEndDate}
              startDate={startDate}
              setStartDate={setStartDate}
            />

            {vehicles !== null && (
              <TableContainer sx={{ minWidth: 902 }}>
                <Table size={'small'}>
                  {SortingHead}
                  <TableBody>
                    {stableSort(filterVehicle(), getComparator(order, orderBy))
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row, index) => {
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
                              align="center"
                              style={{
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              {row.images.length < 1 ? (
                                <InsertPhoto
                                  sx={{
                                    width: '80px',
                                    height: '60px',
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
                                    <img src={row.images[0].url} alt="Vumah" style={{ width: '90px' }} />
                                  </div>
                                </>
                              )}
                            </TableCell>
                            <TableCell align="left" sx={{ px: 0 }}>
                              {row.make} ({row.model})
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              style={{ padding: '6px 0px' }}
                              align="left"
                            >
                              {row.reg}
                            </TableCell>
                            {row.availability.map((item, index) => {
                              if (item.label === days[0].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[0].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[0]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {moment(a.dayStart).format('h:mm a')} <br />-
                                            <br /> {moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[0]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[1].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[1].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[1]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[1]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[2].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[2].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[2]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[2]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[3].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[3].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[3]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[3]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[4].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[5].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[4]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[4]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[5].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[5].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[5]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[5]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {row.availability.map((item, index) => {
                              if (item.label === days[6].day.format('dddd')) {
                                const a = getSpecificAvailability(row, days[6].day);
                                return (
                                  <>
                                    {a ? (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[6]?.day}
                                              availability={a}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(a.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {a.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(a.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(a.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          a.timeType
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        onClick={() =>
                                          onOpen(
                                            'Edit Availability',
                                            <EditSpecificAvailabilityDate
                                              vehicle={row}
                                              date={days[6]?.day}
                                              availability={item}
                                              getVehicles={getVehicles}
                                            />,
                                            true
                                          )
                                        }
                                        align="center"
                                        sx={{
                                          color: color(item.timeType),
                                          pr: 1,
                                          pl: 0,
                                          borderRadius: 1,
                                          '&:hover': {
                                            backgroundColor: (theme) => `${theme.palette.primary.light}90`
                                          }
                                        }}
                                        key={index}
                                      >
                                        {item.timeType === 'Custom Hours' ? (
                                          <>
                                            {new moment(item.dayStart).format('h:mm a')} <br />
                                            -
                                            <br /> {new moment(item.dayEnd).format('h:mm a')}
                                          </>
                                        ) : (
                                          item.timeType
                                        )}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              }
                            })}
                            {/*<TableCell align='right'><IconButton><Visibility /></IconButton></TableCell>*/}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Scrollbar>

          {vehicles !== null && vehicles?.length < 1 && (
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
              count={vehicles !== null ? vehicles?.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }} />
          </Box>
        </>
      )}
    </>
  );
}
