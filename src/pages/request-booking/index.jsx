/* eslint-disable */
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import Visa from '../../assets/img/visa.png';
import Amex from '../../assets/img/amex-logo.png';
import Paypal from '../../assets/img/paypal.png';
import GooglePay from '../../assets/img/g-pay.png';
import TeslaCar from '../../assets/img/tesla-modal-car.jpg';
import { Link } from 'react-router-dom';
import CompanyReview from '../../assets/img/company-review-img.jpg';

export default function RequestBooking() {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [showDateEditContent, setShowDateEditContent] = useState(false);

  const [fromDate, setFromDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));
  const [toDate, setToDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));

  const modalCloseBtn = (
    <button type="button" className="btn close p-0" onClick={toggleTermsModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg"></i>
      </span>
    </button>
  );

  return (
    <>
      <div className="request-book-main padd-bottom-60 padd-top-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="request-book-left pr-5">
                {/* <div className="request-header">
                  <h2>Request to book</h2>
                </div> */}
                <div className="row mt-4 mb-4 align-items-center">
                  <div className="col-md-6">
                    <h5>Pay with</h5>
                  </div>
                  <div className="col-md-6">
                    <ul className="d-flex justify-content-end paycard-icon">
                      <li>
                        <img src={Visa} />
                      </li>
                      <li>
                        <img src={Amex} />
                      </li>
                      <li>
                        <img src={Paypal} />
                      </li>
                      <li>
                        <img src={GooglePay} />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="account-grid p-0 border-0">
                  <div className="contact-form-field mb-4 ">
                    <div className="select-outer">
                      <select>
                        <option>Credit or Debit Card</option>
                        <option>Credit or Debit Card</option>
                        <option>Credit or Debit Card</option>
                      </select>
                    </div>
                  </div>
                  <div className="contact-form-field mb-4 ">
                    <input type="number" placeholder="Card Number" />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="contact-form-field mb-4 ">
                        <div className="select-outer">
                          <select>
                            <option disabled="" selected="" hidden="">
                              Expiry Month
                            </option>
                            <option>01</option>
                            <option>02</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="contact-form-field mb-4 ">
                        <div className="select-outer">
                          <select>
                            <option disabled="" selected="" hidden="">
                              Expiry Year
                            </option>
                            <option>2025</option>
                            <option>2024</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-form-field mb-4 ">
                    <input type="text" placeholder="Post Code" />
                  </div>
                  <div className="contact-form-field mb-4 ">
                    <div className="select-outer">
                      <select>
                        <option disabled="" selected="" hidden="">
                          Country
                        </option>
                        <option>United Kingdom</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="contact-form-field mb-4 ">
                    <textarea placeholder="Additional requirements?"></textarea>
                  </div>
                  <hr />
                  <input type="checkbox" className="pointer margin-right-five" />
                  <label className="mb-0 pointer text-dark-white">
                    I accept the{' '}
                    <Link className="link-text pointer" to="/tos" target="_blank">
                      terms and conditions
                    </Link>{' '}
                    of the platform
                  </label>
                  <div className="contact-form-field submit-contact  mt-4">
                    <Link className="common-btn" to="/confirmation">
                      Request to book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="book-request-right">
                <div className="request-product-main d-flex">
                  <div className="request-product-left margin-right-ten">
                    <img src={TeslaCar} alt="tesla car" />
                  </div>
                  <div className="request-product-right pl-4">
                    <Link to="/public-review">
                      <img
                        src={CompanyReview}
                        alt="company-review-img"
                        className="profile-car"
                        style={{ width: '40px', height: 'auto', borderRadius: '99px', marginRight: '5px' }}
                      />
                      Name of Company
                    </Link>
                    <h2>Tesla Modal 3</h2>
                    <div className="rated-person-info car-details-rating">
                      <h2>
                        <i className="fas fa-star margin-right-five"></i>5.0
                      </h2>
                      <p>Level 4 host</p>
                      <h2>Car hosted by Karen</h2>
                    </div>
                  </div>
                </div>
                <div className="request-grid mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h2>Dates</h2>
                      <p>27 Jun (10:00) - 9 July (10:00)</p>
                    </div>
                    <div className="col-md-12">
                      <Collapse isOpen={showDateEditContent}>
                        <DateRangePicker
                          initialSettings={{
                            timePicker: true
                          }}
                          alwaysShowCalendars={true}
                          onEvent={handleEvent}
                        >
                          <div class="contact-form-field  field-label mt-3">
                            <input type="text" name="daterange" value={`${fromDate} - ${toDate}`} />
                          </div>
                        </DateRangePicker>
                      </Collapse>
                    </div>
                  </div>
                </div>
                <h5 className="mb-4 booking">Total Booking Cost for 3 days 6hrs</h5>
                <div className="request-grid">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>£100</p>
                    </div>
                    <div className="col-md-6">
                      <p>$100.00</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>Service fee</p>
                    </div>
                    <div className="col-md-6">
                      <p>$0.00</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h2>Total (GDP)</h2>
                    </div>
                    <div className="col-md-6">
                      <h2>£100.00</h2>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="mb-4 mt-4 text-dark-white">Cancellation Policy</h5>
              <p className="text-dark-white" style={{ textAlign: 'justify' }}>
                When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip
                start to allow flexibility for our guests. If the guest chooses to cancel for any reason within the 24
                hours period of the trip start, the guest will be subject to a late cancellation fee and will be
                refunded the remainder that is on hold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function toggleTermsModal() {
    setShowTermsModal(!showTermsModal);
  }

  function toggleShowEditDateContent() {
    setShowDateEditContent(!showDateEditContent);
  }

  function handleEvent(event, picker) {
    setFromDate(picker.startDate.format('M/DD/YYYY (hh:mm)'));
    setToDate(picker.endDate.format('M/DD/YYYY (hh:mm)'));
  }
}
