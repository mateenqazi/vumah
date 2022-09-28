import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function HostGuide() {
  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-3 support-sidebar">
            <div className="mb-3">
              <Link to="/faq#general-questions">
                General Questions
              </Link>
            </div>

            <div className="mb-3">
              <Link to="/faq#guest-support">
                Guest Support
              </Link>
            </div>

            <div>
              <Link to="/faq#host-support">
                Host Support
              </Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">
              <div className="col-12" id="general-questions">
                <h1 className="my-button">
                  General Questions
                </h1>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  What should I do to help prevent the spread of COVID-19?
                </h2>

                <p className="ml-4">
                  As the majority of customers are looking for alternative methods to public transportation at the moment, Vumah also want to promote a few fundamental health and safety safety measures to understand when sharing cars in your community:
                </p>
                <ol className="support-order-list">
                  <li>
                    Thoroughly clean and sanitize regularly touched surfaces.
                  </li>
                  <li>
                    Cover your cough and dispose of tissues.
                  </li>
                  <li>
                    Stay home if you are sick.
                  </li>
                </ol>
              </div>

              <div className="col-12 mt-4 mb-5" id="future">
                <h2>
                  What is Vumah doing to ensure that the vehicles I rent are safe from COVID-19?
                </h2>

                <p className="ml-4">
                  Vumah was launched on the principal of community, and as the coronavirus starts to affect the communities and cities we operate in, we wish to define the measures we are taking, in addition to some tips you can take, to maintain the safety for the people around you.
                </p>
                <ol className="support-order-list">
                  <li>
                    Up-to-date hygiene procedures.
                    <br />
                    We have published new hygiene and sanitation standards for all hosts and guests.
                  </li>
                  <li>
                    Vehicle isolation protocols.
                    <br />
                    Vumah has established new procedures to guarantee that, if we are notified a vehicle has been in contact with coronavirus, the vehicle will be put on pause, isolated from reservations, and deep cleaned prior to being active on the platform.
                  </li>
                </ol>

                <p className="ml-4">
                  The Vumah team will carry on monitoring the most recent notifications and advisories that the government publish to guarantee we are taking the relevant measures as the situation continues to develop.
                </p>
              </div>

              <div className="col-12" id="guest-support">
                <h1 className="my-button">
                  Guest Support
                </h1>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  What should I do in an accident?
                </h2>

                <p className="ml-4">
                  When in an accident and a person is injured, the first thing you must do is call 999. This is the most crucial action, as Vumah wants to make sure all individuals are safe. When all individuals are safe, notify your host and proceed with the following instructions, which will outline the necessary steps to handle the situation.
                </p>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  Can I extend my trip?
                </h2>

                <p className="ml-4">
                  If you are running late, be sure to extend your trip by selecting the "Request Extension" button on your active trip. It is crucial you return the vehicle prior to the end of your reservation. If you are going to be late and do not extend your trip, further charges may apply.  If you're not able to extend your trip unconditionally, you are required to return the vehicle back at the scheduled end time.
                </p>
              </div>

              <div className="col-12 mt-4 mb-5" id="future">
                <h2>
                  Do I have to refuel the vehicle exactly as the host did?
                </h2>

                <p className="ml-4">
                  Guests are liable to refuel during a trip according to the terms and conditions, view here. To attain maintaining track of fuel usage straightforward for all parties, Vumah encourages Guests to record the fuel levels and take a picture of the gauge at the start and end of every trip. These fuel levels and photos are presented on the trip receipt after the trip.
                </p>
              </div>

              <div className="col-12" id="host-support">
                <h1 className="my-button">
                  Host Support
                </h1>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  Are customers obligated to refuel?
                </h2>

                <p className="ml-4">
                  Vumah recommend maintaining a full tank whenever feasible. Doing so will help encourage your customers to refuel prior to returning your vehicle and makes it convenient for them to know how much fuel to replace. However, Vumah's terms and conditions states that fuel levels should always be at the half tank mark for both hosts and guests when returning or providing the vehicle. Furthermore, if a guest does not remember to refuel at the end of their trip, they will be charged a fee to compensate for the rest of the half tank as required. You can read more here.
                </p>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  I received a traffic ticket from a guest, what do I do?
                </h2>

                <p className="ml-4">
                  The vehicle host is liable for subsiding any Guest-sustained traffic tickets, citations, and violations to avoid further penalties due to late payment. Vumah will not compensate any penalties due to late payment. As soon as a payment has been made, kindly distribute a copy of the ticket and proof of payment via our help center for reimbursement.
                </p>

                <p className="ml-4">
                  If the ticket is for a moving violation, such as going through a red light at a photo-enforced traffic junction, Vumah will sign an Affidavit of Non-Liability on your behalf and reassign the ticket to your Guest at the time of reservation. As the host of the vehicle, a Guest-incurred ticket will never affect your insurance or driving record. 
                </p>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  When will I get paid?
                </h2>

                <p className="ml-4">
                  The Host will receive their pay out the following 1-3 business days after the trip has been completed. Hosts and Guests must ensure that they have been checked out to ensure that the vehicle has been returned for payment to process. You can change your account for pay out at any time through your Vumah account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
