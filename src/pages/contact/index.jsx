import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mailimg from '../../assets/img/mail-icon.png';
import arrowimg from '../../assets/img/arrow-1.png';
import { useMutation } from '@apollo/client';
import { SEND_CONTACT_US_MESSAGE } from '../../graphql/Queries';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

export default function Contact() {
  const [sendContactUsEmail, { loading }] = useMutation(SEND_CONTACT_US_MESSAGE);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    if (email !== '')
      sendContactUsEmail({
        variables: {
          content: {
            name: name,
            subject: subject,
            phoneNumber: phoneNumber,
            email: email,
            message: message
          }
        }
      })
        .then(() => {
          setName('');
          setPhoneNumber('');
          setSubject('');
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
    <>
      <section className="contact-page">
        <div className="container">
          <div className="contact-form">
            <div className="row">
              <div className="col-md-4">
                <div className="say-hello">
                  <div className="top-up">
                    <h3>Say Hello </h3>
                    <hr className="line" />
                  </div>
                  <div className="mail">
                    <a href="mailto:support@vumah.co.uk">
                      <img src={mailimg} />
                      <h5> Email </h5>
                      <p> support@vumah.co.uk </p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form">
                  <h3>Hey, Let's Talk</h3>
                  <hr className="line" />
                  <div className="form-box">
                    <form action="">
                      <div className="form-flex">
                        <label>
                          {' '}
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name*"
                            required
                          />{' '}
                        </label>
                        <label>
                          {' '}
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email*"
                            required
                          />{' '}
                        </label>
                      </div>
                      <div className="form-flex">
                        <label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            name=""
                            id=""
                            placeholder="Subject"
                            required
                          >
                            <option value="Subject"> Subject</option>
                            <option value="Payments"> Payments</option>
                            <option value="Bookings"> Bookings</option>
                            <option value="Verification"> Verification</option>
                            <option value="Refunds"> Refunds</option>
                            <option value="Cancellations"> Cancellations</option>
                            <option value="Other"> Other</option>
                          </select>
                        </label>
                        <label>
                          {' '}
                          <input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="number"
                            placeholder="Phone No"
                            required
                          />{' '}
                        </label>
                      </div>
                      <div className="form-full">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Message*"
                          required
                        ></textarea>
                      </div>
                      <Stack sx={{ width: '100%', pt: '50px', pr: '30px', alignItems: 'flex-end' }}>
                        <LoadingButton
                          variant="contained"
                          loading={loading}
                          onClick={() => sendEmail()}
                          size={'large'}
                          sx={{ borderRadius: '100px', maxWidth: '200px' }}
                        >
                          Send Message
                        </LoadingButton>
                      </Stack>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
