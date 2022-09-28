import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import './WebDroidDialog.css';
import { useMutation } from '@apollo/client';
import { REGISTER_VEHICLE } from '../graphql/Queries';

const initialState = {
  header: '',
  open: false,
  content: <>Hello</>,
  onOpen: (header, content) => {},
  onClose: () => {},
  onSaveDraft: () => {},
  isVehicleAddForm: false
};

const DroidDialogContext = createContext(initialState);

DroidDialogProvider.propTypes = {
  children: PropTypes.node
};

function DroidDialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(<>Hello</>);
  const [saveDraft, setSaveDraft] = useState(<></>);
  const [header, setHeader] = useState('Hello false');
  const [isVehicleAddForm, setIsVehicleAddForm] = useState(false);

  const handleOpen = (header, content, isVehicleAddForm = false) => {
    setHeader(header);
    setContent(content);
    setOpen(true);
    setIsVehicleAddForm(isVehicleAddForm);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetSaveDraft = (value) => {
    setSaveDraft(value);
  };

  return (
    <DroidDialogContext.Provider
      value={{
        header: header,
        open: open,
        content: content,
        onOpen: handleOpen,
        onClose: handleClose,
        onSaveDraft: handleSetSaveDraft,
        isVehicleAddForm: isVehicleAddForm
      }}
    >
      {children}
      {/* <!-- Droid Dialog --> */}
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          saveDraft={saveDraft}
          sx={{
            fontWeight: '700',
            fontSize: '1.25rem',
            color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[800])
          }}
          isVehicleAddForm={isVehicleAddForm}
        >
          {header}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: { xs: '380px', md: '450px' }, minHeight: '392px' }}>
          {content}
        </DialogContent>
      </BootstrapDialog>
      {/* <!-- Droid Dialog --> */}
    </DroidDialogContext.Provider>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = ({ children, onClose, isVehicleAddForm, saveDraft, ...other }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component={'snap'} sx={{ fontWeight: '600' }}>
          {children}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {isVehicleAddForm && saveDraft}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <Close />
            </IconButton>
          ) : null}
        </Stack>
      </Stack>
    </DialogTitle>
  );
};

export { DroidDialogProvider, DroidDialogContext };
