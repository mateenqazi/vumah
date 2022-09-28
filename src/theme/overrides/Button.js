// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[800],
          // color: theme.palette.grey[200],
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        // contained
        contained: {
          color: theme.palette.grey[100],
          border: `1px solid ${theme.palette.primary.main}`,
          // color: theme.palette.grey[800],
          '&:disabled': {
            border: 'none'
          },
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            color: theme.palette.primary.main
            // boxShadow: theme.customShadows.z8
          }
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[100],
          // color: theme.palette.grey[800],
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.z8
          }
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.primary
          }
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.secondary
          }
        },
        containedInfo: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.info
          }
        },
        containedSuccess: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.success
          }
        },
        containedWarning: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.warning
          }
        },
        containedError: {
          '&:hover': {
            boxShadow: 'none'
            // boxShadow: theme.customShadows.error
          }
        },
        // outlined
        outlinedInherit: {
          '&:hover': {
            border: `1px solid ${theme.palette.grey[500_32]}`,
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
