import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// material
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const PageVumah = forwardRef(({ children, title = 'Vumah', ...other }, ref) => {
  const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10)
  }));

  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ContentStyle>{children}</ContentStyle>
    </Box>
  );
});

PageVumah.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default PageVumah;
