import React from 'react';
import { Box, Button, Grid, Paper, SvgIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInDown, varFadeInLeft, varFadeInUp } from '../../components/animate';
import { Link, Link as RouterLink } from 'react-router-dom';

import BlogImage1 from '../../assets/img/blog-img-1.jpg';
import BlogImage2 from '../../assets/img/blog-img-2.jpg';

export default function BlogsList() {

  return (
    <>
      <section className='blog-main padd-bottom-60' data-aos='fade-up'>
        <div className='container'>
          <div className='service-header text-center mb-5'>
            <h2>Blogs</h2>
            <span className='header-underline'></span>
          </div>
          <div className='row'>
            <div className='col-lg-6 mb-4 mb-lg-0'>
              <div className='card blog-card-grid '>
                <div className='home-blog-img'>
                  <img src={BlogImage1} alt='blog-image' />
                </div>
                <div className='card-body justify-content-between d-flex flex-column'>
                  <div>
                    <h6> Top 5 places to visit in the UK</h6>
                    <p style={{ textAlign: 'justify' }}>
                      Looking for the next adventure in the UK? The UK is an easy place to explore
                      its
                      beautiful diversity, thanks to its size you can be based in any city such as
                      London
                      or
                      Manchester and simply take a car to explore other areas.
                      From the capital, you can drive 2hrs to reach the beautiful beaches of
                      Brighton, or
                      to
                      one of the country's most popular attractions, Stonehenge.
                    </p>
                  </div>
                  <div className='text-center mt-4'>
                    <Link className='common-btn' to='/blog-2'>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='card blog-card-grid'>
                <div className='home-blog-img'>
                  <img src={BlogImage2} alt='blog-image' />
                </div>
                <div className='card-body justify-content-between d-flex flex-column'>
                  <div>
                    <h6>Why Travel Is Important Today More Than Ever</h6>
                    <p style={{ textAlign: 'justify' }}>
                      Traveling is a very important part of life as it is the best way to get out
                      of the
                      busy
                      work life and a good remedy for stress, anxiety and depression. Improving
                      mental and
                      physical health. Not only does travelling provide the opportunity to
                      experience the
                      beauty of nature, different architectures and people, but it allows us to
                      explore
                      new
                      cultures, cuisines and styles of living.
                    </p>
                  </div>
                  <div className='text-center mt-4'>
                    <Link className='common-btn' to='/blog-1'>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
    ;
}