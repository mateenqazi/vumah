import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Collapse } from 'reactstrap';
import UpdateUserInfo from './UpdateUserInfo';
import UpdatePhoneNumberModal from './UpdatePhoneNumberModal';
import useDroidDialog from '../../hooks/useDroidDialog';

function AccountInformation(props) {

  const { user } = useAuth();
  const { onOpen } = useDroidDialog();

  const [showBusinessInformationSection, setShowBusinessInformationSection] = useState(false);

  function toggleBusinessInformationSection() {
    setShowBusinessInformationSection(!showBusinessInformationSection);
  }

  return (
    <>
      <div className='account-grid' data-aos='fade-up'>
        <div className='bank-details'>
          <div className='d-flex align-items-center account-update-field mb-4 justify-content-between'>
            <h2 className='m-0'>
              {user.isBusiness ? 'Business Information' : 'User Information'}
            </h2>
            <span className='pointer' onClick={toggleBusinessInformationSection}>
                      <i className='fas fa-sort-down' />
                    </span>
          </div>
          <Collapse isOpen={showBusinessInformationSection}>
            <div className='collapsed' id='collapseExample'>
              {user.isBusiness &&
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Legal Business Name <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.businessName}</p>
                </div>
              </div>
              }
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Phone Number <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.phoneNumber}</p>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Street Address <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.address}</p>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Street Address2 <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.address2}</p>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>City <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.city}</p>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Country (Optional) <span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.country}</p>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Post Code<span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.postalCode}</p>
                </div>
              </div>
              {user.isBusiness &&
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Full Legal Name<span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.userName}</p>
                </div>
              </div>
              }
              {user.isBusiness &&
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Full Address<span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.address}</p>
                </div>
              </div>
              }
              {user.isBusiness &&
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Business Number<span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.businessNumber}</p>
                </div>
              </div>
              }
              <div className='row mb-2'>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>Email<span className='float-sm-right'>:</span></p>
                </div>
                <div className='col-sm-1 col-md-1 col-lg-1'>
                  <p>-</p>
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5'>
                  <p>{user.email}</p>
                </div>
              </div>
              <button className='common-btn mt-4' onClick={() => onOpen('Update Account Information', <UpdateUserInfo />)}>
                Update
              </button>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default AccountInformation;