import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Availability from './availability.jsx';
import Earnings from './Earnings';
import Listing from './listing';
import Rank from './rank';
import { Container } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_VEHICLES } from '../../graphql/Queries';

export default function Earning() {
  const [activeTab, setActiveTab] = useState('1');

  const [vehicles, setVehicle] = useState([]);

  const [getUserVehicles, { loading: loadingVehicles, error: vehicleError }] = useLazyQuery(GET_USER_VEHICLES);

  const getVehicles = async () => {
    await getUserVehicles().then((res) => {
      setVehicle(res?.data?.GetUserVehicles);
    });
  };

  useEffect(async () => {
    await getVehicles();
  }, [vehicles]);

  return (
    <section className="padd-top-60 padd-bottom-60">
      <Container maxWidth="1500px">
        <div class="d-lg-flex w-100 overview-main" data-aos="fade-up">
          <Nav pills className="flex-lg-column">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' }) + ' pointer'}
                onClick={() => {
                  toggle('1');
                }}
              >
                My Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' }) + ' pointer'}
                onClick={() => {
                  toggle('2');
                }}
              >
                Earnings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' }) + ' pointer'}
                onClick={() => {
                  toggle('3');
                }}
              >
                Availability
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' }) + ' pointer'}
                onClick={() => {
                  toggle('4');
                }}
              >
                Rank
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Listing userVehicles={vehicles} loadingVehicles={loadingVehicles} getVehicles={getVehicles} />
            </TabPane>
            <TabPane tabId="2">
              <Earnings />
            </TabPane>
            <TabPane tabId="3">
              <Availability
                userVehicles={vehicles}
                loadingVehicles={loadingVehicles}
                vehicleError={vehicleError}
                getVehicles={getVehicles}
              />
            </TabPane>
            <TabPane tabId="4">
              <Rank />
            </TabPane>
          </TabContent>
        </div>
      </Container>
    </section>
  );

  function toggle(tab) {
    if (activeTab !== tab) setActiveTab(tab);
  }
}
