import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme, ownerState }) => {
  const { status, size } = ownerState;

  return {
    right: -10,
    top: -5,
    position: 'absolute',
    width: 12,
    height: 12,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:before, &:after': {
      content: "''",
      borderRadius: 1,
      backgroundColor: theme.palette.common.white
    },

    ...(size === 'small' && { width: 8, height: 8 }),

    ...(size === 'large' && { width: 16, height: 16 }),

    ...(status === 'offline' && { backgroundColor: 'transparent' }),

    ...(status === 'away' && {
      backgroundColor: theme.palette.warning.main,
      '&:before': {
        width: 2,
        height: 4,
        transform: 'translateX(1px) translateY(-1px)'
      },
      '&:after': {
        width: 2,
        height: 4,
        transform: 'translateY(1px) rotate(125deg)'
      }
    }),

    ...(status === 'busy' && {
      backgroundColor: theme.palette.error.main,
      '&:before': { width: 6, height: 2 }
    }),

    ...(status === 'online' && {
      backgroundColor: theme.palette.success.main
    }),

    ...(status === 'invisible' && {
      backgroundColor: theme.palette.text.disabled,
      '&:before': {
        width: 8,
        height: 8,
        borderRadius: '100px'
      }
    }),

    ...(status === 'unread' && {
      backgroundColor: `${theme.palette.primary.main}70`
    })
  };
});

// ----------------------------------------------------------------------

BadgeStatus.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  status: PropTypes.oneOf(['away', 'busy', 'unread', 'online', 'offline', 'invisible'])
};

export default function BadgeStatus({ size = 'medium', status = 'offline', ...other }) {
  return <RootStyle ownerState={{ status, size }} {...other} />;
}
