import React from 'react';

export default function About() {
  return (
    <div className="container-landing">
      <section className="empty">
        <div className="text-container-landing">
          <h1 className="text-center">About us</h1>
          <div className="about-text">
            <p className="lead" style={{textAlign: 'justify'}}>
              We provide a vehicle rental host platform that enables tourists to truly enjoy the journey
              to
              their
              destination. We want to give you the freedom of renting a vehicle efficiently and with ease.
              You
              can
              easily
              book a car, motorcycle, or even a bicycle from our trusted and verified hosts.
            </p>

            <p className="lead" style={{textAlign: 'justify'}}>
              We make sure our customers have a great experience every time they rent with us and enjoy
              driving on
              their
              own. Regardless of your travel itinerary, you can choose from a fleet of cars, motorcycles,
              and
              bicycles
              and
              begin your adventure.
            </p>

            <p className="lead" style={{textAlign: 'justify'}}>
              Also, we allow car, bicycle, and motorcycle rental businesses to list their vehicles with
              us. We
              provide
              growth and diversification options to such rental businesses. We will provide specifications
              whether
              it
              is
              rented by an individual or rental agency. Choose as per your need and choice.
            </p>

            <p className="lead" style={{textAlign: 'justify'}}>
              Hosts can become a part of our ever-growing community and earn extra money by renting out
              their
              vehicles. Our platform is user friendly, secure, and ensures the best experience for renting
              vehicles.
            </p>
          </div>
        </div>
      </section>
      <section className="car pt-5">
        <div className="text-container-landing vehicle-text-container">
          <div className="text-container-landing-inner">
            <h1>Cars</h1>
            <p className="lead" style={{textAlign: 'justify'}}>Whether you need a luxurious car for a trip through the city or a sturdy one for
              mountain roads, we’ve got you covered. Pick from our impressive range of cars as per your needs
              and
              easily embark on your journey. Our car rental platform will ensure a smooth journey!</p>
          </div>
        </div>
      </section>
      <section className="motorbike">
        <div className="text-container-landing vehicle-text-container">
          <div className="text-container-landing-inner">
            <h1>Motorcycles</h1>
            <p className="lead" style={{textAlign: 'justify'}}>If you’re a bike lover and want to roam around the city on a bike, you can easily
              rent a
              motorcycle with us. The Vumah platform will help you to choose your favorite bike and let
              you
              explore every nook and corner of your travel destinations.</p>
          </div>
        </div>
      </section>

      <section className="Campervans">
        <div className="text-container-landing vehicle-text-container">
          <div className="text-container-landing-inner">
            <h1>Campervans</h1>
            <p className="lead" style={{textAlign: 'justify'}}>
              Whether it's a holiday with the family, a weekend away with friends, or doing a festival in style, the platform helps you find the perfect campervan for your adventure. They are set up and ready to go with everything you need
            </p>
          </div>
        </div>
      </section>
      <section className="bike">
        <div className="text-container-landing vehicle-text-container">
          <div className="text-container-landing-inner">
            <h1>Even Bicycles</h1>
            <p className="lead" style={{textAlign: 'justify'}}>Bicycles are convenient and let you tackle the busy routes easily. Ride through fields or brave challenging mountain terrains to
              give
              you an unforgettable cycling experience. Don’t wait any longer - Unleash the free spirit in you
              by
              easily renting your preferred bicycle with us. </p>
          </div>
        </div>
      </section>
    </div>
  );
}
