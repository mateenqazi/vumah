import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import AvailabilityListing from './AvailabilityListing';
import { Card } from '@mui/material';

export default function Availability({ userVehicles, loadingVehicles, vehicleError, getVehicles }) {
  const [showChangeAvailabilityPopup, setShowChangeAvailabilityPopup] = useState(false);
  const [availability, setAvailability] = useState('');

  const dateeeStart = moment(moment().unix() * 1000 - 1000 * 60 * 60 * 24 * moment().day());
  const dateeeEnd = moment(moment().unix() * 1000 - 1000 * 60 * 60 * 24 * moment().day() + 1000 * 60 * 60 * 24 * 6);

  const [endDate, setEndDate] = useState(dateeeEnd.format('M/DD/YYYY'));
  const [startDate, setStartDate] = useState(dateeeStart.format('M/DD/YYYY'));

  useEffect(() => {
    const myFunction = (event) => {
      const tr = event.target.closest('#my-week-selector .drp-calendar .table-condensed tr');

      if (tr !== null) {
        tr.classList.add('active');
        const children = Array.from(tr.children);

        for (let index = 0; index < children.length; index++) {
          children[index].classList.add('active');
          //tr.children[index].classList.add('active');
        }
      }
    };

    document.addEventListener('mouseup', myFunction);

    return function () {
      document.removeEventListener('mouseup', myFunction);
    };
  });

  return (
    <>
      <div className="earning-main availability-main">
        <div className="custom-table-main">
          <Card>
            <AvailabilityListing
              isOpen={openModal}
              data={userVehicles}
              loading={loadingVehicles}
              error={vehicleError}
              getVehicles={getVehicles}
            />
          </Card>
        </div>
        <p className="imp-note mt-3">* During unavailable days and hours the listing will be automatically paused</p>
      </div>

      {/* <!-- change availability modal --> show pop up on tables on  Availability */}

      <Modal
        isOpen={showChangeAvailabilityPopup}
        toggle={toggleShowChangeAvailabilityPopup}
        className="loginPopupMain add-listing-main"
      >
        <ModalHeader toggle={toggleShowChangeAvailabilityPopup} close={toggleShowChangeAvailabilityPopup}>
          <div className="availability-modal-header">
            <h4 className="heading-fix">Select Availability</h4>
            <button type="button" className="btn close" onClick={toggleShowChangeAvailabilityPopup}>
              <span aria-hidden="true" className="availability-close-btn">
                <i className="fal fa-times fa-lg" />
              </span>
            </button>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="contact-form-field radio-field available-all-day-radio mt-4">
            <input
              type="radio"
              id="t1"
              checked={availability === 'availAbleAllDay'}
              className="styled-checkbox availability-checkbox"
              value="availAbleAllDay"
              onChange={onChangeAvailability}
            />
            <label htmlFor="t1" className="text-dark-white padding-left-thirty">
              Available All Day
            </label>
          </div>
          <div className="contact-form-field radio-field custom-hours-radio mt-2">
            <input
              type="radio"
              id="t2"
              checked={availability === 'customHours'}
              className="styled-checkbox availability-checkbox"
              value="customHours"
              onChange={onChangeAvailability}
            />
            <label htmlFor="t2" className="text-dark-white padding-left-thirty">
              Custom Hours
            </label>
          </div>
          <div className="contact-form-field radio-field unavailable-radio mt-2">
            <input
              type="radio"
              id="t3"
              checked={availability === 'unavilable'}
              className="styled-checkbox availability-checkbox"
              value="unavilable"
              onChange={onChangeAvailability}
            />
            <label htmlFor="t3" className="text-dark-white padding-left-thirty">
              Unavailable all day
            </label>
          </div>
          {availability === 'customHours' && (
            <div className="row mt-3">
              <div className="col-md-6 contact-form-field">
                <label>From</label>
                <input type="time" className="content" />
              </div>
              <div className="col-md-6 contact-form-field">
                <label>Until</label>
                <input type="time" className="content" />
              </div>
            </div>
          )}
          <div className="contact-form-field submit-contact text-center p-2 mt-3">
            <input type="Submit" value="Update" onClick={toggleShowChangeAvailabilityPopup} />
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- change availability modal --> */}
    </>
  );

  function openModal(isOpen) {
    setShowChangeAvailabilityPopup(isOpen);
  }

  function toggleShowChangeAvailabilityPopup() {
    setShowChangeAvailabilityPopup(!showChangeAvailabilityPopup);
  }

  function onChangeAvailability(e) {
    const { value } = e.target;
    setAvailability(value);
  }

  function handleEvent(event, picker) {
    const dateeeStart = moment(picker.startDate.unix() * 1000 - 1000 * 60 * 60 * 24 * picker.startDate.day());
    picker.setStartDate(dateeeStart);

    const dateeeEnd = moment(
      picker.startDate.unix() * 1000 - 1000 * 60 * 60 * 24 * picker.startDate.day() + 1000 * 60 * 60 * 24 * 6
    );
    picker.setEndDate(dateeeEnd);

    setStartDate(dateeeStart.format('M/DD/YYYY'));
    setEndDate(dateeeEnd.format('M/DD/YYYY'));
  }
}
