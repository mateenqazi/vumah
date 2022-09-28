import { motion } from 'framer-motion';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Logo from '../assets/img/logo-main.png';
import * as React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100px',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent'
}));

// ----------------------------------------------------------------------

export default function LoadingSection({ ...other }) {
  return (
    <>
      <RootStyle {...other}>
        <motion.div>
          <img src={Logo} height="25px" alt="logo" />
        </motion.div>

        <Box
          component={motion.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['50%', '50%', '100%', '100%', '50%']
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 50,
            height: 50,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />

        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['50%', '50%', '100%', '100%', '50%']
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity
          }}
          sx={{
            width: 60,
            height: 60,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />
      </RootStyle>
    </>
  );
}
