import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Popover,
  Menu,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import React, { useState } from 'react';
import { Download, FilterListRounded } from '@mui/icons-material';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import DroidDateRangePicker from '../../pickers/DateRangePickerAvailability';
import DateRangePickerAvailability from '../../pickers/DateRangePickerAvailability';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

// ----------------------------------------------------------------------

SortingSelectingToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function SortingSelectingToolbar({
  csvHeaders,
  csvData,
  numSelected,
  title,
  isVehicleTable = false,
  earningList,
  hasDownload = true,
  selected = [],
  updateFilters = () => {},
  endDate,
  setEndDate,
  startDate,
  setStartDate
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [isOpenList, setOpenList] = useState(null);

  const [fromDate, setFromDate] = useState(moment(Date.now() - 1000 * 60 * 60 * 24 * 365).format('M/DD/YYYY'));
  const [toDate, setToDate] = useState(moment().format('M/DD/YYYY'));

  function handleEvent(event, picker) {
    setFromDate(picker.startDate.format('M/DD/YYYY'));
    setToDate(picker.endDate.format('M/DD/YYYY'));
  }

  const removeItem = (s) => {
    const updatedFilters = selected.filter((item) => item !== s);
    updateFilters(updatedFilters);
  };

  const ifSelected = (s) => {
    let r = false;
    selected.forEach((item) => {
      if (item === s) r = true;
    });
    return r;
  };

  const getSelected = () => {
    if (selected.length === 1) return selected[0];
    if (selected.length === 0) return 'All';
    if (selected.length > 1 && selected.length < 4) return 'Custom';
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
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      <Stack alignItems="center" direction="row" spacing={0.5}>
        {!isVehicleTable && (
          <>
            {earningList ? (
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
                    value={`${fromDate} - ${toDate}`}
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
            ) : (
              <DateRangePickerAvailability
                endDate={endDate}
                setEndDate={setEndDate}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            )}
          </>
        )}

        {/*{isVehicleTable && (*/}
        <>
          {hasDownload && (
            <>
              {csvData && csvData.length > 0 ? (
                <CSVLink headers={csvHeaders} data={csvData} filename={'download.csv'}>
                  <Button variant="outlined" sx={{ color: 'text.secondary' }} endIcon={<Download color="primary" />}>
                    Download
                  </Button>
                </CSVLink>
              ) : (
                <Button variant="outlined" sx={{ color: 'text.secondary' }} endIcon={<Download color="primary" />}>
                  Download
                </Button>
              )}
            </>
          )}
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
                  checked={selected.length < 1}
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
                      const updatedFilters = [...selected, option];
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
        </>
        {/*)}*/}
      </Stack>
    </RootStyle>
  );
}
