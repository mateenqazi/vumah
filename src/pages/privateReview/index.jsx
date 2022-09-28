/* eslint-disable */
import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import ReviewBg from '../../assets/img/public-review-bg.jpg';
import CompanyReview from '../../assets/img/company-review-img.jpg';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import CustomerReview from '../../assets/img/customer-review-img-1.png';
import SecurityImage from '../../assets/img/security.png';


export default function PrivateReview() {
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [openSharePopover, setOpenSharePopover] = useState(false);

  return (
    <section className="public-review-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="company-product-info mb-5" data-aos="fade-up">

          <div className="public-review-bg position-relative">
            <img src={coverImage ? coverImage : ReviewBg} alt="review-bg" className="profile-pic" />
            <div className="p-image">
              <label htmlFor="cover-image" className="mb-0 pointer">
                <i className="fa fa-camera upload-button"></i>
              </label>
              <input id="cover-image" className="file-upload" type="file" accept="image/*" onChange={onCoverImageChange} />
            </div>
          </div>
          <div className="p-4 mx-2 mb-2">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <div
                  className="company-review d-flex mb-3 justify-content-center justify-content-md-start align-items-center">
                  <h2>40 Reviews</h2>
                  <ul className="d-flex ml-2">
                    <li className="active"><i className="fas fa-star"></i></li>
                    <li className="active"><i className="fas fa-star"></i></li>
                    <li className="active"><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                  </ul>
                </div>
                <div className="level-four d-flex justify-content-center justify-content-md-start align-items-center">
                  <img src={SecurityImage} alt="Security Image" className="margin-right-ten" />

                  <h2>Level 4 host</h2>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="company-info-center">
                  <div className="company-review-img mb-3 position-relative">
                    <img src={profileImage ? profileImage : CompanyReview} alt="company-review-img" className="profile-car" />

                    <div className="p-image">
                      <label htmlFor="profile-image" className="mb-0 pointer">
                        <i className="fa fa-camera car-upload-button"></i>
                      </label>
                      <input id="profile-image" className="car-file-upload" type="file" accept="image/*" onChange={onProfileImageChange} />
                    </div>
                  </div>
                  <h2>Name of company </h2>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                <div className="company-info-right pl-5 ">
                  <p> <i className="fas fa-check-circle margin-right-five"></i> Avg response time 25hrs</p>
                  <p> <i className="fas fa-clock margin-right-five"></i>99% response rate</p>
                  <p id="share-popover" className="pointer"> <i className="fas fa-share-alt margin-right-five pointer"></i>Share Profile</p>
                  <Popover placement="bottom" isOpen={openSharePopover} target="share-popover" toggle={toggleSharePopover} className="blog-card-grid blog-card-grid--popover" style={{maxWidth:'500px'}}>
                    <PopoverBody>
                      <h5 className="mb-3 ml-0 pl-0" style={{marginLeft: 0 }}>
                        Share
                      </h5>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <WhatsappShareButton url={window.location} style={{marginRight: '20px' }}>
                          <WhatsappIcon size={64} round />
                          <p>WhatsApp</p>
                        </WhatsappShareButton>
                        <FacebookShareButton url={window.location} style={{marginRight: '20px' }}>
                          <FacebookIcon size={64} round />
                          <p>Facebook</p>
                        </FacebookShareButton>
                        <TwitterShareButton url={window.location} style={{marginRight: '20px' }}>
                          <TwitterIcon size={64} round />
                          <p>Twitter</p>
                        </TwitterShareButton>
                        <EmailShareButton url={window.location}>
                          <EmailIcon size={64} round />
                          <p>Email</p>
                        </EmailShareButton>
                      </div>
                      <div style={{display: 'flex', position: 'relative'}} className="mt-3">
                        <input
                          type="text" readOnly={true}
                          className="form-control"
                          placeholder="URL"
                          defaultValue={window.location}
                          style={{
                            cursor: 'pointer',
                            paddingRight: '95px'
                          }}
                          onClick={(e) => {
                            e.target.select();
                            document.execCommand('copy');
                          }}
                        />
                        <span style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontWeight: '600',
                          cursor: 'pointer',
                          pointerEvents: 'none'
                        }}>
                          COPY LINK
                        </span>
                      </div>
                    </PopoverBody>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="company-info">
              <p style={{textAlign: 'justify'}}>I am self employed and mainly work in London as a property management consultant. I
                fell in love with The Old School House while I was studying Zen Meditation in the Lake
                District
                The house is now my second home and provides a peaceful rural retreat. Set in the UNESCO
                world
                heritage National Park it’s lovely to be able to share such a unique place with you.</p>
            </div>
          </div>
        </div>
        <div className="service-header  mb-4" data-aos="fade-up">
          <h2>Listings</h2>
        </div>
        <div className="company-product-listing mb-5" data-aos="fade-up">
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="company-product-list-grid">
                <div className="company-product-list-img">
                  <img src={Mercedes} alt="mercedes-car" />
                </div>
                <div className="comapany-card-body">
                  <h2>Mercedes-Benz S-className 2018</h2>
                  <ul className="car-grid-tag">
                    <li>ATM </li>
                    <li>Electric</li>
                    <li>Bluetooth</li>
                    <li>+3</li>
                  </ul>
                  <div className="comapany-card-footer d-flex justify-content-between mt-4 pt-2">
                    <span className="heart-review"><i className="fas fa-heart"></i></span>
                    <h2>£100/day(£24/hr)</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="company-product-list-grid">
                <div className="company-product-list-img">
                  <img src={Mercedes} alt="mercedes-car" />
                </div>
                <div className="comapany-card-body">
                  <h2>Mercedes-Benz S-className 2018</h2>
                  <ul className="car-grid-tag">
                    <li>ATM </li>
                    <li>Electric</li>
                    <li>Bluetooth</li>
                    <li>+3</li>
                  </ul>
                  <div className="comapany-card-footer d-flex justify-content-between mt-4 pt-2">
                    <span className="heart-review"><i className="fas fa-heart"></i></span>
                    <h2>£100/day(£24/hr)</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="company-product-list-grid">
                <div className="company-product-list-img">
                  <img src={Mercedes} alt="mercedes-car" />
                </div>
                <div className="comapany-card-body">
                  <h2>Mercedes-Benz S-className 2018</h2>
                  <ul className="car-grid-tag">
                    <li>ATM </li>
                    <li>Electric</li>
                    <li>Bluetooth</li>
                    <li>+3</li>
                  </ul>
                  <div className="comapany-card-footer d-flex justify-content-between mt-4 pt-2">
                    <span className="heart-review"><i className="fas fa-heart"></i></span>
                    <h2>£100/day(£24/hr)</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="car-rating-main" data-aos="fade-up">
          <h2><i className="fas fa-star mr-2"></i>5.0 (31 Reviews)</h2>
          <div className="car-people-rating mb-4">
            <div className="rated-person-info d-flex mb-2 align-items-center">
              <div className="rated-person-img margin-right-ten">
                <img src={CustomerReview} alt="rated-person" />
              </div>
              <div className="rated-person-info">
                <h2>Karen</h2>
                <p>January 2021</p>
              </div>
            </div>
            <p>Great guy and great car! Could not be more pleased. Thank you!</p>
          </div>
          <div className="car-people-rating">
            <div className="rated-person-info d-flex mb-2">
              <div className="rated-person-img margin-right-ten">
                <img src={CustomerReview} alt="rated-person" />
              </div>
              <div className="rated-person-info pl-3">
                <h2>Alex</h2>
                <p>January 2021</p>
              </div>
            </div>
            <p>Great Car, and great hosts! Stephen was very accommodating and very flexible.
              Would 10/10 rent again!
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  function onCoverImageChange(e) {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  function onProfileImageChange(e) {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  function toggleSharePopover() {
    setOpenSharePopover(!openSharePopover);
  };
}
