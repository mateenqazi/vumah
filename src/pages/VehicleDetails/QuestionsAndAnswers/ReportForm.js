import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { useMutation } from '@apollo/client';
import { SEND_REPORT } from '../../../graphql/Queries';

function ReportForm({ host }) {
  const [toggleReportActiveTab, setToggleReportActiveTab] = useState('1');
  const [selectedReason, setSelectedReason] = useState(null);
  const [reportDescription, setReportDescription] = useState('');

  const [sendReport] = useMutation(SEND_REPORT, {
    variables: { id: host, reason: selectedReason, description: reportDescription }
  });

  const toggleAddReportTabs = async (tab) => {
    if (tab === '3') {
      console.log('selectedReason', selectedReason);
      console.log('reportDescription', reportDescription);
      console.log('host', host);
      // connect end point here
      await sendReport();
    }
    if (toggleReportActiveTab !== tab) setToggleReportActiveTab(tab);
  };

  return (
    <div className="signUp-steps">
      <TabContent activeTab={toggleReportActiveTab}>
        <TabPane tabId="1">
          <div className="add-listing-list ad-list-onetab">
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
                onClick={() => toggleAddReportTabs('2')}
              />
            </div>
          </div>
        </TabPane>

        <TabPane tabId="2">
          <div className="add-listing-list">
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="contact-form-field mb-3" style={{ textAlign: 'justify' }}>
                  Your concern will be sent privately to the Vumah team. After clicking ‘Submit’ We will review this
                  report and carry out the necessary action, thank you for reaching out to us.
                </div>
              </div>
            </div>

            <div className="contact-form-field submit-contact text-center mt-4">
              <input type="Submit" value="Submit" className="list-next-btn" onClick={() => toggleAddReportTabs('3')} />
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
  );
}

export default ReportForm;
