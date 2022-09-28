import React from 'react';
import CareerBanner from '../../assets/img/career-banner.jpg';

export default function Career() {
  return (
    <>
      <section class="career-main position-relative padd-bottom-60">
        <div class="banner-slider">
          <img src={CareerBanner} alt="comapany value img" />
        </div>
      </section>

      <section class="join-us-main text-center mb-4 mb-md-5" data-aos="fade-up">
        <div class="container">
          <div class="service-header  mb-4">
            <h2>Join Us</h2>
          </div>
          <p style={{textAlign: 'justify'}}>Here at Vumah, we have become a bridge that allows everyone to be able to rent the right vehicle, helping
            them reach their ultimate travel experiences, via amazing hosts and businesses To that end, we aim to
            make exciting travels and great adventures as easily attainable as they should be.</p>
        </div>
      </section>

      <section class="vacancies-main">
        <div class="container">
          <div class="service-header text-center mb-4 mb-md-5" data-aos="fade-up">
            <h2>Vacancies</h2>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="1000">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Customer Support Agent</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="1300">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Account <br /> Executive</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="1600">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Business Operations Analyst</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="1900">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Digital Marketing Manager</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="2100">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Senior Marketing Copywriter</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="2400">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Senior Data <br /> Engineer</h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="2700">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#appy_now_popup">
                <h2>Senior Software Engineer (Backend)
                </h2>
                <p>0 Openings</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up" data-aos-duration="3000">
              <div class="vacancies-grid text-center" data-toggle="" data-target="#exampleModalLong">
                <h2>Recruiting Coordinator</h2>
                <p>0 Openings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="company-value-main">
        <div class="container">
          <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-7">
              <div class="company-value-text mb-5" data-aos="flip-left">
                <h2>Company values</h2>
                <p style={{textAlign: 'justify'}}>
                  Our team consists of individuals who are not only dedicated and committed to the vision of
                  Vumah but also enjoy the work that they do, creating change within the travel and tourism
                  industry. We believe in being of service to others to create the best possible experiences
                  for our community. Vumah’s largest focus with regards to its team is towards their personal
                  and professional development, helping them reach their full potential within the workplace,
                  and having a clear schedule and path to progression. If you believe you can create a
                  positive impact within Vumah we may have the right role for you!
                </p>
              </div>
            </div>
            <div class="col-lg-4"></div>
          </div>
        </div>
      </section>
    </>
  );
}
