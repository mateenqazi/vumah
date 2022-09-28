import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function HostGuide() {
  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-3 support-sidebar">
            <div className="mb-3">
              <Link to="/covid#safe">
                Safe, clean vehicle sharing during COVID-19
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/covid#drivers">
                Drivers
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/covid#maintain">
                Maintain social distancing.
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/covid#give">
                Give the vehicle a clean
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/covid#hosts">
                Hosts (Car)
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/covid#socially">
                Socially distanced pickups (Car)
              </Link>
            </div>

            <div>
              <Link to="/covid#keep">
                Keep your vehicle clean between bookings (Car)
              </Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">
              <div className="col-12" id="general-questions">
                <h1 className="my-button">
                  Covid 19 Page
                </h1>
              </div>

              <div className="col-12 mt-4" id="safe">
                <h2>
                  Safe, clean vehicle sharing during COVID-19
                </h2>

                <p className="ml-4">
                  Safety has always been our number one priority and now, due to the current pandemic, it is even more important. In this post, there are instructions for both drivers and vehicle owners that will help keep you, and the Vumah community, protected.
                </p>
              </div>

              <div className="col-12 mt-4" id="drivers">
                <h2>
                  Drivers
                </h2>

                <p className="ml-4">
                  We have given our owners guidance on how to keep their vehicle clean and protect you as a driver whilst the risk of COVID-19 is still present but as a part of our community, we need you to do your part too. So what can you do?
                </p>

                <p className="ml-4">
                  First of all, let us know straight away if you test positive or develop symptoms when using or within 4 days of using a car. The hosts must quarantine the vehicle and make sure it is disinfected before any other drivers use it.
                </p>
              </div>

              <div className="col-12 mt-4" id="maintain">
                <h2>
                  Maintain social distancing.
                </h2>

                <p className="ml-4">
                  When picking up the vehicle (Check in) where possible you pick up the vehicle using your phone and don’t need to interact with the owner in person. If you do choose a key handover  then do a socially distanced handover. The owner should leave the key somewhere and move away before you collect it.
                </p>
              </div>

              <div className="col-12 mt-4" id="give">
                <h2>
                  Give the vehicle a clean
                </h2>

                <h6 className="my-button mb-3 mt-5">
                  Car
                </h6>

                <p className="ml-4">
                  We have asked our owners to leave wipes in their car for your use but it is always good to take your own to make sure. When entering the car, make sure you wipe down the common touch points:
                </p>
                <ul className="support-order-list">
                  <li style={{listStyle: 'disc'}}>
                    Door handles (In and out)
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Car key & glove box handles
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Steering wheel, gearstick & indicators
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Seat Belt hooks & clips
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Seat adjustment handles
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Window & wing mirror adjusters
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Rear view mirrors & visors
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Radio knobs & screens
                  </li>
                </ul>

                <p className="ml-4">
                  Most importantly, practice good hygiene throughout your trip. Wash your hands with soap and water for 20 seconds or if you’re not near a sink, use hand sanitizer before and after each time you use the car.
                </p>

                <h6 className="my-button mb-3 mt-5">
                  Other Vehicles
                </h6>

                <p className="ml-4">
                  Follow a similar safe practise to ensure the process is covid secure and maintain the best procedure for everyone.
                </p>
              </div>

              <div className="col-12 mt-4 mb-5" id="hosts">
                <h2>
                  Hosts (Car)
                </h2>

                <p className="ml-4">
                  With the UK government advocating the use of cars we are seeing a surge in demand & we need our hosts to do their bit in stopping the spread. Here are a few tips on sharing your car safely during the pandemic.
                </p>
                <p className="ml-4">
                  Let us know straight away if you have symptoms:
                </p>
                <ol className="support-order-list">
                  <li>
                    If you have used the car in the last 4 days and are unable to clean it: We will contact drivers and move them to another car. You won’t be charged any cancellation fees.
                  </li>
                  <li>
                    If you are self-isolating and haven’t used the car in the last 4 days, make sure you disinfect the key and do a shielded key handover by leaving the key out for the driver when they approach.
                  </li>
                </ol>
              </div>

              <div className="col-12 mt-4" id="socially">
                <h2>
                  Socially distanced pickups (Car)
                </h2>

                <p className="ml-4">
                  If you need to handover the car key, make sure you practice social distancing.
                </p>
              </div>

              <div className="col-12 mt-4" id="keep">
                <h2>
                  Keep your vehicle clean between bookings (Car)
                </h2>

                <p className="ml-4">
                  Here are a few tips on how to clean your car and protect your drivers:
                </p>
                <ul className="support-order-list">
                  <li style={{listStyle: 'disc'}}>
                    Protect yourself
                    <br />
                    Wear gloves to protect your hands from any harsh chemicals & avoid touching your face until you have washed your hands. Keep your windows and doors open whilst you are cleaning to make sure you don’t breathe in any harmful chemicals.
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Use a disinfectant:
                    <br />
                    Make sure your cleaning products are designed to kill viruses - natural ingredients don’t have the power to effectively remove coronavirus from surfaces so opt for something containing bleach. Watch out for your seats, some bleaches can damage your seat coverings so make sure you take extra care around leather and fabric.
                  </li>
                </ul>

                <p className="ml-4">
                  Focus on the major touch points:
                </p>
                <ul className="support-order-list">
                  <li style={{listStyle: 'disc'}}>
                    Door handles (In and out)
                  </li>
                  <li style={{listStyle: 'disc'}}>
                  Car key & glove box handles
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Steering wheel, gearstick & indicators
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Seat Belt hooks & clips
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Seat adjustment handles
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Window & wing mirror adjusters
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Rear view mirrors & visors
                  </li>
                  <li style={{listStyle: 'disc'}}>
                    Radio knobs & screens
                  </li>
                </ul>

                <p className="ml-4">
                  This isn’t to say the rest of your car doesn’t need a clean!
                </p>

                <p className="ml-4">
                  Remove dirt & dust: Viruses can hide on all surfaces, this includes dirt and dust so make sure you clean your car thoroughly. That includes vacuuming the carpets, seats and roof-lining. Top Tip: Use an old toothbrush to get into all those little hard to reach places.
                </p>

                <p className="ml-4">
                  Keep sanitizer or some wipes in your glove box: We ask all drivers to clean down the major touchpoints after their hire but if you leave some wipes they are more likely to clean the car and make sure it’s safe for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
