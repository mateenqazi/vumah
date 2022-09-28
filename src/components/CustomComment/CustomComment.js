import React, { useState } from 'react';
import 'src/components/CustomComment/comment.css';
import { Card } from 'react-bootstrap';
import CommentBox from '../CommentBox/CommentBox';
import { Modal, ModalHeader, ModalBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useMutation } from '@apollo/client';
import { SEND_REPORT, UPDATE_USER } from '../../graphql/Queries';
function CustomComment(props) {
  let margin = props.margin;
  let margins = props.margins;
  const [isReply, setIsReply] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [toggleReportActiveTab, setToggleReportActiveTab] = useState('1');
  const [selectedReason, setSelectedReason] = useState(null);
  const [reportDescription, setReportDescription] = useState('');

  const [sendReport] = useMutation(SEND_REPORT, {
    variables: { id: props?.host, reason: selectedReason, description: reportDescription }
  });

  function replyHandler() {
    setIsReply(!isReply);
  }
  function reportHandler() {
    setIsReport(!isReport);
  }
  const toggleAddReportTabs = async (tab) => {
    if (tab === '3') {
      console.log('selectedReason', selectedReason);
      console.log('reportDescription', reportDescription);
      console.log('complaintBy', props.complaintBy);
      console.log('host', props.host);
      // connect end point here
      await sendReport();
    }
    if (toggleReportActiveTab !== tab) setToggleReportActiveTab(tab);
  };
  const modalCloseBtn2 = (
    <button type="button" className="btn close p-0" onClick={reportHandler}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg"></i>
      </span>
    </button>
  );

  return (
    <div className="car-people-rating mb-4" style={{ padding: '5px', margin: margins, marginLeft: margin }}>
      <div className="rated-person-info d-flex mb-2 align-items-center">
        <div className="rated-person-img margin-right-ten">
          <img src={props.image} alt="rated-person" />
        </div>
        <div className="rated-person-info">
          <h2>{props.name}</h2>
          <p>{props.date}</p>
        </div>
      </div>
      <p>{props.comment}</p>
      <span className="btn info" onClick={replyHandler}>
        Reply
      </span>
      <span className="btn info" onClick={reportHandler}>
        Report
      </span>
      {isReply && <CommentBox buttonName="Reply" placeholder="Reply" />}
      <Modal isOpen={isReport} toggle={reportHandler} className="loginPopupMain add-listing-main">
        <ModalHeader toggle={reportHandler} close={modalCloseBtn2}></ModalHeader>
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
                          <select
                            value={selectedReason}
                            onChange={(e) => {
                              setSelectedReason(e.target.value);
                            }}
                            style={{ borderColor: 'var(--secondary-color)' }}
                          >
                            <option value={null} disabled selected>
                              Reason for report
                            </option>
                            <option value="Inappropriate behaviour">Inappropriate behaviour</option>
                            <option value="User is attempting to book outside of Vumah">
                              User is attempting to book outside of Vumah
                            </option>
                            <option value="I think this is a scam">I think this is a scam</option>
                            <option value="Vehicle is not as described">Vehicle is not as described</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="contact-form-field mb-3">
                        <textarea
                          placeholder="Description"
                          style={{ borderColor: 'var(--secondary-color)' }}
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="contact-form-field submit-contact text-center mt-4">
                    <input
                      type="Submit"
                      value="Continue"
                      className="list-next-btn"
                      // disabled={!(selectedReason && reportDescription)}
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
    </div>
  );
}

export default CustomComment;
