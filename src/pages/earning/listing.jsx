import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import CarListing from '../car-listing';
import WaveGraph from '../../assets/img/graph-wave.png';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import * as _ from 'lodash';
import { useTheme } from '@mui/material/styles';

// import { Line, Doughnut } from 'react-chartjs-2';

import SortingSelecting from './vehicleListing';

import 'react-upload-gallery/dist/style.css';
import AddVehicle from './AddVehicle.js';
import useDroidDialog from '../../hooks/useDroidDialog';
import { Card } from '@mui/material';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import BookingTipsChart from './Charts/BookingTipsChart';
import EarningsChart from './Charts/EarningsChart';
import LineChartCustom from './Charts/LineChartCustom';
import { useQuery } from '@apollo/client';
import { GET_USER_SUMMARY_EARNINGS, GET_USER_SUMMARY_TRIPS, GET_USER_VEHICLES } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import NewLineGraph from './Charts/NewLineGraph';
// import FusionGraph from '../../fusionGraph';

export default function Listing({ userVehicles, loadingVehicles, getVehicles }) {
  const { onOpen } = useDroidDialog();
  const theme = useTheme();

  const [showListingContent, setShowListingContent] = useState(true);

  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [statisticsFilter, setStatisticsFilter] = useState([true, true]);

  const [fromDate, setFromDate] = useState(moment(Date.now() - 1000 * 60 * 60 * 24 * 365));
  const [toDate, setToDate] = useState(moment());

  const [bookingLine, setBookingLine] = useState(true);
  const [earningLine, setEarningLine] = useState(true);

  const { loading: loadingEarnings, data: dataEarnings } = useQuery(GET_USER_SUMMARY_EARNINGS);
  const { loading: loadingTrips, data: dataTrips } = useQuery(GET_USER_SUMMARY_TRIPS);

  const changeBookingLine = () => {
    if (bookingLine === true) {
      setBookingLine(false);
    } else {
      setBookingLine(true);
    }
  };

  const changeEarningLine = () => {
    if (earningLine === true) {
      setEarningLine(false);
    } else {
      setEarningLine(true);
    }
  };

  function toggleFilterDropDown() {
    setFilterDropdownOpen((prevState) => !prevState);
  }

  function handleEvent(event, picker) {
    setFromDate(picker.startDate.format('M/DD/YYYY'));
    setToDate(picker.endDate.format('M/DD/YYYY'));
  }

  return (
    <>
      {loadingEarnings || loadingTrips || loadingVehicles ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            className="statistic-graph mb-4"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '100%' }}>
              <div className="row mb-3 pt-4">
                <div className="col-sm-4 "></div>
                <div className="col-sm-8 justify-content-center justify-content-sm-start">
                  <div className="d-flex justify-content-center justify-content-sm-end margin-right-ten align-items-center">
                    <div style={{ position: 'relative' }}>
                      <DateRangePicker
                        initialSettings={{
                          timePicker: false,
                          opens: 'left',
                          endDate: toDate,
                          startDate: fromDate,
                          maxDate: moment()
                        }}
                        onChange={() => {}}
                        alwaysShowCalendars={true}
                        onEvent={handleEvent}
                      >
                        <div className="contact-form-field field-label">
                          <input
                            type="text"
                            name="daterange"
                            value={`${moment(fromDate).format('M/DD/YYYY')} - ${moment(toDate).format('M/DD/YYYY')}`}
                            style={{
                              borderColor: '#f67810',
                              height: '30px',
                              textAlign: 'center',
                              paddingLeft: '10px',
                              paddingRight: '10px'
                            }}
                          />
                        </div>
                      </DateRangePicker>
                    </div>
                    <div className="select-outer">
                      <div className="banner-search-dropdown">
                        <Dropdown isOpen={filterDropdownOpen} toggle={toggleFilterDropDown}>
                          <DropdownToggle className="margin-right-ten">
                            {statisticsFilter[0] && statisticsFilter[1]
                              ? 'All'
                              : statisticsFilter[0]
                              ? 'Bookings'
                              : statisticsFilter[1]
                              ? 'Earnings'
                              : 'Nothing'}
                          </DropdownToggle>
                          <DropdownMenu className="vumah-dropdown-menu">
                            <DropdownItem
                              className="vechiles"
                              onMouseUp={() => {
                                changeEarningLine();
                                setStatisticsFilter([statisticsFilter[0], !statisticsFilter[1]]);
                                setFilterDropdownOpen(true);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 10);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 25);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 50);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 100);
                              }}
                              style={{ display: 'flex' }}
                            >
                              <div className="contact-form-field checkbox-field" style={{ width: 'unset' }}>
                                <input
                                  className="styled-checkbox"
                                  id="bbb2"
                                  type="checkbox"
                                  checked={statisticsFilter[1]}
                                  onChange={() => {}}
                                />
                                <label htmlFor="bbb2" />
                              </div>
                              Earnings
                            </DropdownItem>
                            <DropdownItem
                              className="vechiles"
                              onMouseUp={() => {
                                changeBookingLine();
                                setStatisticsFilter([!statisticsFilter[0], statisticsFilter[1]]);
                                setFilterDropdownOpen(true);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 10);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 25);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 50);

                                setTimeout(() => {
                                  setFilterDropdownOpen(true);
                                }, 100);
                              }}
                              style={{ display: 'flex' }}
                            >
                              <div className="contact-form-field checkbox-field" style={{ width: 'unset' }}>
                                <input className="styled-checkbox" id="bbb1" type="checkbox" checked={bookingLine} />
                                <label htmlFor="bbb1" />
                              </div>
                              Bookings
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginRight: '0.4em' }}>
                <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                  <EarningsChart summary={dataEarnings} loading={loadingEarnings} />
                  <div style={{ height: '1em' }} />
                  <BookingTipsChart summary={dataTrips} loading={loadingTrips} />
                </div>
                <div
                  className="col-md-8 card"
                  style={{
                    padding: 8,
                    borderRadius: 15,
                    boxShadow: theme.shadows[18],
                    backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#fff'
                  }}
                >
                  {loadingTrips || loadingEarnings ? (
                    <LoadingScreen />
                  ) : (
                    <>
                      <NewLineGraph
                        bookingLine={bookingLine}
                        earningLine={earningLine}
                        trips={dataTrips?.GetUserSummaryTrips?.filter((s) =>
                          moment(s?.date).isBetween(fromDate, toDate)
                        )}
                        earnings={dataEarnings?.GetUserSummaryEarning?.filter((s) =>
                          moment(s?.date).isBetween(fromDate, toDate)
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
              <>
                {/*<div className="row" style={{ marginRight: '0.4em' }}>*/}
                {/*  <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>*/}
                {/*    <EarningsChart summary={dataEarnings} loading={loadingEarnings} />*/}
                {/*    <div style={{ height: '1em' }} />*/}
                {/*    <BookingTipsChart summary={dataTrips} loading={loadingTrips} />*/}
                {/*  </div>*/}
                {/*  <div*/}
                {/*    className="col-md-8 card"*/}
                {/*    style={{*/}
                {/*      padding: 10,*/}
                {/*      borderRadius: 15,*/}
                {/*      boxShadow: theme.shadows[18],*/}
                {/*      backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#fff'*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    {loadingTrips || loadingEarnings ? (*/}
                {/*      <LoadingScreen />*/}
                {/*    ) : (*/}
                {/*      <>*/}
                {/*        <LineChartCustom*/}
                {/*          bookingLine={bookingLine}*/}
                {/*          earningLine={earningLine}*/}
                {/*          trips={dataTrips}*/}
                {/*          earnings={dataEarnings}*/}
                {/*        />*/}
                {/*      </>*/}
                {/*    )}*/}
                {/*  </div>*/}
                {/*</div>*/}
              </>
            </div>
          </div>

          <div className="custom-table-main">
            <div className="table-caption mb-4">
              <div className="row align-items-center">
                <div className="col-4 col-md-6"></div>
                <div className="col-8 col-md-6 text-right-align">
                  <button
                    className="common-btn Summary-btn ml-3"
                    onClick={() => onOpen('Add Vehicle', <AddVehicle getVehicles={getVehicles} />, true)}
                  >
                    Add Listing
                  </button>
                </div>
              </div>
            </div>

            {showListingContent ? (
              <Card style={{ marginBottom: 30 }}>
                <SortingSelecting
                  trips={dataTrips}
                  earnings={dataEarnings}
                  data={userVehicles}
                  loading={loadingVehicles}
                  getVehicles={getVehicles}
                />
              </Card>
            ) : (
              <>
                <Chart1 />
                <>
                  <div className="summary-pie-cart table-second">
                    <Chart2 />
                  </div>
                </>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
