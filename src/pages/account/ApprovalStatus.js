import React, { useState } from 'react';
import { Collapse, Dropdown, DropdownToggle, Tooltip } from 'reactstrap';
import useAuth from '../../hooks/useAuth';

function ApprovalStatus(props) {

  const { user } = useAuth();

  const [showUpdateMobileModal, setShowUpdateMobileModal] = useState(false);

  const [showApprovalContent, setShowApprovalContent] = useState(false);

  const [driverLicencetooltipOpen, setDriverLicencetooltipOpen] = useState(false);
  const [passportTooltipOpen, setPassportTooltipOpen] = useState(false);

  const [approvalDropdownOpen, setApprovalDropdownOpen] = useState(false);
  const [approvalTooltipOpen, setApprovalTooltipOpen] = useState(false);

  const [imagesData, setImagesData] = useState({
    frontOfLicence: null,
    backOfLicence: null,
    frontOfId: null,
    backOfId: null
  });

  const [selectLicenseType, setSelectLicenseType] = useState('');

  function toggleUpdateMobileModal(e) {
    if (e) e.preventDefault();
    setShowUpdateMobileModal(!showUpdateMobileModal);
  }

  function onImageUpload(e) {
    const { name, files } = e.target;

    setImagesData({
      ...imagesData,
      [name]: URL.createObjectURL(files[0])
    });
  }

  function toggleDriverLicencetooltip() {
    setDriverLicencetooltipOpen(!driverLicencetooltipOpen);
  }

  function togglePassportTooltip() {
    setPassportTooltipOpen(!passportTooltipOpen);
  }

  function toggleApprovalTooltip() {
    setApprovalTooltipOpen(!approvalTooltipOpen);
  }

  function toggleApprovalDropdown() {
    setApprovalDropdownOpen(prevState => !prevState);
  }

  function onChangeSelectedLicenseType(e, name) {
    e.preventDefault();
    setSelectLicenseType(name);
  }

  function toggleShowApprovalContent() {
    setShowApprovalContent(!showApprovalContent);
  }

  return (
    <>
      <div className='account-grid' data-aos='fade-up'>
        <div className='d-flex align-items-center account-update-field mb-4 justify-content-between'>
          <h2 className='m-0'>Approval Status</h2>
          <div className='d-flex align-items-center'>
            <div className='status-number'>
              {!user.isBusiness && <>
                {user.isverified ?
                  <p className='ml-3 mr-2'><i className='fas fa-check margin-right-five' />Approved</p>
                  :
                  <p className='ml-3 mr-2' style={{ whiteSpace: 'nowrap' }}><i
                    className='fas fa-minus margin-right-five' />Not Approved</p>
                }
              </>}
            </div>
            <Dropdown isOpen={approvalDropdownOpen} toggle={toggleApprovalDropdown}>
              <DropdownToggle color='link'>
                <i className='fas fa-ellipsis-v pointer secondary-color' onClick={toggleShowApprovalContent} />
              </DropdownToggle>
            </Dropdown>
          </div>
        </div>
        {user.isBusiness &&
        <div className='status-number'>
          <div className='d-flex align-items-center'>
            <div className='contact-form-field mb-4 field-label'>
              <label>Company House Number</label>
              <input type='text' placeholder='Company Number' value={user.businessNumber} />
            </div>
            {user.isverified ?
              <p className='ml-3 mr-2'><i className='fas fa-check margin-right-five' />Approved</p>
              :
              <p className='ml-3 mr-2' style={{ whiteSpace: 'nowrap' }}><i
                className='fas fa-minus margin-right-five' />Not Approved</p>
            }
          </div>
        </div>
        }
        <Collapse isOpen={showApprovalContent}>
          {user.isBusiness ?
            <div className='bank-details mt-4'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='contact-form-field mb-2'>
                    <label className='text-dark-white'>Licence Details</label>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='box Licence-upload-grid '>
                        <div className='js--image-preview'
                             style={{ backgroundImage: `url(${imagesData.frontOfLicence})` }} />
                        <div className='upload-options'>
                          <label className='m-0 w-100 h-100'>
                            <i className='fas fa-cloud-upload-alt margin-right-five' />
                            Upload front of Licence
                            <input type='file' className='image-upload' name='frontOfLicence' accept='image/*'
                                   onChange={onImageUpload} />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='box Licence-upload-grid '>
                        <div className='js--image-preview'
                             style={{ backgroundImage: `url(${imagesData.backOfLicence})` }} />
                        <div className='upload-options'>
                          <label className='m-0 w-100 h-100'>
                            <i className='fas fa-cloud-upload-alt margin-right-five' />
                            Upload Back of Licence
                            <input type='file' className='image-upload' name='backOfLicence' accept='image/*'
                                   onChange={onImageUpload} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='bank-details mt-4'>
              <div className='row'>
                <div className='col-md-12'>
                  <p className='mb-3'>Drivers License <i className='fas fa-info-circle' id='driverLicencetooltip' /></p>
                  <Tooltip placement='right' isOpen={driverLicencetooltipOpen} target='driverLicencetooltip'
                           toggle={toggleDriverLicencetooltip}>
                    A Full drivers licence is required to rent cars, camper vans and Motor homes.
                  </Tooltip>
                </div>
                <div className='col-md-6'>
                  <div className='box Licence-upload-grid '>
                    <div className='js--image-preview'
                         style={{ backgroundImage: `url(${imagesData.frontOfLicence})` }} />
                    <div className='upload-options'>
                      <label className='m-0 w-100 h-100'>
                        <i className='fas fa-cloud-upload-alt margin-right-five' />
                        Upload front of Licence
                        <input type='file' className='image-upload' name='frontOfLicence' accept='image/*'
                               onChange={onImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='box Licence-upload-grid '>
                    <div className='js--image-preview'
                         style={{ backgroundImage: `url(${imagesData.backOfLicence})` }} />
                    <div className='upload-options'>
                      <label className='m-0 w-100 h-100'>
                        <i className='fas fa-cloud-upload-alt margin-right-five' />
                        Upload Back of Licence
                        <input type='file' className='image-upload' name='backOfLicence' accept='image/*'
                               onChange={onImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='company-review mt-4 mb-2 text-center-align'>
                <h2 className='mb-0'>OR</h2>
              </div>
              <div className='row mt-2'>
                <div className='col-md-12 text-center'>
                  <p className='mb-3'>Provisional/Passport <i className='fas fa-info-circle' id='passportTooltip' /></p>
                  <Tooltip placement='right' isOpen={passportTooltipOpen} target='passportTooltip'
                           toggle={togglePassportTooltip}>
                    Either a provisional license or a passport will be required to rent bicycles and any non registered
                    vehicles.
                  </Tooltip>
                </div>
                <div className='col-md-6'>
                  <div className='box Licence-upload-grid '>
                    <div className='js--image-preview' style={{ backgroundImage: `url(${imagesData.frontOfId})` }} />
                    <div className='upload-options'>
                      <label className='m-0 w-100 h-100'>
                        <i className='fas fa-cloud-upload-alt margin-right-five' />
                        Upload front of ID
                        <input type='file' className='image-upload' name='frontOfId' accept='image/*'
                               onChange={onImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='box Licence-upload-grid '>
                    <div className='js--image-preview' style={{ backgroundImage: `url(${imagesData.backOfId})` }} />
                    <div className='upload-options'>
                      <label className='m-0 w-100 h-100'>
                        <i className='fas fa-cloud-upload-alt margin-right-five' />
                        Upload back of ID
                        <input type='file' className='image-upload' name='backOfId' accept='image/*'
                               onChange={onImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-12'>
                  <span className='margin-right-five text-dark-white'>Motorcycles License Types</span>
                  <i className='fas fa-info-circle text-dark-white' id='approvalTooltip' />
                  <Tooltip placement='right' isOpen={approvalTooltipOpen} target='approvalTooltip'
                           toggle={toggleApprovalTooltip}>
                    <p className='pt-3 pb-3'>
                      If you have a motorcycle license please select which box applies to you:
                      <br />
                      <hr />
                      A1 (Motorcycles upto 125cc)
                      <br />
                      <hr />
                      A2 (Riders aged 24+ are qualified for any motorcycle however if under the age of 24 the user will
                      only be qualified for motorcycles up to 46Bhp)
                      <br />
                      <hr />
                      A (Any Motorcycle)
                    </p>
                  </Tooltip>
                </div>
              </div>
              <div className='d-flex mt-4'>
                <button
                  className={`${selectLicenseType === 'A1' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`}
                  onClick={(e) => onChangeSelectedLicenseType(e, 'A1')}>A1
                </button>
                <button
                  className={`${selectLicenseType === 'A2' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`}
                  onClick={(e) => onChangeSelectedLicenseType(e, 'A2')}>A2
                </button>
                <button
                  className={`${selectLicenseType === 'A' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`}
                  onClick={(e) => onChangeSelectedLicenseType(e, 'A')}>A
                </button>
              </div>
              <div className='contact-form-field checkbox-field mt-4'>
                <button className='common-btn' onClick={toggleUpdateMobileModal}>Submit</button>
              </div>
            </div>
          }
        </Collapse>
      </div>
    </>
  );
}

export default ApprovalStatus;