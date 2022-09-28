import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1" sx={{ color: 'text.primary' }}>
        Not found
      </Typography>
      <Typography component="snap" variant="body2" align="center" sx={{ color: 'text.primary' }}>
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  );
}
