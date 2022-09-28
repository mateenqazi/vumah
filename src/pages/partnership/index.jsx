import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_PARTNERSHIP_MESSAGE } from '../../graphql/Queries';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export default function Partnership() {
  const [sendPartnershipEmail] = useMutation(SEND_PARTNERSHIP_MESSAGE);
  const { enqueueSnackbar } = useSnackbar();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    sendPartnershipEmail({
      variables: {
        content: {
          firstName: firstName,
          lastName: lastName,
          businessName: businessName,
          email: email,
          message: message
        }
      }
    })
      .then(() => {
        setFirstName('');
        setLastName('');
        setBusinessName('');
        setEmail('');
        setMessage('');
        enqueueSnackbar('Email sent successfully we will get back to you!', {
          variant: 'success'
        });
      })
      .catch((e) => {
        enqueueSnackbar('Email failed to send please contact dev team', {
          variant: 'error'
        });
        console.log(e);
      });
  };

  return (
    <section class="partnership-main position-relative padd-bottom-60">
      <div class="banner-slider mb-5 d-flex align-items-center justify-content-center">
        <div class="banner-slider-text text-center" data-aos="fade-up">
          <h2>Grow with us</h2>
        </div>
      </div>
      <div class="container">
        <div class="partnership-text mb-sm-4 mb-lg-5 text-center" data-aos="fade-up">
          <p>
            <b>
              Here at Vumah, we build partnerships with businesses that share our values, bring new ideas, and create
              great experiences.
            </b>
          </p>
        </div>
        <div class="row pt-4">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="partnership-text text-center text-lg-left pr-lg-5" data-aos="fade-up">
              <p class="mb-4" style={{ textAlign: 'justify' }}>
                Vumah is a vehicle rental platform which provides flexibility, variety and convenience providing the
                most vehicle options for visitors to create the best experience possible for their ventures. As we
                expand. more vehicle types will be available on the platform. and soon allowing vehicle rentals of all
                types on our platform
              </p>
              <p style={{ textAlign: 'justify' }}>
                We understand the importance of partnering and networking with companies who share our vision in making
                travelling the best experience it can be and sees the potential for the vehicle rental industry to make
                this happen. We are open to being in contact with all organizations within the travel and tourism
                industry, including insurance companies and will get back to you shortly.
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="partner-form" data-aos="fade-up">
              <h2 class="mb-5 text-center">Get in touch</h2>
              <div class="contact-form-field mb-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div class="contact-form-field mb-3">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div class="contact-form-field mb-3">
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  type="text"
                  placeholder="Business Name"
                />
              </div>
              <div class="contact-form-field mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div class="contact-form-field mb-5">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"></textarea>
              </div>
              <div class="contact-form-field submit-contact text-center">
                <input onClick={sendEmail} value="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
