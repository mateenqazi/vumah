import React, { useState } from 'react';
import BankDetails from '../../components/bank-details';
import LoadingScreen from '../../components/LoadingScreen';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch } from '@mui/material';
import UpdatePasswordModal from './UpdatePasswordModal';
import UpdatePhoneNumberModal from './UpdatePhoneNumberModal';
import useAuth from '../../hooks/useAuth';
import useDroidDialog from '../../hooks/useDroidDialog';
import ApprovalStatus from './ApprovalStatus';
import AccountInformation from './AccountInformation';
import StaffMembersListing from './StaffMembersListing';
import PaymentMethodsListing from './Cards/PaymentMethodsListing';

export default function Account() {
  const { user } = useAuth();
  const { onOpen } = useDroidDialog();

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [isMobileNotifications, setIsMobileNotifications] = React.useState(user.mobileNotifications);
  const [isEmailNotifications, setIsEmailNotifications] = React.useState(user.emailNotifications);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeIsMobileNotifications = (event) => {
    setIsMobileNotifications(event.target.checked);
  };

  const handleChangeIsEmailNotifications = (event) => {
    setIsEmailNotifications(event.target.checked);
  };

  const [file, setFile] = useState('');

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      {user ? (
        <>
          <section className="account-main padd-top-60 padd-bottom-60">
            <div className="container">
              <div className="service-header  mb-5">
                <h2>Account</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="account-grid" data-aos="fade-up">
                    <div className="account-profile-box mb-4">
                      <div className="circle account-profile">
                        {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
                      </div>
                      <div className="p-image account-profile-icon">
                        <label htmlFor="plus-up" className="m-0 pointer">
                          <i className="fas fa-plus" />
                        </label>
                        <input
                          id="plus-up"
                          onChange={handleUpload}
                          className="file-upload"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="contact-form-field mb-4 field-label">
                      <label>Email</label>
                      <input type="email" placeholder="Email" style={{ disabled: 'true' }} value={user.email} />
                    </div>

                    <div className="d-flex align-items-center account-update-field mb-4 justify-content-between pr-sm-5 mr-sm-5">
                      <h2 className="m-0">Password</h2>
                      <button
                        className="common-btn"
                        onClick={() =>
                          onOpen(
                            'Update Password',
                            <>
                              <UpdatePasswordModal />
                            </>
                          )
                        }
                      >
                        Update
                      </button>
                    </div>
                    <div className="d-flex align-items-center account-update-field justify-content-between pr-sm-5 mr-sm-5">
                      <h2 className="m-0">Mobile Number</h2>
                      <button
                        className="common-btn"
                        onClick={() => onOpen('Update Phone Number', <UpdatePhoneNumberModal />)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <ApprovalStatus />
                  <PaymentMethodsListing />
                  <AccountInformation />
                  <div className="account-grid" data-aos="fade-up">
                    <div className="d-flex align-items-center account-update-field mb-5 justify-content-between pr-sm-5 mr-sm-5">
                      <h2 className="m-0">Mobile Notifications</h2>
                      <Switch checked={isMobileNotifications} onChange={handleChangeIsMobileNotifications} />
                    </div>
                    <div className="d-flex align-items-center account-update-field mb-4 justify-content-between pr-sm-5 mr-sm-5">
                      <h2 className="m-0">Email Notifications</h2>
                      <Switch checked={isEmailNotifications} onChange={handleChangeIsEmailNotifications} />
                    </div>
                  </div>
                  {/*<div className="account-grid border-0" data-aos="fade-up">*/}
                  {/*  <div className="account-update-field">*/}
                  {/*    <button className="common-btn" onClick={handleClickOpen}>*/}
                  {/*      Deactivate my account*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="col-md-1" />
                {user.isBusiness && <StaffMembersListing />}
                {/*<StaffTable />*/}
              </div>
            </div>
          </section>

          {/* <!-- deactivate account modal --> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{active ? 'Are you sure?' : 'Sorry to see you go!'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {active
                  ? 'If you wish to continue to use the platform after this action you will be required to create a new account'
                  : '>-<'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {active && (
                <Button
                  onClick={() => {
                    setActive(false);
                  }}
                  autoFocus
                >
                  Deactivate
                </Button>
              )}
            </DialogActions>
          </Dialog>
          {/* <!-- deactivate account modal --> */}
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
