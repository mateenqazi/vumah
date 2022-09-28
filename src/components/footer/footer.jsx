import React, { useEffect } from 'react';
import { Link as RLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

function Link(props) {
  function scrollToHash(runMore) {
    if (props.to && props.to.includes('#')) {
      const id = props.to.split('#');
      if (id.length > 1) {
        const el = document.getElementById(id[1]);

        if (el) {
          el.scrollIntoView();
        }
      }
    }

    if (runMore !== false) {
      setTimeout(() => {
        scrollToHash(false);
      }, 50);

      setTimeout(() => {
        scrollToHash(false);
      }, 100);

      setTimeout(() => {
        scrollToHash(false);
      }, 150);

      setTimeout(() => {
        scrollToHash(false);
      }, 200);
    }
  }

  return <RLink onClick={scrollToHash} {...props} />;
}

export default function Footer() {
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    if (theme.palette.mode === 'light') {
      document.body.classList.remove('dark-theme');
    } else document.body.classList.add('dark-theme');
  }, []);

  return (
    <footer className="footer-main">
      <div className="container" style={location.pathname === '/search' ? { maxWidth: '1800px' } : {}}>
        <div className="row pt-3 pb-4">
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div className="footer-grid">
              <h5>Company</h5>
              <ul className="pl-0">
                <li>
                  <Link to="/about-us">About us</Link>
                </li>
                <li>
                  <Link to="/career">Careers</Link>
                </li>
                <li>
                  <Link to="/partnership">Partner with us</Link>
                </li>
                <li>
                  <Link to="/tos">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3  mb-3 mb-lg-0">
            <div className="footer-grid">
              <h5>Become a Host</h5>
              <ul>
                <li>
                  <Link to="/host-guide#create-a-listing">Start your business</Link>
                </li>
                <li>
                  <Link to="/support#2">Host support</Link>
                </li>
                <li>
                  <Link to="/host-guide#host-rankings-and-performance">Host ranking</Link>
                </li>
                <li>
                  <Link to="/tos#37">Vehicle protection & insurance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div className="footer-grid">
              <h5>Guest Support</h5>
              <ul>
                <li>
                  <Link to="/guest-guide#getting-started-with-vumah">Kickstart your journey</Link>
                </li>
                <li>
                  <Link to="/guest-guide#trouble-with-booking">Trouble with booking</Link>
                </li>
                <li>
                  <Link to="/guest-guide#guest-fees">Guest fees</Link>
                </li>
                <li>
                  <Link to="/guest-guide#account-safety">Account safety</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0">
            <div className="footer-grid">
              <h5>Support Centre</h5>
              <ul>
                <li>
                  <Link to="/support#1">Support page</Link>
                </li>
                <li>
                  <Link to="/trust">Trust & safety</Link>
                </li>
                <li>
                  <Link to="/tos#6">Cancellations</Link>
                </li>
                <li>
                  <Link to="/covid">Covid-19 guidelines</Link>
                </li>
                <li>
                  <Link to="/faq">FAQs</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="footer-hr" />

        <div className="row">
          <div className="col-md-4">
            <div className="footer-copy-right mb-3 mb-md-0 footer-social-icon d-flex flex-column align-items-md-start align-items-center">
              <p>{moment().format('yyyy')} Vumah. All rights preserved </p>
              <ul className="d-flex mt-2 p-0">
                <li>
                  <a href="https://www.facebook.com/vumahltd" className="fb">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/vumahltd " className="twitter">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/vumahltd/ " className="instra">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="footer-social-icon d-flex justify-content-center justify-content-md-end">
              <div className="dark-light-mode-main">
                <label className="m-0">
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    onChange={theme.toggleDarkMode}
                    checked={theme.palette.mode === 'dark'}
                  />
                  <div className="toggle-slot">
                    <div className="sun-icon-wrapper">
                      <Icon icon="feather-sun" className="sun-icon" />
                    </div>
                    <div className="toggle-button" />
                    <div className="moon-icon-wrapper">
                      <Icon icon="feather-moon" className="moon-icon" />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // function toggleDarkMode(e) {
  //   if (e.target.checked) {
  //     document.body.classList.add('dark-theme');
  //   } else {
  //     document.body.classList.remove('dark-theme');
  //   }
  // }
}
