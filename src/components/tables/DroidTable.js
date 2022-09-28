import React, { useState } from 'react';
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
  TablePagination
} from '@mui/material';
// components
import Scrollbar from '../Scrollbar';
import SortingSelectingHead from './sorting-selecting/SortingSelectingHead';
import SortingSelectingToolbar from './sorting-selecting/SortingSelectingToolbar';
import Mercedes from '../../assets/img/Mercedes-car.jpg';

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

export default function SortingSelecting({ head, content }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = content.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isSelectedState = (id) => selectedState.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty content.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - content.length) : 0;

  return (
    <>
      <SortingSelectingToolbar numSelected={0} title={'Vehicle Listing'} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table size={'medium'}>
            <SortingSelectingHead
              order={order}
              orderBy={orderBy}
              headLabel={head}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={content.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {stableSort(content, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const isItemSelectedState = isSelectedState(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                        scope="row"
                        padding="none"
                      >
                        <Switch checked={isItemSelectedState} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <div className="bookingVechile-img" style={{ margin: 2 }}>
                          <img src={Mercedes} alt="car" />
                        </div>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.availability}</TableCell>
                      <TableCell align="right">{row.reg}</TableCell>
                      <TableCell align="right">
                        {row.hourlyRate}
                        <br />
                        {row.dailyRate}
                      </TableCell>
                      <TableCell align="right">{row.trips}</TableCell>
                      <TableCell align="right">{row.earnings}</TableCell>
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
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={content.length}
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
