import React from 'react';
import ServiceOne from '../../assets/img/service-first-img-1.jpg';
import ServiceTwo from '../../assets/img/service-first-img-2.jpg';
import ServiceThree from '../../assets/img/service-first-img-3.jpg';
import Choose from '../../assets/img/choose.jpg';
import First from '../../assets/img/first.jpg';
import step1 from '../../assets/landingpage/landing-1.png';
import step2 from '../../assets/landingpage/landing-2.png';
import step3 from '../../assets/landingpage/landing-3.png';
import RegisterForm from '../../layouts/authGuard/RegisterForm';
import useDroidDialog from '../../hooks/useDroidDialog';

export default function LandingPage() {
  const { onOpen } = useDroidDialog();

  return (
    <>
      <section className="banner-main" style={{ top: '-40px' }}>
        <div className="container  position-relative sliderBXlandingPage">
          <div className="banner-content1 about-text" style={{ margin: 0, top: '64px' }}>
            <h1 style={{ color: '#fff' }}>
              Looking to become a <span>host</span> ?
            </h1>
            <p style={{ textAlign: 'justify', color: '#fff' }} className="pb-3">
              The Vumah Platform is a community which allows businesses, and soon individuals to rent out their vehicles
              to verified and licensed users, and an all in one vehicle rental platform covering cars, bicycles,
              motorcycles, campervans and soon much more! Getting started is easy, sign up and get started today.{' '}
            </p>
            <div
              className="get-started-btn common-btn"
              data-toggle="modal"
              onClick={() =>
                onOpen(
                  'Set up an account',
                  <>
                    <RegisterForm />
                  </>
                )
              }
            >
              Get started
            </div>
          </div>
        </div>
        <div className="overlay-top" />
      </section>

      <section className="service-step-main">
        <div className="container">
          <div className="service-header text-center mb-5" data-aos="fade-up">
            <h2>Simple Steps</h2>
          </div>
          <div className="row">
            <div className="col-md-4 p-0">
              <div className="stepImgBox">
                <img src={step1} alt="" className="stepImg" />
              </div>
              <div className="stepSec">
                <span className="steps d-block"> step-1</span>
                <span className="heading d-block">List your vehicle for free</span>
                <p>
                  After you have signed up and been verified, you can start listing your vehicles on the platform. Make
                  sure to use your best pictures, presentation is key.
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="stepImgBox">
                <img src={step2} alt="" className="stepImg" />
              </div>
              <div className="stepSec">
                <span className="steps d-block"> step-2</span>
                <span className="heading d-block">Choose what bookings to accept</span>
                <p>
                  When a user wants to book your vehicle, they will send a request which you can either accept or
                  decline. This allows flexibility for the hosts to choose when to accept bookings at times most
                  convenient.
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="stepImgBox bxno">
                <img src={step3} alt="" className="stepImg" />
              </div>
              <div className="stepSec">
                <span className="steps d-block"> step-3</span>
                <span className="heading d-block">Get paid</span>
                <p>
                  After the trip is completed, we’ll release the payment after 24 hours which will go straight to your
                  chosen account.
                </p>
              </div>
            </div>
            <div className="col-md-12 text-center mt-4">
              <div
                className="get-started-btn common-btn"
                data-toggle="modal"
                onClick={() =>
                  onOpen(
                    'Set up an account',
                    <>
                      <RegisterForm />
                    </>
                  )
                }
              >
                Get started
              </div>
            </div>
          </div>

          {/* <div className="service-step-outer" data-aos="fade-up">
            <div className="service-step-first mb-5">
              <div className="row mb-4">
                <div className="col-lg-10">
                  <div className="service-step-content">
                    <h2>1. List your vehicle for free</h2>
                    <p style={{textAlign: 'justify'}}>After you have signed up and been verified, you can start listing your vehicles on
                      the platform. Make sure to use your best pictures, presentation is key.</p>
                  </div>
                </div>
                <div className="col-lg-2 text-center text-lg-right">
                  <a className="host-btn common-btn" href="#open-sign-up-modal" data-toggle="modal">HOST NOW</a>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 mb-4 mb-sm-0">
                  <div className="service-first-grid">
                    <img src={ServiceOne} alt="service-img" />
                  </div>
                </div>
                <div className="col-sm-4 mb-4 mb-sm-0">
                  <div className="service-first-grid">
                    <img src={ServiceTwo} alt="service-img" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="service-first-grid">
                    <img src={ServiceThree} alt="service-img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="service-step-two" data-aos="fade-up">
              <div className="row mb-4">
                <div className="col-lg-6">
                  <div className="service-step-content">
                    <h2> 2. Choose what bookings to accept</h2>
                    <p style={{textAlign: 'justify'}}>When a user wants to book your vehicle, they will send a request which you can either
                      accept or decline. This allows flexibility for the hosts to choose when to accept
                      bookings at times most convenient.</p>
                    <p>&nbsp;</p>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-12 mb-sm-0">
                      <div className="service-first-grid">
                        <img src={Choose} alt="service-img" />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="service-step-content">
                    <h2> 3. Get paid</h2>
                    <p style={{textAlign: 'justify'}}>After the trip is completed, we’ll release the payment after 24 hours which will go
                      straight to your chosen account.</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 mb-12 mb-sm-0">
                      <div className="service-first-grid">
                        <img src={First} alt="service-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="commercial-host-main" data-aos="fade-up">
              <div className="container">
                <div className="row mb-4">
                  <h2>Commercial hosts</h2>
                  <p style={{textAlign: 'justify'}}>
                    Join our company platform and immediately access a large variety of customers waiting to
                    rent your
                    vehicles!
                  </p>
                  <p style={{textAlign: 'justify'}}>
                    If you are in the vehicles rental business, you can expand your reach for new and
                    additional
                    customers after
                    creating a business account with us.
                  </p>
                  <p style={{textAlign: 'justify'}}>
                    Join Vumah today and start expanding your business via the services we provide on our
                    platform. Our
                    verified
                    users cannot wait to get in touch with you!
                  </p>
                  <p style={{textAlign: 'justify'}}>
                    The only thing you will need to start, as a business, is to provide your own insurance
                    cover for the
                    customers renting your vehicles through our platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="ready-host-main" data-aos="fade-up">
              <div className="container">
                <div className="ready-host-inner">
                  <div className="row mb-4">
                    <div className="col-lg-6">
                      <div className="service-step-content text-center text-lg-left">
                        <h2>Ready to host ?</h2>
                        <p style={{textAlign: 'justify'}}>
                          Create a listing thats lifts your hosting style - we'll give you tips to
                          make your
                          place shne.
                          start now and finish any time
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                      <a className="host-btn common-btn" href="#open-sign-up-modal" data-toggle="modal">HOST NOW</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <div className="commercial_sec">
        <div className="container">
          <h2>Commercial hosts</h2>

          <div className="commercailBx my-5 p-5 col-md-6">
            <p>
              Join our company platform and immediately access a large variety of customers waiting to rent your
              vehicles!
            </p>
            <p>
              If you are in the vehicles rental business, you can expand your reach for new and additional customers
              after creating a business account with us.
            </p>
            <p>
              Join Vumah today and start expanding your business via the services we provide on our platform. Our
              verified users cannot wait to get in touch with you!
            </p>
            <p>
              The only thing you will need to start, as a business, is to provide your own insurance cover for the
              customers renting your vehicles through our platform.
            </p>
          </div>
        </div>
      </div>
      <div className="headyHostsec my-5 p-3">
        <div className="container">
          <h2>Ready to host ?</h2>
          <p>
            Create a listing thats lifts your hosting style - we'll give you tips to make your place shne. start now and
            finish any time
          </p>
          <div
            className="host-btn common-btn text-black bg-white"
            data-toggle="modal"
            onClick={() =>
              onOpen(
                'Set up an account',
                <>
                  <RegisterForm />
                </>
              )
            }
          >
            HOST NOW
          </div>
        </div>
      </div>
    </>
  );
}
