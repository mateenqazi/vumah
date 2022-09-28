import React from 'react';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Face from '../../assets/img/face.jpg';
import FaceOne from '../../assets/img/face1.jpg';
import FaceTwo from '../../assets/img/face2.jpg';
import FaceThree from '../../assets/img/face3.jpg';
import CustomerReviewOne from '../../assets/img/customer-review-img-1.png';
import CustomerReviewTwo from '../../assets/img/customer-review-img-2.png';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import CustomerReview from '../../assets/img/customer-review-img-1.png';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Menu, Dropdown as AntDDropdown } from 'antd';
import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ReviewBg from '../../assets/img/public-review-bg.jpg';
import CompanyReview from '../../assets/img/company-review-img.jpg';
import SecurityImage from '../../assets/img/security.png';

export default function Chat() {
  const [reportModal, setReportModal] = useState(false);
  const [breakDownModal, setBreakDownModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState('');

  const modalCloseBtn = (
    <button type="button" className="btn close p-0" onClick={toggleBreakDownModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg"></i>
      </span>
    </button>
  );
  const modalCloseBtn2 = (
    <button type="button" className="btn close p-0" onClick={toggleReportModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg"></i>
      </span>
    </button>
  );
  const [toggleListingActiveTab, setToggleListingActiveTab] = useState('1');
  const [vehicleType, setVehicleType] = useState('');
  const [pictures, setPictures] = useState([]);
  const [titleText, setTitleText] = useState('Messages');
  const [toggleReportActiveTab, setToggleReportActiveTab] = useState('1');

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => onVehicleTypeChange('Car')}>
        <i className="fas fa-car-side"></i>&nbsp;&nbsp;Car
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => onVehicleTypeChange('Motorbike')}>
        <i className="fas fa-motorcycle"></i>&nbsp;&nbsp;Motorbike
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => onVehicleTypeChange('Bicycle')}>
        <i className="fas fa-bicycle"></i>&nbsp;&nbsp;Bicycle
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => onVehicleTypeChange('Campervan')}>
        <i className="fas fa-rv"></i>&nbsp;&nbsp;Campervan
      </Menu.Item>
    </Menu>
  );

  function toggleReportModal() {
    setReportModal(!reportModal);
  }

  function toggleBreakDownModal() {
    setBreakDownModal(!breakDownModal);
  }

  function toggleAddReportTabs(tab) {
    if (toggleReportActiveTab !== tab) setToggleReportActiveTab(tab);
  }

  function toggleAddListingTabs(tab) {
    if (toggleListingActiveTab !== tab) setToggleListingActiveTab(tab);
  }

  const issues = [
    'Flat Tyre',
    'Clutch',
    'Overheating',
    'Steering issues',
    'Cut-off/engine won’t start',
    'Brake or Handbrake problems',
    'Flat Battery',
    'Wrong Fuel',
    'Lights',
    'Lost Key'
  ];

  return (
    <>
      <Modal isOpen={breakDownModal} toggle={toggleBreakDownModal} className="loginPopupMain add-listing-main">
        <ModalHeader toggle={toggleBreakDownModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div className="signUp-steps">
            <TabContent activeTab={toggleListingActiveTab}>
              <TabPane tabId="1">
                <div className="add-listing-list ad-list-onetab">
                  <h2 className="mb-5 text-center">Report Breakdown</h2>
                  <div className="row">
                    <div className="login-inner">
                      {issues.map((issue) => (
                        <button
                          className={
                            selectedIssue === issue ? 'my-button btn btn-secondary' : 'my-button btn btn-outline-dark'
                          }
                          style={{ margin: '5px', borderRadius: '9999px', padding: '6px 12px' }}
                          onClick={() => setSelectedIssue(issue)}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="contact-form-field submit-contact text-center mt-4">
                    <input
                      type="Submit"
                      value="Continue"
                      className="list-next-btn"
                      onClick={() => toggleAddListingTabs('2')}
                    />
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="2">
                <div className="add-listing-list">
                  <h2 className="mb-3 text-center">Add Images</h2>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="contact-form-field mb-3">
                        <textarea
                          placeholder="Additional details"
                          style={{ borderColor: 'var(--secondary-color)' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <RUG action="http://example.com/upload" initialState={[]} />

                  <div className="contact-form-field submit-contact text-center mt-4">
                    <input
                      type="Submit"
                      value="Submit"
                      className="list-next-btn"
                      onClick={() => toggleAddListingTabs('3')}
                    />
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="3">
                <div className="add-listing-list">
                  <h2 className="mb-3 text-center">Your request has been submited.</h2>
                </div>
              </TabPane>
            </TabContent>
            {toggleListingActiveTab !== '3' && (
              <Nav tabs className="d-flex justify-content-center border-none mt-4">
                <NavItem>
                  <NavLink
                    className={classnames({ active: toggleListingActiveTab === '1' }) + ' pointer'}
                    onClick={() => toggleAddListingTabs('1')}
                  />
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: toggleListingActiveTab === '2' }) + ' pointer'}
                    onClick={() => toggleAddListingTabs('2')}
                  />
                </NavItem>
              </Nav>
            )}
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={reportModal} toggle={toggleReportModal} className="loginPopupMain add-listing-main">
        <ModalHeader toggle={toggleReportModal} close={modalCloseBtn2}></ModalHeader>
        <ModalBody>
          <div className="signUp-steps">
            <TabContent activeTab={toggleReportActiveTab}>
              <TabPane tabId="1">
                <div className="add-listing-list ad-list-onetab">
                  <h2 className="mb-5 text-center">Let us know what happened</h2>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="contact-form-field mb-3">
                        <div className="select-outer">
                          <select style={{ borderColor: 'var(--secondary-color)' }}>
                            <option disabled selected>
                              Reason
                            </option>
                            <option>Host is attempting to collect fees outside Vumah</option>
                            <option>I think they’re scamming me</option>
                            <option>No response from the host</option>
                            <option>Technical issue</option>
                            <option>Vehicle was not as described</option>
                            <option>Inappropriate behaviour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="contact-form-field mb-3">
                        <textarea
                          placeholder="Descrtiption"
                          style={{ borderColor: 'var(--secondary-color)' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="contact-form-field submit-contact text-center mt-4">
                    <input
                      type="Submit"
                      value="Continue"
                      className="list-next-btn"
                      onClick={() => toggleAddReportTabs('2')}
                    />
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="2">
                <div className="add-listing-list">
                  <h2 className="mb-3 text-center">Let us know what happened</h2>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="contact-form-field mb-3" style={{ textAlign: 'justify' }}>
                        Your concern will be sent privately to the Vumah team. After clicking ‘Submit’ We will review
                        this report and carry out the necessary action, thank you for reaching out to us.
                      </div>
                    </div>
                  </div>

                  <div className="contact-form-field submit-contact text-center mt-4">
                    <input
                      type="Submit"
                      value="Submit"
                      className="list-next-btn"
                      onClick={() => toggleAddReportTabs('3')}
                    />
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="3">
                <div className="add-listing-list">
                  <h2 className="mb-3 text-center">Your report has been sent.</h2>
                </div>
              </TabPane>
            </TabContent>
            {toggleReportActiveTab !== '3' && (
              <Nav tabs className="d-flex justify-content-center border-none mt-4">
                <NavItem>
                  <NavLink
                    className={classnames({ active: toggleReportActiveTab === '1' }) + ' pointer'}
                    onClick={() => toggleAddReportTabs('1')}
                  />
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: toggleReportActiveTab === '2' }) + ' pointer'}
                    onClick={() => toggleAddReportTabs('2')}
                  />
                </NavItem>
              </Nav>
            )}
          </div>
        </ModalBody>
      </Modal>

      <div
        className="padd-top-60"
        style={
          location.pathname === '/chat' || location.pathname === '/messages' || location.pathname === '/bookings'
            ? { transform: 'scale(0.9)', transformOrigin: '0 0', width: '110%', marginBottom: '-50px' }
            : {}
        }
      >
        <div className="container" style={{ maxWidth: '2000px' }}>
          <div className="d-lg-flex">
            <div className="Chat-list-main mb-4">
              <div
                className="chat-header d-flex justify-content-between align-items-center pb-4"
                style={{ display: 'none' }}
              >
                <h2>{titleText}</h2>
                <div className="contact-form-field">
                  <div className="select-outer">
                    <select
                      onInput={(event) => {
                        setTitleText(event.target.value);
                      }}
                      style={{ paddingRight: '35px' }}
                    >
                      <option value="Messages">All</option>
                      <option value="Read">Read</option>
                      <option value="Unread">Unread</option>
                      <option value="Starred">Starred</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="friend-chat-list">
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={Face} alt="Freind-Photo" />
                      </div>
                      <div className="notseenMessage">2</div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Robo Cop</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">2</span>
                  </div>
                </div>
                <div
                  className="friend-list d-flex justify-content-between mb-4"
                  style={{
                    background: 'lightgray'
                  }}
                >
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceOne} alt="Freind-Photo" />
                      </div>
                      <div className="notseenMessage">5</div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Moch Ramdhani Cop</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">4</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceTwo} alt="Freind-Photo" />
                      </div>
                      <div className="notseenMessage">12</div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Abu Abdullah Nugraha</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceOne} alt="Freind-Photo" />
                      </div>
                      <div className="notseenMessage">5</div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Moch Ramdhani Cop</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceTwo} alt="Freind-Photo" />
                      </div>
                      <div className="notseenMessage">12</div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Abu Abdullah Nugraha</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceThree} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Muhammad Fauzi</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">5</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={FaceOne} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Nurman Tri Gumelar</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">5</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={CustomerReviewOne} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Bhagas Rhafi</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">5</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={CustomerReviewOne} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Bhagas Rhafi</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                    <span className="chat-active-circle mb-2 d-inline-block">1</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={CustomerReviewOne} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Bhagas Rhafi</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                  </div>
                </div>
                <div className="friend-list d-flex justify-content-between mb-4">
                  <div className="friend-list-inner d-flex ">
                    <div className="chat-profile">
                      <div className="chat-profile-inner">
                        <img src={CustomerReviewTwo} alt="Freind-Photo" />
                      </div>
                    </div>
                    <div className="friend-text margin-left-ten">
                      <h6>Saepul Rohman</h6>
                      <p>Hey, You're arrested</p>
                    </div>
                  </div>
                  <div className="chat-time text-right-align">
                    <span className="time">13:55</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="show-chat-content mb-4">
              <div className="show-chat-header d-flex justify-content-between">
                <h2>Robo Cop</h2>
              </div>
              <div className="chat-group-detail">
                <div className="row">
                  <div className="col-12 mb-3">
                    <center className="my-button" style={{ width: '100%', fontSize: '12px' }}>
                      Today
                    </center>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <div className=" chat-box left_pnnel d-flex">
                      <img src={Face} className="profile-image" />
                      <div
                        className="chat-bubble chat-bubble--left p-0 my-button"
                        style={{ borderRadius: '10px', border: '1px solid grey' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', padding: '10px' }}>
                          <div className="image-with-camera">
                            <img src={Mercedes} style={{ width: '120px', height: 'auto', borderRadius: '10px' }} />
                            <i className="fas fa-camera" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                            <h5 className="my-button" style={{ fontWeight: '600' }}>
                              Mercedes Benz 2018
                            </h5>
                            <p style={{ color: '#f67810', fontWeight: '500' }}>HL8 HXM</p>
                            <Link
                              style={{
                                fontSize: '12px',
                                color: 'var(--color-primary)',
                                fontWeight: '500',
                                textDecoration: 'underline',
                                marginTop: '15px'
                              }}
                              to="/car-listing"
                            >
                              View Vehicle
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" chat-box left_pnnel d-flex mt-2">
                      <img src={Face} className="profile-image" style={{ opacity: 0 }} />
                      <div
                        className="chat-bubble chat-bubble--left my-button"
                        style={{ borderTopLeftRadius: '10px', border: '1px solid grey' }}
                      >
                        Hey, I am interested in this car, I would need it for 3 days.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <center className="my-button" style={{ width: '100%', fontSize: '12px' }}>
                      The host accepted your message request.
                    </center>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="chat-box right_pnnel d-flex">
                      <img src={FaceOne} className="profile-image" />
                      <div className="chat-bubble chat-bubble_right" style={{ marginLeft: '10px' }}>
                        Hello, thank you for contacting us. The car is available, what is the check-in date?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="message-box-footer mt-5">
                <form>
                  <div className="row align-items-center d-flex">
                    <div className="col-md-10 type-message-box">
                      <input type="text" className="form-control" placeholder="Type message here...." />
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                      <span className="attachment-file-icon">
                        <i className="fas fa-paperclip"></i>
                      </span>
                      <span className="message-send-icon">
                        <i className="fas fa-paper-plane"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="booking-details-main" id="car-chat-page">
              <form>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    padding: '0 0 10px 0',
                    flexDirection: 'column'
                  }}
                  className="add-member-header mb-2 mt-4"
                >
                  <img
                    src={CompanyReview}
                    alt="company-review-img"
                    className="profile-car"
                    style={{ borderRadius: '9999px', width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <h2 style={{ fontWeight: '600' }} className="mt-3 mb-2">
                    Company Name
                  </h2>
                  <p className="my-button" className="my-button">
                    <img
                      src={SecurityImage}
                      alt="Security Image"
                      className="margin-right-ten"
                      style={{ width: '20px' }}
                    />
                    Level 4 host |
                    <button
                      onClick={toggleReportModal}
                      style={{
                        fontSize: 'inherit',
                        color: 'var(--color-primary)',
                        fontWeight: '500',
                        textDecoration: 'underline',
                        marginLeft: '5px',
                        border: 'none',
                        background: 'inherit'
                      }}
                      type="button"
                    >
                      Report
                    </button>
                  </p>
                </div>

                <hr />

                <p className="my-button" style={{ padding: '0 0 10px 0' }}>
                  <div className="company-review d-flex justify-content-center justify-content-md-start align-items-center">
                    <ul className="d-flex p-0" style={{ marginRight: '10px' }}>
                      <li className="active">
                        <i className="fas fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fas fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                    </ul>
                    <h2>40 Reviews</h2>
                  </div>
                </p>
                <p className="my-button" style={{ padding: '0 0 10px 0' }}>
                  <i className="fas fa-check-circle margin-right-five" style={{ color: 'var(--green)' }}></i> Avg
                  response time 25hrs
                </p>
                <p className="my-button" className="my-button" style={{ padding: '0 0 30px 0' }}>
                  <i className="fas fa-clock margin-right-five" style={{ color: 'var(--secondary-color)' }}></i> 99%
                  response rate
                </p>

                <div className="add-member-header mb-3 mt-1">
                  <h2 style={{ fontWeight: '600' }}>Other vehicles</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', padding: '0 0 10px 0' }}>
                  <div className="image-with-camera">
                    <img src={Mercedes} style={{ width: '120px', borderRadius: '10px' }} />
                    <i className="fas fa-camera" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <h5 className="my-button" style={{ fontWeight: '600' }}>
                      Mercedes Benz 2018
                    </h5>
                    <p style={{ color: '#f67810', marginBottom: '10px', fontWeight: '500' }}>HL8 HXM</p>
                    <Link
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-primary)',
                        fontWeight: '500',
                        textDecoration: 'underline',
                        marginTop: '8px'
                      }}
                      to="/car-listing"
                    >
                      View Vehicle
                    </Link>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', padding: '0 0 10px 0' }}>
                  <div className="image-with-camera">
                    <img src={Mercedes} style={{ width: '120px', borderRadius: '10px' }} />
                    <i className="fas fa-camera" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <h5 className="my-button" style={{ fontWeight: '600' }}>
                      Mercedes Benz 2018
                    </h5>
                    <p style={{ color: '#f67810', marginBottom: '10px', fontWeight: '500' }}>HL8 HXM</p>
                    <Link
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-primary)',
                        fontWeight: '500',
                        textDecoration: 'underline',
                        marginTop: '8px'
                      }}
                      to="/car-listing"
                    >
                      View Vehicle
                    </Link>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', padding: '0 0 30px 0' }}>
                  <div className="image-with-camera">
                    <img src={Mercedes} style={{ width: '120px', borderRadius: '10px' }} />
                    <i className="fas fa-camera" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <h5 className="my-button" style={{ fontWeight: '600' }}>
                      Mercedes Benz 2018
                    </h5>
                    <p style={{ color: '#f67810', marginBottom: '10px', fontWeight: '500' }}>HL8 HXM</p>
                    <Link
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-primary)',
                        fontWeight: '500',
                        textDecoration: 'underline',
                        marginTop: '8px'
                      }}
                      to="/car-listing"
                    >
                      View Vehicle
                    </Link>
                  </div>
                </div>

                <div className="mt-auto text-center mt-4">
                  <a href="/public-review" target="_blank" className="common-btn btn" type="button">
                    View Profile
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
