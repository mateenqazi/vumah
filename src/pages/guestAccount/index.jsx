import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Collapse, Tooltip, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverBody } from 'reactstrap';
import CVVExampleImage from '../../assets/img/cvv-example.jpg';
import BankDetails from '../../components/bank-details';

export default function Account() {

  const [showDeactivateAccountModal, setShowDeactivateAccountModal] = useState(false);
  const [showSorryToSeeYouGoModal, setShowSorryToSeeYouGoModal] = useState(false);
  const [showUpdateBusinessDetailsModal, setShowUpdateBusinessDetailsModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showUpdateMobileModal, setShowUpdateMobileModal] = useState(false);

  const [showBusinessInformationSection, setShowBusinessInformationSection] = useState(true);
  const [showApprovalContent, setShowApprovalContent] = useState(false);

  const [driverLicencetooltipOpen, setDriverLicencetooltipOpen] = useState(false);
  const [passportTooltipOpen, setPassportTooltipOpen] = useState(false);

  const [approvalDropdownOpen, setApprovalDropdownOpen] = useState(false);
  const [approvalTooltipOpen, setApprovalTooltipOpen] = useState(false);
  const [file, setFile] = useState("");

  const [imagesData, setImagesData] = useState({
    frontOfLicence: null,
    backOfLicence: null,
    frontOfId: null,
    backOfId: null
  });

  const [selectLicenseType, setSelectLicenseType] = useState('');

  const handleUplooad = (event) => {
    setFile(event.target.files[0]);
  }

  const modalCloseBtn = <button type="button" className="btn close p-0" onClick={closeAllModal}>
    <span aria-hidden="true"><i className="fas fa-times-circle fa-lg"></i></span>
  </button>;

  return (
    <>
      <section className="account-main padd-top-60 padd-bottom-60">
        <div className="container">
          <div className="service-header mb-5">
            <h2>Account</h2>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="account-grid" data-aos="fade-up">
                <div className="account-profile-box mb-4">
                  <div className="circle account-profile">
                    {file && (
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                    )}
                  </div>
                  <div className="p-image account-profile-icon">
                    <label htmlFor="plus-up" className="m-0 pointer"><i className="fas fa-plus"></i></label>
                    <input id="plus-up" onChange={handleUplooad} className="file-upload" type="file" accept="image/*" />
                  </div>
                </div>

                <div className="contact-form-field mb-4 field-label">
                  <label>Email</label>
                  <input type="email" placeholder="Email" />
                </div>

                <div
                  className="d-flex align-items-center account-update-field mb-4 justify-content-between pr-sm-5 mr-sm-5">
                  <h2 className="m-0">Password</h2>
                  <button className="common-btn" onClick={toggleUpdatePasswordModal}>Update</button>
                </div>
                <div
                  className="d-flex align-items-center account-update-field justify-content-between pr-sm-5 mr-sm-5">
                  <h2 className="m-0">Mobile Number</h2>
                  <button className="common-btn" onClick={toggleUpdateMobileModal}>Update</button>
                </div>
              </div>
              <div className="account-grid" data-aos="fade-up">
                <div className="d-flex align-items-center account-update-field mb-4 justify-content-between">
                  <h2 className="m-0">Approval Status</h2>
                  <div className="d-flex align-items-center">
                    <div className="status-number">
                      <p><i className="fas fa-check"></i> Approved</p>
                    </div>
                    <Dropdown isOpen={approvalDropdownOpen} toggle={toggleApprovalDropdown}>
                      <DropdownToggle color="link">
                        <i className="fas fa-ellipsis-v pointer secondary-color" onClick={toggleShowApprovalContent}></i>
                      </DropdownToggle>
                    </Dropdown>
                  </div>
                </div>
                <Collapse isOpen={showApprovalContent}>
                  <div className="bank-details mt-4">
                    <div className="row">
                      <div className="col-md-12">
                        <p className="mb-3">Drivers License <i className="fas fa-info-circle" id="driverLicencetooltip"></i></p>
                        <Tooltip placement="right" isOpen={driverLicencetooltipOpen} target="driverLicencetooltip" toggle={toggleDriverLicencetooltip}>
                          A Full drivers licence is required to rent cars, camper vans and Motor homes.
                        </Tooltip>
                      </div>
                      <div className="col-md-6">
                        <div className="box Licence-upload-grid ">
                          <div className="js--image-preview" style={{ backgroundImage: `url(${imagesData.frontOfLicence})` }}></div>
                          <div className="upload-options">
                            <label className="m-0 w-100 h-100">
                              <i className="fas fa-cloud-upload-alt margin-right-five"></i>
                              Upload front of Licence
                              <input type="file" className="image-upload" name="frontOfLicence" accept="image/*" onChange={onImageUpload} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box Licence-upload-grid ">
                          <div className="js--image-preview" style={{ backgroundImage: `url(${imagesData.backOfLicence})` }}></div>
                          <div className="upload-options">
                            <label className="m-0 w-100 h-100">
                              <i className="fas fa-cloud-upload-alt margin-right-five"></i>
                              Upload Back of Licence
                              <input type="file" className="image-upload" name="backOfLicence" accept="image/*" onChange={onImageUpload} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="company-review mt-4 mb-2 text-center-align">
                      <h2 className="mb-0">OR</h2>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 text-center">
                        <p className="mb-3">Provisional/Passport <i className="fas fa-info-circle" id="passportTooltip"></i></p>
                        <Tooltip placement="right" isOpen={passportTooltipOpen} target="passportTooltip" toggle={togglePassportTooltip}>
                          Either a provisional license or a passport will be required to rent bicycles and any non registered vehicles.
                        </Tooltip>
                      </div>
                      <div className="col-md-6">
                        <div className="box Licence-upload-grid ">
                          <div className="js--image-preview" style={{ backgroundImage: `url(${imagesData.frontOfId})` }}></div>
                          <div className="upload-options">
                            <label className="m-0 w-100 h-100">
                              <i className="fas fa-cloud-upload-alt margin-right-five"></i>
                              Upload front of ID
                              <input type="file" className="image-upload" name="frontOfId" accept="image/*" onChange={onImageUpload} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box Licence-upload-grid ">
                          <div className="js--image-preview" style={{ backgroundImage: `url(${imagesData.backOfId})` }}></div>
                          <div className="upload-options">
                            <label className="m-0 w-100 h-100">
                              <i className="fas fa-cloud-upload-alt margin-right-five"></i>
                              Upload back of ID
                              <input type="file" className="image-upload" name="backOfId" accept="image/*" onChange={onImageUpload} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <span className="margin-right-five text-dark-white">Motorcycles License Types</span>
                        <i className="fas fa-info-circle text-dark-white" id="approvalTooltip"></i>
                        <Tooltip placement="right" isOpen={approvalTooltipOpen} target="approvalTooltip" toggle={toggleApprovalTooltip}>
                          <p className="pt-3 pb-3">
                            If you have a motorcycle license please select which box applies to you:
                            <br /> <hr />
                            A1 (Motorcycles upto 125cc)
                            <br /> <hr />
                            A2 (Riders aged 24+ are qualified for any motorcycle however if under the age of 24 the user will only be qualified for motorcycles up to 46Bhp)
                            <br /> <hr />
                            A (Any Motorcycle)
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="d-flex mt-4">
                      <button className={`${selectLicenseType === 'A1' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`} onClick={(e) => onChangeSelectedLicenseType(e, 'A1')}>A1</button>
                      <button className={`${selectLicenseType === 'A2' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`} onClick={(e) => onChangeSelectedLicenseType(e, 'A2')}>A2</button>
                      <button className={`${selectLicenseType === 'A' ? 'btn-without-radius' : 'common-white-btn-without-radius'} margin-right-ten`} onClick={(e) => onChangeSelectedLicenseType(e, 'A')}>A</button>
                    </div>
                    <div className="contact-form-field checkbox-field mt-4">
                      <button className="common-btn" onClick={toggleUpdateMobileModal}>Submit</button>
                    </div>
                  </div>
                </Collapse>
              </div>
              <BankDetails />
              <div className="account-grid" data-aos="fade-up">
                <div
                  className="d-flex align-items-center account-update-field mb-5 justify-content-between pr-sm-5 mr-sm-5">
                  <h2 className="m-0">Mobile Notifications</h2>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div
                  className="d-flex align-items-center account-update-field mb-4 justify-content-between pr-sm-5 mr-sm-5">
                  <h2 className="m-0">Email Notifications</h2>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="account-grid border-0" data-aos="fade-up">
                <div className="account-update-field">
                  <button className="common-btn" onClick={toggleAccountDeactivateModal}>Deactivate
                    my account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- deactivate account modal --> */}
      <Modal isOpen={showDeactivateAccountModal} toggle={toggleAccountDeactivateModal} className='loginPopupMain add-listing-main'>
        <ModalHeader toggle={toggleAccountDeactivateModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="login-inner">
            <h4 className="text-center mt-4 text-dark-white">Are you sure?</h4>
            <p className="mt-3 text-dark-white">Deactivating will permanently remove your account from the platform. If you wish
              to continue to use the platform after this action you will be required to create a new
              account
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button className="common-btn margin-right-five" onClick={toggleAccountDeactivateAndShowSorryToSeeYouGoModal}>Yes</button>
            <button className="common-btn" onClick={toggleAccountDeactivateModal}>No</button>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- deactivate account modal --> */}

      {/* <!-- deactivate account modal --> */}
      <Modal isOpen={showSorryToSeeYouGoModal} toggle={toggleSorryToSeeYouGoModal} className='loginPopupMain add-listing-main'>
        <ModalHeader toggle={toggleSorryToSeeYouGoModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="login-inner">
            <h5 className="text-center mb-2 text-dark-white">Sorry to see you go!</h5>
          </div>
          {/* <div className="d-flex justify-content-center align-items-center mt-4">
            <button className="common-btn margin-right-five" onClick={toggleSorryToSeeYouGoModal}>OK</button>
          </div> */}
        </ModalBody>
      </Modal>
      {/* <!-- deactivate account modal --> */}

      {/* <!-- update business information modal --> */}
      <Modal isOpen={showUpdateBusinessDetailsModal} toggle={toggleUpdateBusinessModal} className='bank-detail-popup add-licence update-business-dialog'>
        <ModalHeader toggle={toggleUpdateBusinessModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="add-member-header text-center mb-5">
            <h2>
              Add basic information</h2>
          </div>
          <form>
            <div className="account-grid p-0 border-0">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Legal Business Name" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Business Phone Number" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Street Address" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Street Address2" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="City" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Country (Optional)" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Post Code" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Full Address" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Business Number" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Email" />
                  </div>
                </div>
              </div>
              <div className="contact-form-field submit-contact text-center mt-5">
                <input type="Submit" value="Add" onClick={toggleUpdateBusinessModal} />
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {/* <!-- update business information modal --> */}

      {/* <!-- update password modal --> */}
      <Modal isOpen={showUpdatePasswordModal} toggle={toggleUpdatePasswordModal} className='loginPopupMain add-listing-main'>
        <ModalHeader toggle={toggleUpdatePasswordModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="login-inner">
            <form>
              <h2>Update your Password</h2>
              <div className="contact-form-field mb-3">
                <input type="email" placeholder="Old Password" />
              </div>
              <div className="contact-form-field mb-4">
                <input type="password" placeholder="New Password" />
              </div>
              <div className="contact-form-field mb-4">
                <input type="password" placeholder="Confirm Password" />
              </div>
              <div className="contact-form-field submit-contact text-center p-2">
                <input type="Submit" value="Update" onClick={toggleUpdatePasswordModal} />
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- update password modal --> */}

      {/* <!-- update mobile no modal --> */}
      <Modal isOpen={showUpdateMobileModal} toggle={toggleUpdateMobileModal} className='loginPopupMain add-listing-main'>
        <ModalHeader toggle={toggleUpdateMobileModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="login-inner">
            <form>
              <h2>Update your Mobile Number</h2>
              <div className="contact-form-field mb-3">
                <input type="email" placeholder="New Number" />
              </div>
              <div className="contact-form-field submit-contact text-center p-2">
                <input type="Submit" value="Update" onClick={toggleUpdateMobileModal} />
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- update mobile no modal --> */}

    </>
  );

  function toggleAccountDeactivateModal(e) {
    if (e) e.preventDefault();
    setShowDeactivateAccountModal(!showDeactivateAccountModal);
  };

  function toggleAccountDeactivateAndShowSorryToSeeYouGoModal(e) {
    if (e) e.preventDefault();
    setShowDeactivateAccountModal(false);
    setShowSorryToSeeYouGoModal(true);
  };

  function toggleSorryToSeeYouGoModal(e) {
    if (e) e.preventDefault();
    setShowSorryToSeeYouGoModal(!showSorryToSeeYouGoModal);
  };

  function toggleUpdateBusinessModal(e) {
    if (e) e.preventDefault();
    setShowUpdateBusinessDetailsModal(!showUpdateBusinessDetailsModal);
  };

  function toggleUpdatePasswordModal(e) {
    if (e) e.preventDefault();
    setShowUpdatePasswordModal(!showUpdatePasswordModal);
  };

  function toggleUpdateMobileModal(e) {
    if (e) e.preventDefault();
    setShowUpdateMobileModal(!showUpdateMobileModal);
  };

  function closeAllModal() {
    setShowDeactivateAccountModal(false);
    //setShowAddBankDetailsModal(false);
    setShowUpdateBusinessDetailsModal(false);
    setShowUpdatePasswordModal(false);
    setShowUpdateMobileModal(false);
    setShowSorryToSeeYouGoModal(false);
  };

  function toggleBusinessInformationSection() {
    setShowBusinessInformationSection(!showBusinessInformationSection);
  };

  function onImageUpload(e) {
    const { name, files } = e.target;

    setImagesData({
      ...imagesData,
      [name]: URL.createObjectURL(files[0])
    });
  };

  function toggleDriverLicencetooltip() {
    setDriverLicencetooltipOpen(!driverLicencetooltipOpen);
  };

  function togglePassportTooltip() {
    setPassportTooltipOpen(!passportTooltipOpen);
  };

  function toggleApprovalTooltip() {
    setApprovalTooltipOpen(!approvalTooltipOpen);
  }

  function toggleApprovalDropdown() {
    setApprovalDropdownOpen(prevState => !prevState);
  };

  function onChangeSelectedLicenseType(e, name) {
    e.preventDefault();
    setSelectLicenseType(name);
  };

  function toggleShowApprovalContent() {
    setShowApprovalContent(!showApprovalContent);
  }
}
