import React, { useState } from 'react';

import Image1 from '../../assets/img/about/1.png'
import Image21 from '../../assets/img/car3.png'
import Image22 from '../../assets/img/motorbike3.png'
import Image23 from '../../assets/img/campervans-2.png'
import Image24 from '../../assets/img/bike1.png'
import Image3 from '../../assets/img/about/3.png'

import Icon1 from '../../assets/img/about/icon-1.png'
import Icon2 from '../../assets/img/about/icon-2.png'
import Icon3 from '../../assets/img/about/icon-3.png'
import Icon4 from '../../assets/img/about/icon-4.png'

export default function About() {
  const [selected, setSelected] = useState('cars');

  return (
    <div className="about-section" style={{ width: '100%' }}>
      <div className="about-banner mb-5">
        <div className="container d-flex" style={{ alignItems: 'flex-start', flexDirection: 'column', height: 'inherit', justifyContent: 'center' }}>
          <h1 className="mb-2" style={{ color: '#fff', fontSize: '38px', lineHeight: 1 }}>
            About Us
          </h1>
        </div>
      </div>
      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6">
            <img src={ Image1 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6">
            <h2>Who We Are</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              We provide a vehicle rental host platform that enables tourists to truly enjoy the journey to their destination. We want to give you the freedom of renting a vehicle efficiently and with ease. You can easily book a car, motorcycle, or even a bicycle from our trusted and verified hosts.
            </p>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              We make sure our customers have a great experience every time they rent with us and enjoy driving on their own. Regardless of your travel itinerary, you can choose from a fleet of cars, motorcycles, and bicycles and begin your adventure.
            </p>

            <p style={{ textAlign: 'justify' }}>
              Hosts can become a part of our ever-growing community and earn extra money by renting out their vehicles. Our platform is user friendly, secure, and ensures the best experience for renting vehicles.
            </p>
          </div>
        </div>
      </div>
      <div className="container py-5 text-center">
        <h2 className="mx-auto">Find Your Drive</h2>

        <div className="my-4 mx-auto" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

        <p className="mb-3 mx-auto" style={{ maxWidth: '930px' }}>
          Also, we allow car, bicycle, and motorcycle rental businesses to list their vehicles with us. We provide growth and diversification options to such rental businesses. We will provide specifications whether it is rented by an individual or rental agency. Choose as per your need and choice.
        </p>
      </div>
      <div className="container-fluid py-5 update">
        <div className="grid row">
          <div className="col-12 col-lg-5 p-5">
            <img
              src={
                selected === 'cars'
                  ? Image21
                  : selected === 'motorcycles'
                    ? Image22
                    : selected === 'campervans'
                      ? Image23
                      : Image24
              }
              width="100%"
              height="100%"
              style={{ objectFit: 'contain', maxHeight: '475px' }}
            />
          </div>
          <div className="col-12 col-lg-1 p-0 about-selector-container" style={{ display: 'flex' }}>
            <div
              className={ `about-selector ${ selected === 'cars' ? 'about-selector--active' : '' }` }
              onClick={() => {setSelected('cars')}}
            >
              <img src={ Icon1 } />
              <h6>Cars</h6>
            </div>
            <div
              className={ `about-selector ${ selected === 'motorcycles' ? 'about-selector--active' : '' }` }
              onClick={() => {setSelected('motorcycles')}}
            >
              <img src={ Icon2 } />
              <h6>Motorcycles</h6>
            </div>
            <div
              className={ `about-selector ${ selected === 'campervans' ? 'about-selector--active' : '' }` }
              onClick={() => {setSelected('campervans')}}
            >
              <img src={ Icon3 } />
              <h6>Campervans</h6>
            </div>
            <div
              className={ `about-selector ${ selected === 'bicycles' ? 'about-selector--active' : '' }` }
              onClick={() => {setSelected('bicycles')}}
            >
              <img src={ Icon4 } />
              <h6>Bicycles</h6>
            </div>
          </div>
          <div className="col-12 col-lg-6 p-5" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textTransform: 'capitalize' }}>{ selected }</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>
              {
                selected === 'cars' 
                  ? <p>
                      Whether you need a luxurious car for a trip through the city or a sturdy one for mountain roads, we’ve got you covered. Pick from our impressive range of cars as per your needs and easily embark on your journey. Our car rental platform will ensure a smooth journey!
                    </p>
                  : selected === 'motorcycles'
                    ? <p>
                        If you’re a bike lover and want to roam around the city on a bike, you can easily rent a motorcycle with us. The Vumah platform will help you to choose your favorite bike and let you explore every nook and corner of your travel destinations.
                      </p>
                    : selected === 'campervans'
                      ? <p>
                          Whether it's a holiday with the family, a weekend away with friends, or doing a festival in style, the platform helps you find the perfect campervan for your adventure. They are set up and ready to go with everything you need
                        </p>
                      : <p>
                          Bicycles are convenient and let you tackle the busy routes easily. Ride through fields or brave challenging mountain terrains to give you an unforgettable cycling experience. Don’t wait any longer - Unleash the free spirit in you by easily renting your preferred bicycle with us.
                        </p>
              }
            </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-5" style={{ position: 'relative' }}>
            <div className="about-abs-here p-5" style={{ color: '#fff', background: '#F67810' }}>
              <h2 style={{ color: '#fff' }}>Company mission</h2>

              <div className="my-4" style={{ background: '#fff', display: 'block', height: '2px', width: '85px' }}></div>

              <p>
                Our mission is to become a bridge between vehicle owners and travelers/tourists to make booking a vehicle as safe, easy, and as efficient as it should be.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <img className="mb-5" src={ Image3 } width="100%" height="auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
