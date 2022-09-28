import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import classnames from 'classnames';
import Logo from '../../../assets/img/logo-main.png';
import { useLocation } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

export const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas (the)',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia (Plurinational State of)',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory (the)',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands (the)',
  'Central African Republic (the)',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands (the)',
  'Colombia',
  'Comoros (the)',
  'Congo (the Democratic Republic of the)',
  'Congo (the)',
  'Cook Islands (the)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  "Côte d'Ivoire",
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic (the)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands (the) [Malvinas]',
  'Faroe Islands (the)',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories (the)',
  'Gabon',
  'Gambia (the)',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (the)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran (Islamic Republic of)',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea (the Democratic People's Republic of)",
  'Korea (the Republic of)',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic (the)",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands (the)',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia (Federated States of)',
  'Moldova (the Republic of)',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands (the)',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger (the)',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands (the)',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines (the)',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation (the)',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin (French part)',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (Dutch part)',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan (the)',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands (the)',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates (the)',
  'United Kingdom of Great Britain and Northern Ireland (the)',
  'United States Minor Outlying Islands (the)',
  'United States of America (the)',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela (Bolivarian Republic of)',
  'Viet Nam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands'
];

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
                          <Link to="/account" style={{ color: 'inherit', width: '100%' }}>
                            Notifications
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/messages" style={{ color: 'inherit', width: '100%' }}>
                            Messages
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/bookings" style={{ color: 'inherit', width: '100%' }}>
                            Bookings
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/account" style={{ color: 'inherit', width: '100%' }}>
                            Favourites
                          </Link>
                        </DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/earning" style={{ color: 'inherit', width: '100%' }}>
                            Vehicle Listings
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }} className="header-ads-manager">
                          Ads Manager
                          <span className="header-coming-soon">coming soon</span>
                        </DropdownItem>

                        <DropdownItem divider />

                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/account" style={{ color: 'inherit', width: '100%' }}>
                            Account
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/support#1" style={{ color: 'inherit', width: '100%' }}>
                            Help
                          </Link>
                        </DropdownItem>
                        <DropdownItem style={{ display: 'flex' }}>
                          <Link to="/" style={{ color: 'inherit', width: '100%' }}>
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
          <div className="login-inner">
            <form>
              <div className="login-logo">
                <img src={Logo} alt="logo" />
              </div>
              <h2>Welcome back!</h2>
              <div className="contact-form-field mb-3">
                <input type="email" placeholder="Enter Email Address" />
              </div>
              <div className="contact-form-field mb-4">
                <input type="password" placeholder="Password" />
              </div>
              <div className="contact-form-field submit-contact text-center p-2">
                <input type="Submit" value="Login" onClick={toggleLoginModal} />
              </div>
            </form>
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
          <div className="login-inner signUp-steps">
            <TabContent activeTab={signUpActiveTab}>
              <TabPane tabId="1">
                <div className="login-logo">
                  <img src={Logo} alt="logo" />
                </div>
                <h2>Sign Up to your account</h2>
                <div className="contact-form-field mb-3 radio-field pointer" onClick={() => setAccountType('business')}>
                  <input
                    type="radio"
                    id="test1"
                    name="radio-group"
                    checked={accountType === 'business'}
                    onChange={() => setAccountType('business')}
                  />
                  <label for="test1">
                    <i
                      className="fas fa-briefcase"
                      style={accountType === 'business' ? { color: 'var(--secondary-color)' } : {}}
                    ></i>{' '}
                    Business
                  </label>
                </div>
                <div
                  className="contact-form-field mb-3 radio-field pointer"
                  onClick={() => setAccountType('individual')}
                >
                  <input
                    type="radio"
                    id="test2"
                    name="radio-group"
                    checked={accountType === 'individual'}
                    onChange={() => setAccountType('individual')}
                  />
                  <label for="test2">
                    <i
                      className="fas fa-user"
                      style={accountType === 'individual' ? { color: 'var(--secondary-color)' } : {}}
                    ></i>
                    Individual
                  </label>
                </div>
                <button className="common-btn text-uppercase mt-4 btnNext" onClick={() => toggleSignUpTabs('2')}>
                  Next
                </button>
              </TabPane>
              <TabPane tabId="2">
                <div className="login-logo">
                  <img src={Logo} alt="logo" />
                </div>
                <h2>Sign Up to your account</h2>
                <div className="contact-form-field mb-3">
                  <div className="select-outer">
                    <select>
                      <option disabled selected hidden>
                        Title
                      </option>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Miss</option>
                      <option>Ms</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form-field mb-3">
                  <div className="select-outer">
                    <select>
                      <option disabled selected hidden>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form-field mb-3">
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="contact-form-field mb-3">
                  <input type="text" placeholder="Last Name" />
                </div>
                <DateRangePicker
                  initialSettings={{
                    timePicker: false,
                    singleDatePicker: true,
                    maxYear: new Date().getFullYear(),
                    maxDate: moment().format('MM/DD/') + `/${new Date().getFullYear() - 18}`,
                    showDropdowns: true,
                    endDate: moment().format('MM/DD/') + `/${new Date().getFullYear() - 18}`,
                    startDate: moment().format('MM/DD/') + `/${new Date().getFullYear() - 18}`
                  }}
                  alwaysShowCalendars={true}
                  onEvent={handleEvent}
                >
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Birthday" value={fromDate} />
                  </div>
                </DateRangePicker>
                {accountType === 'business' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Legal Business Name" />
                  </div>
                )}
                {accountType === 'individual' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Phone Number" />
                  </div>
                )}
                {accountType === 'business' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Business Phone Number" />
                  </div>
                )}
                {accountType === 'business' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Business Email Address" />
                  </div>
                )}
                <button className="common-btn text-uppercase mt-4 btnNext" onClick={() => toggleSignUpTabs('3')}>
                  Next
                </button>
              </TabPane>
              <TabPane tabId="3">
                <div className="login-logo">
                  <img src={Logo} alt="logo" />
                </div>
                <h2>Sign Up to your account</h2>
                {accountType === 'individual' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Street Address" />
                  </div>
                )}
                {accountType === 'business' && (
                  <div className="contact-form-field mb-3">
                    <input type="text" placeholder="Business Address" />
                  </div>
                )}
                <div className="contact-form-field mb-3">
                  <input type="text" placeholder="Street Address 2" />
                </div>
                <div className="contact-form-field mb-3">
                  <input type="text" placeholder="City" />
                </div>
                <div className="contact-form-field mb-3">
                  <div className="select-outer">
                    <select>
                      <option disabled selected hidden>
                        Country (optional)
                      </option>
                      {countryList.map((c, index) => (
                        <option key={index}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="contact-form-field mb-3">
                  <input type="text" placeholder="Post Code" />
                </div>
                <div className="contact-form-field  checkbox-field">
                  <input type="checkbox" id="t3" name="" className="styled-checkbox" />
                  <label for="t3">
                    I accept the{' '}
                    <a href="/tos" target="_blank">
                      terms & conditions
                    </a>
                  </label>
                </div>
                <button className="common-btn text-uppercase mt-4 btnNext" onClick={toggleSignupModal}>
                  Register
                </button>
              </TabPane>
            </TabContent>
            <Nav tabs className="mt-4 justify-content-center border-0">
              <NavItem>
                <NavLink
                  className={classnames({ active: signUpActiveTab === '1' }) + ' pointer'}
                  onClick={() => {
                    toggleSignUpTabs('1');
                  }}
                ></NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: signUpActiveTab === '2' }) + ' pointer'}
                  onClick={() => {
                    toggleSignUpTabs('2');
                  }}
                ></NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: signUpActiveTab === '3' }) + ' pointer'}
                  onClick={() => {
                    toggleSignUpTabs('3');
                  }}
                ></NavLink>
              </NavItem>
            </Nav>
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
