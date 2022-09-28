import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Logo from '../../../assets/img/logo-main.png';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../authGuard/LoginForm';
import RegisterForm from '../../authGuard/RegisterForm';

export default function Header() {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signUpActiveTab, setSignUpActiveTab] = useState('1');
  const [accountType, setAccountType] = useState('individual');

  const modalCloseBtn = (
    <button type="button" className="btn close p-0" onClick={closeAllModal}>
      <span aria-hidden="true">
        <i className="fas fa-times-circle fa-lg"></i>
      </span>
    </button>
  );

  const [fromDate, setFromDate] = useState('');

  let trigger;

  useEffect(() => {
    if (window.location.hash === '#open-sign-up-modal' || trigger) {
      setAccountType('business');
      toggleSignUpTabs('2');
      setShowSignupModal(true);
      window.location.hash = '';
      trigger = true;
    }

    setTimeout(() => {
      if (window.location.hash === '#open-sign-up-modal' || trigger) {
        setAccountType('business');
        toggleSignUpTabs('2');
        setShowSignupModal(true);
        window.location.hash = '';
        trigger = true;
      }
    }, 50);

    setTimeout(() => {
      if (window.location.hash === '#open-sign-up-modal' || trigger) {
        setAccountType('business');
        toggleSignUpTabs('2');
        setShowSignupModal(true);
        window.location.hash = '';
        trigger = true;
      }
    }, 100);

    setTimeout(() => {
      if (window.location.hash === '#open-sign-up-modal' || trigger) {
        setAccountType('business');
        toggleSignUpTabs('2');
        setShowSignupModal(true);
        window.location.hash = '';
        trigger = true;
      }
    }, 150);

    setTimeout(() => {
      if (window.location.hash === '#open-sign-up-modal' || trigger) {
        setAccountType('business');
        toggleSignUpTabs('2');
        setShowSignupModal(true);
        window.location.hash = '';
        trigger = true;
      }
    }, 200);
  });

  return (
    <>
      <header className="header-main">
        <div
          className="container"
          style={
            location.pathname === '/search' ||
            location.pathname === '/chat' ||
            location.pathname === '/messages' ||
            location.pathname === '/bookings'
              ? { maxWidth: '1800px' }
              : {}
          }
        >
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="header-logo text-md-left text-center mb-4 mb-md-0">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="header-nav d-flex align-items-center justify-content-center justify-content-md-end mb-2 mb-md-0">
                <ul className="header-menu-list d-flex mb-0">
                  <li>
                    <Link to="/landing-page" className="become-host">
                      Become a host
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="about-us">
                      About Us
                    </Link>
                  </li>
                </ul>
                <div className="header-icon-pair d-flex align-items-center" onClick={toggleDropDown}>
                  <div className="header-menu-btn">
                    <Dropdown isOpen={dropdownOpen} toggle={() => {}}>
                      <DropdownToggle caret style={{ background: 'transparent' }}>
                        <i className="fa fa-bars"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu">
                        <DropdownItem onClick={toggleLoginModal}>Login</DropdownItem>
                        <DropdownItem onClick={toggleSignupModal}>Sign Up</DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/profile" style={{ color: 'inherit', width: '100%' }}>
                            Profile
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/account"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Notifications
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/messages"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Messages
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/bookings"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Bookings
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/account"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Favourites
                          </Link>
                        </DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/earning"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Vehicle Listings
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }} className="header-ads-manager">
                          Ads Manager
                          <span className="header-coming-soon">coming soon</span>
                        </DropdownItem>

                        <DropdownItem divider />

                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/account"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Account
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/support#1"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Help
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link
                            to="/"
                            style={{
                              color: 'inherit',
                              width: '100%'
                            }}
                          >
                            Logout
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="header-profile">
                    <div className="header-profile-img">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- login modal --> */}
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal} className="loginPopupMain add-listing-main">
        <ModalHeader toggle={toggleLoginModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                maxWidth: '850px',
                width: '800px',
                padding: '10px'
              }}
            >
              <div style={{ maxWidth: '135px', margin: '0 auto 30px' }}>
                <img src={Logo} alt="logo" />
              </div>
              <LoginForm />
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- login modal --> */}

      {/* <!-- Sign up modal --> */}
      <Modal
        isOpen={showSignupModal}
        toggle={toggleSignupModal}
        className="loginPopupMain signup-popup add-listing-main"
      >
        <ModalHeader toggle={toggleSignupModal} close={modalCloseBtn}></ModalHeader>
        <ModalBody>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                maxWidth: '850px',
                width: '800px',
                padding: '10px'
              }}
            >
              <div style={{ maxWidth: '135px', margin: '0 auto 30px' }}>
                <img src={Logo} alt="logo" />
              </div>
              <RegisterForm />
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <!-- sign up modal --> */}
    </>
  );

  function toggleDropDown() {
    setDropdownOpen((prevState) => !prevState);
  }

  function toggleLoginModal(e) {
    if (e) e.preventDefault();
    setShowLoginModal(!showLoginModal);
  }

  function toggleSignupModal(e) {
    if (e) e.preventDefault();

    if (showSignupModal) {
      document.body.style.overflow = null;
      document.getElementsByTagName('html')[0].style.overflow = null;
    } else {
      document.body.style.overflow = 'hidden';
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    setShowSignupModal(!showSignupModal);
  }

  function closeAllModal() {
    setShowLoginModal(false);
    setShowSignupModal(false);
  }

  function toggleSignUpTabs(tab) {
    if (signUpActiveTab !== tab) setSignUpActiveTab(tab);
  }

  function handleEvent(event, picker) {
    setFromDate(picker.startDate.format('M/DD/YYYY'));
  }
}
