import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

SortingSelectingHead.propTypes = {
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  headLabel: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired
};

export default function SortingSelectingHead({
  center,
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  hideCheckBox = false
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const getAlignment = (headCell) => {
    if (center) {
      return 'center';
    } else {
      return headCell.numeric ? 'right' : 'left';
    }
  };

  return (
    <TableHead>
      <TableRow>
        {!hideCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            sx={{
              textAlign: headCell.label === 'Image' ? 'center' : 'center'
            }}
            key={headCell.id}
            align={getAlignment(headCell)}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== false ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ paddingLeft: '25px' }}
                align="center"
              >
                <>
                  {orderBy === headCell.id ? (
                    <Box component="snap" sx={{ ...visuallyHidden }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </>
                {headCell.label}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
