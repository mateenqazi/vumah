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
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';
import classnames from 'classnames';

export default function Chat() {
  const [reportModal, setReportModal] = useState(false);
  const [breakDownModal, setBreakDownModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState('');

  const modalCloseBtn = (
    <button type="button" className="btn close p-0" onClick={toggleBreakDownModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg" />
      </span>
    </button>
  );
  const modalCloseBtn2 = (
    <button type="button" className="btn close p-0" onClick={toggleReportModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg" />
      </span>
    </button>
  );
  const [toggleListingActiveTab, setToggleListingActiveTab] = useState('1');
  const [titleText, setTitleText] = useState('Bookings');
  const [toggleReportActiveTab, setToggleReportActiveTab] = useState('1');

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
        <ModalHeader toggle={toggleBreakDownModal} close={modalCloseBtn} />
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
                            <option>Guest is attempting to pay outside Vumah</option>
                            <option>Different person showed up to collect the vehicle</option>
                            <option>No response from the guest</option>
                            <option>Technical issue</option>
                            <option>Inappropriate behaviour</option>
                            <option>Other (please explain in the description)</option>
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
                      <option value="Bookings">All</option>
                      <option value="Requests">Requests</option>
                      <option value="Current">Current</option>
                      <option value="Past">Past</option>
                      <option value="Rejected">Rejected</option>
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
                        <h6
                          style={{
                            borderBottom: '1px solid grey',
                            minWidth: '400px',
                            padding: '10px 20px'
                          }}
                          className="my-button"
                        >
                          Mercedes Benz 2018
                        </h6>
                        <p
                          style={{
                            minWidth: '300px',
                            paddingBottom: '0',
                            padding: '5px 20px'
                          }}
                        >
                          Check-in:
                          <span
                            style={{
                              color: '#F67810',
                              marginLeft: '10px',
                              letterSpacing: '-0.5px'
                            }}
                          >
                            10 April 2021 - 06:30AM
                          </span>
                        </p>
                        <p
                          style={{
                            borderBottom: '1px solid grey',
                            minWidth: '300px',
                            padding: '5px 20px'
                          }}
                        >
                          Return Date:
                          <span
                            style={{
                              color: '#F67810',
                              marginLeft: '10px',
                              letterSpacing: '-0.5px'
                            }}
                          >
                            14 April 2021 - 07:00PM
                          </span>
                        </p>
                        <div
                          style={{
                            marginLeft: 'auto',
                            display: 'flex',
                            textAlign: 'right',
                            width: '100%',
                            padding: '5px 10px'
                          }}
                        >
                          <button
                            className="btn btn-light my-button"
                            style={{ textDecoration: 'underline', paddingLeft: 0, marginLeft: 'auto' }}
                          >
                            Decline
                          </button>
                          <button className="btn common-btn my-button" style={{ padding: '6px 20px' }}>
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <center className="my-button" style={{ width: '100%', fontSize: '12px' }}>
                      The host accepted your booking request.
                    </center>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="chat-box right_pnnel d-flex">
                      <img src={FaceOne} className="profile-image" />
                      <div className="chat-bubble chat-bubble_right" style={{ marginLeft: '10px' }}>
                        Hello, thank you for booking from us.
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
              <div className="add-member-header mb-3">
                <h2 style={{ fontWeight: '600' }}>Booking Details</h2>
              </div>
              <form>
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
                    <p className="my-button" style={{ display: 'flex', alignItems: 'center' }}>
                      Booked by
                      <img
                        src={Face}
                        alt="rated-person"
                        style={{ width: '30px', marginLeft: '10px', marginRight: '5px', borderRadius: '9999px' }}
                      />
                      Thomas H.
                    </p>
                    <button
                      className="btn btn-light my-button"
                      style={{
                        textDecoration: 'underline',
                        marginLeft: 'auto',
                        marginRight: 0,
                        paddingRight: 0,
                        fontSize: '14px'
                      }}
                      type="button"
                      onClick={toggleReportModal}
                    >
                      Report guest
                    </button>
                  </div>
                </div>
                <hr />
                <p className="my-button" style={{ padding: '0 0 10px 0' }}>
                  Checked in: <span style={{ color: '#f67810', fontWeight: '500' }}>10 April 2021 - 06:30AM</span>
                </p>
                <p className="my-button" style={{ padding: '0 0 10px 0' }}>
                  Return Date: <span style={{ color: '#f67810', fontWeight: '500' }}>14 April 2021 - 07:00PM</span>
                </p>
                <p className="my-button" className="my-button" style={{ padding: '0 0 30px 0' }}>
                  Booked for: <span style={{ color: '#f67810', fontWeight: '500' }}>5 days</span>
                </p>

                <div className="add-member-header mb-3 mt-5">
                  <h2 style={{ fontWeight: '600' }}>Payment Details</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', width: '200px' }}>
                  <p className="my-button" style={{ padding: '0 30px 0 0' }}>
                    Amount:{' '}
                    <span style={{ color: '#f67810', fontWeight: '500', width: '70px', display: 'inline-block' }}>
                      £25.99
                    </span>
                  </p>
                  <p className="my-button" style={{ padding: '0 30px 0 0' }}>
                    Fees:{' '}
                    <span style={{ color: '#f67810', fontWeight: '500', width: '70px', display: 'inline-block' }}>
                      -£7
                    </span>
                  </p>
                  <hr style={{ width: '200px', marginTop: '5px', marginBottom: '5px' }} />
                  <p className="my-button" style={{ padding: '5px 30px 15px 0', fontWeight: '600' }}>
                    Total:{' '}
                    <span style={{ color: '#f67810', fontWeight: '600', width: '70px', display: 'inline-block' }}>
                      £18.99
                    </span>
                  </p>
                </div>

                <div className="mt-auto text-center">
                  <button className="common-btn" type="button">
                    Request Extra-Time
                  </button>
                  <button
                    className="btn btn-light my-button"
                    style={{ textDecoration: 'underline', marginLeft: '10px' }}
                    type="button"
                    onClick={toggleBreakDownModal}
                  >
                    Break Down
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
