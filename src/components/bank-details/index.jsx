/* eslint-disable */
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  Tooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverBody
} from 'reactstrap';
import CVVExampleImage from 'src/assets/img/cvv-example.jpg';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import useDroidDialog from 'src/hooks/useDroidDialog';
import AddPaymentCard from '../../pages/account/Cards/AddPamentCard';
import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTEND } from '../../graphql/Queries';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function BankDetails() {
  const { onOpen } = useDroidDialog();

  const [userActions, setUserActions] = useState({ header: '', content: <></> });
  const [openUserActions, setOpenUserActions] = React.useState(false);

  const handleCloseUserActions = () => {
    setOpenUserActions(false);
  };

  const [showAddBankDetailsModal, setShowAddBankDetailsModal] = useState(false);
  const [bankDetailsList, setBankDetailsList] = useState(false);
  const [openCVVPopover, setOpenCVVPopover] = useState(false);
  const [, forceUpdate] = useState(0);

  const [bankDetails, setBankDetails] = useState([
    {
      checked: true,

      brand: 'visa',
      name: 'John Smith',
      last4: '1234',
      exp: '01/23'
    },
    {
      brand: 'mastercard',
      name: 'John Smith 2',
      last4: '4242',
      exp: '12/24'
    },
    {
      brand: 'amex',
      name: 'John Smith 3',
      last4: '0000',
      exp: '08/30'
    }
  ]);

  function dropDownToggle(index) {
    if (!bankDetails[index]) return;

    bankDetails[index].modal = !bankDetails[index].modal;
    setBankDetails(bankDetails);

    setTimeout(() => {
      forceUpdate((e) => !e);
    }, 50);
  }

  function selectCard(index) {
    if (!bankDetails[index]) return;

    bankDetails.map((a, index) => {
      bankDetails[index].checked = false;
    });

    bankDetails[index].checked = true;
    setBankDetails(bankDetails);

    setTimeout(() => {
      forceUpdate((e) => !e);
    }, 50);
  }

  function deleteCard(index) {
    bankDetails.splice(index, 1);
    if (bankDetails[0]) {
      bankDetails[0].checked = true;
    }
    setBankDetails(bankDetails);

    setTimeout(() => {
      forceUpdate((e) => !e);
    }, 50);
  }

  let selectedDetails = bankDetails.find((item) => item.checked);

  const primaryDetails = !selectedDetails ? null : (
    <div className="my-button" style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
      <img
        src={
          selectedDetails.brand === 'visa'
            ? 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
            : selectedDetails.brand === 'mastercard'
            ? 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'
            : 'https://s1.q4cdn.com/692158879/files/images/brand_imagery/AXP_BlueBoxLogo_Alternate_REGULARscale_RGB_DIGITAL_700x700.png'
        }
        style={{
          width: '40px',
          height: 'auto'
        }}
      />
      <b
        style={{
          textTransform: 'capitalize',
          marginLeft: '10px',
          marginRight: '5px'
        }}
      >
        {selectedDetails.brand}
      </b>
      ending in {selectedDetails.last4}
      <div style={{ width: '100%' }}>Billing address: Same as business address</div>
    </div>
  );

  return (
    <>
      <div>
        <div className="bank-details">
          <div className="d-flex align-items-center account-update-field mb-4 justify-content-between ">
            <h2 className="m-0">Bank Details</h2>
            {bankDetails.length !== 0 &&
              (bankDetailsList ? (
                <button
                  className="btn btn-light my-button"
                  onClick={toggleBankDetailsList}
                  style={{ marginLeft: 'auto', marginRight: '10px' }}
                >
                  Collapse
                  <i className="fas fa-chevron-up" style={{ marginLeft: '5px' }} />
                </button>
              ) : (
                <button
                  className="btn btn-light my-button"
                  onClick={toggleBankDetailsList}
                  style={{ marginLeft: 'auto' }}
                >
                  Change
                  <i className="fas fa-chevron-down" style={{ marginLeft: '5px' }} />
                </button>
              ))}

            {(bankDetailsList || bankDetails.length === 0) && (
              <button
                className="common-btn"
                onClick={() => {
                  onOpen('Add a payment method', <AddPaymentCard />);
                }}
              >
                Add
              </button>
            )}
          </div>
          <div className="custom-table-main">
            {bankDetails.length === 0 && <>No data to show</>}
            {!bankDetailsList && bankDetails.length !== 0 && primaryDetails}
            {bankDetailsList && bankDetails.length !== 0 && (
              <table className="table" cellpedding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th scope="col">Bank</th>
                    <th scope="col">Card Number</th>
                    <th scope="col">Name on Card</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {bankDetails.map((bank, index) => (
                    <tr key={'card-' + index} onClick={() => selectCard(index)}>
                      <th>
                        <input type="radio" name="bank-details" checked={bank.checked} onChange={() => {}} />
                      </th>
                      <td>
                        <img
                          src={
                            bank.brand === 'visa'
                              ? 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
                              : bank.brand === 'mastercard'
                              ? 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'
                              : 'https://s1.q4cdn.com/692158879/files/images/brand_imagery/AXP_BlueBoxLogo_Alternate_REGULARscale_RGB_DIGITAL_700x700.png'
                          }
                          style={{
                            width: '40px',
                            height: 'auto'
                          }}
                        />
                      </td>
                      <td>**** {bank.last4}</td>
                      <td>{bank.name}</td>
                      <td>{bank.exp}</td>
                      <td>
                        <Dropdown
                          isOpen={bank.modal}
                          toggle={(e) => {
                            e.stopPropagation();
                            dropDownToggle(index);
                          }}
                        >
                          <DropdownToggle className="btn btn-light dropdown-toggle bank-details-dropdown-toggle">
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={toggleAddBankDetailsModal}>
                              <i className="fas fa-edit" style={{ minWidth: '25px' }} />
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => deleteCard(index)}>
                              <i className="fas fa-trash" style={{ minWidth: '25px' }} />
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* <!-- add listing modal --> */}
      <BootstrapDialog
        onClose={handleCloseUserActions}
        aria-labelledby="customized-dialog-title"
        open={openUserActions}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUserActions}>
          {userActions.header}
        </BootstrapDialogTitle>
        <DialogContent dividers>{userActions.content}</DialogContent>
      </BootstrapDialog>
    </>
  );

  function toggleAddBankDetailsModal(e) {
    if (e) e.preventDefault();
    setShowAddBankDetailsModal(!showAddBankDetailsModal);
  }

  function toggleBankDetailsList(e) {
    if (e) e.preventDefault();
    setBankDetailsList(!bankDetailsList);
  }

  function toggleCVVPopover() {
    setOpenCVVPopover(!openCVVPopover);
  }
}
