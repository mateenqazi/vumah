import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function HostGuide() {
  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-4 support-sidebar">
            <div className="mb-3">
              <Link to="/host-guide#vehicle-not-returned-in-right-state">
                Would Vumah handle my charges if my vehicle has not been returned in the right state?
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#create-a-listing">Creating a listing and how to stand out</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#host-rankings-and-performance">Host rankings and performance standards</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#overview-of-fees-credits-bills">Overview of fees, credits, and bills</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#report-an-issue">Report an issue with a renter</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#late-return">What happens if my guest returns the vehicle late?</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#cancel-booking">How do I cancel a booking?</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#sales-tax-and-vat">Does Vumah charge hosts with VAT and Sales Tax?</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#how-payments-work">How payments work</Link>
            </div>
            <div className="mb-3">
              <Link to="/host-guide#request-to-remove-review">How do I request to remove a review?</Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">
              {/* Would Vumah handle my charges if my vehicle has not been returned in the right state? */}
              <div className="col-12" id="vehicle-not-returned-in-right-state">
                <h2>Would Vumah handle my charges if my vehicle has not been returned in the right state?</h2>
                <p className="ml-4">
                  For additional charges such as lack of fuel or returning the vehicle in an inappropriate state the
                  hosts can charge the guest with “additional payments”. Here you can outline the charges for the guest,
                  which the guest can either accept or dispute if they believe that the charges are unfair. If both
                  dispute the additional payments, Vumah will be involved and handle the decision. Please ensure images
                  are taken before and after the trip to further back your case in your favor.
                </p>
              </div>
              {/* Would Vumah handle my charges if my vehicle has not been returned in the right state? */}

              {/* Creating a listing and how to stand out */}
              <div className="col-12 mt-4" id="create-a-listing">
                <h2>Creating a listing and how to stand out</h2>
                <p className="ml-4">
                  The first step in getting your vehicles in front of guests is to create a listing, and finding a way
                  to stand out so you can get bookings by following these steps:
                </p>
                <ol className="support-order-list">
                  <li>
                    <p className="text-underline mb-0">Give a detailed description of your vehicle</p>
                    List fundamental information about your vehicle, such as the number of seats and needed fuel type,
                    as well as features that distinguish your vehicle, such as a sunroof or all-wheel drive, using the
                    structured choices. Because guests may filter by feature, including all the elements will help your
                    listing and boost its discoverability.
                  </li>
                  <li>
                    <p className="text-underline mb-0">Create a one-of-a-kind description</p>
                    To entice guests to reserve your vehicle, tell them about your cleaning routine, exciting local
                    drives, and any other intriguing behind-the-scenes information. Make sure your description is long
                    enough as longer descriptions get a boost in search results!
                  </li>
                  <li>
                    <p className="text-underline mb-0">Great pictures</p>
                    Include images of both the interior and exterior of your car, with a great background to make your
                    vehicle stand out.
                  </li>
                  <li>
                    <p className="text-underline mb-0">Set your availability</p>
                    The availability calendar is perhaps the most critical parameter for new and experienced hosts to
                    update regularly.
                    <br />
                    Block off the days when your vehicle is unavailable so that you can only do journeys that fit your
                    schedule. Maintaining an up-to-date calendar will help you avoid canceling Bookings and maintain
                    excellent performance metrics, allowing you to pursue level 5 Host status.
                  </li>
                </ol>
              </div>
              {/* Creating a listing and how to stand out */}

              {/* Host rankings and performance standards */}
              <div className="col-12 mt-5" id="host-rankings-and-performance">
                <h2>Host rankings and performance standards</h2>
                <p>
                  One of our major responsibilities is ensuring that all our hosts provide excellent service to our
                  guests. Our host ranking system helps you keep track of your progress and comes with additional
                  benefits.
                </p>
                <p>
                  When a host first signs up with Vumah they start as a level 0 Host. There are 5 levels, each dependent
                  on the number of booking days the host manages to reach within the month with each level having its
                  perks/rewards!
                </p>{' '}
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you can move up multiple levels at any time within the month.
                </p>
              </div>
              {/* Host rankings and performance standards */}

              {/* Overview of fees, credits, and bills */}
              <div className="col-12 mt-5" id="overview-of-fees-credits-bills">
                <h2>Overview of fees, credits, and bills</h2>
                <p>
                  The fees we charge after a booking are mostly determined by the overall cost of the trip, which we
                  deduct automatically as we hold your funds until the end of the trip. You will see the fees and VAT we
                  have deducted on your “Earnings” page, which displays the full details where you can download all your
                  invoices.
                </p>
              </div>
              {/* Overview of fees, credits, and bills */}

              {/* Report an issue with a renter */}
              <div className="mt-5" id="report-an-issue">
                <h2>Report an issue with a renter</h2>
                <p>
                  Let us know if you are having trouble with a guest who is not following our guidelines, and we'll look
                  into it.
                </p>
                <p>When should you report a guest?</p>
                <p>
                  Only report a guest if you believe they are breaking one of our policies. Here are some examples of
                  when it is appropriate to report a buyer:
                </p>
                <ol className="support-order-list">
                  <li>You suspect the guest is lying about something.</li>
                  <li>You suspect the guest is using a false identity.</li>
                  <li>They have asked to book the vehicle outside the platform.</li>
                  <li>Harassment</li>
                  <li>The guest has mistreated your vehicle (smoking, left rubbish, etc).</li>
                </ol>
              </div>
              {/* Report an issue with a renter */}

              {/* What happens if my guest returns the vehicle late? */}
              <div className="col-12 mt-5" id="late-return">
                <h2>What happens if my guest returns the vehicle late?</h2>
                <p>
                  Guests have a 15-minute grace period to return the vehicle, after this the guest will be charged 1.5x
                  the hourly rate of the vehicle until the vehicle has been returned and both parties have checked out.
                  After the trip has been completed, Vumah will withdraw its fees and send the payout to the bank
                  account you have provided (including the late fees which have been charged) to the host on the
                  following business day. If there has been no response from the guest after an hour of the trip end,
                  contact the Vumah Support team and we will.
                </p>
              </div>
              {/* What happens if my guest returns the vehicle late? */}

              {/* How do I cancel a booking? */}
              <div className="col-12 mt-5" id="cancel-booking">
                <h2>How do I cancel a booking?</h2>
                <p>
                  Hosts can cancel their booking for free before 24 hours of the trip start by simply clicking the
                  “cancel booking” button shown on the bottom of the booking details. If the host cancels within 24
                  hours of the booking trip, the host will receive a strike, due to the inconvenience caused to the
                  other party. If you want to know more about our policies regarding strikes and penalties, please{' '}
                  <span className="text-underline">click here</span>.
                </p>
              </div>
              {/* How do I cancel a booking? */}

              {/* Does Vumah charge hosts with VAT and Sales Tax? */}
              <div className="col-12 mt-5" id="sales-tax-and-vat">
                <h2>Does Vumah charge hosts with VAT and Sales Tax?</h2>
                <p>
                  Vumah is obliged to collect VAT on its service fees in countries that tax electronically supplied
                  services which include the UK.
                </p>
                <p>
                  Vumah is not required to collect sales tax within the UK, if you need information regarding taxes,
                  please get in touch with your nearest local tax offices or tax advisors as to what your specific tax
                  consequences are.
                </p>
              </div>
              {/* Does Vumah charge hosts with VAT and Sales Tax? */}

              {/* How payments work */}
              <div className="col-12 mt-5" id="how-payments-work">
                <h2>How payments work</h2>
                <p>
                  Once a booking has been approved, Vumah will hold the funds until the end of the trip. Vumah will
                  first withdraw their fees from the payments that are on hold, and then transfer the funds to the
                  account provided on the following business day. Transfers can take up to 1-3 days to be processed,
                  depending on the bank with which the account is. To see what payments are on hold and which have been
                  processed, just go to your earnings page which will provide you with all the details.
                </p>
              </div>
              {/* How payments work */}

              {/* How do I request to remove a review? */}
              <div className="col-12 mt-5" id="request-to-remove-review">
                <h2>How do I request to remove a review?</h2>
                <p>
                  We understand that both parties may have different opinions about their experience during a trip and
                  that this may lead to misunderstandings. Due to these reasons, reviews are not removed unless:
                </p>
                <ol className="support-order-list">
                  <li>Both parties do not agree with the events which took place.</li>
                  <li>
                    One of the parties has complained and believes that the review is unfair, which in this case Vumah
                    will review the request of removal and decide based on the information provided.
                  </li>
                </ol>
              </div>
              {/* How do I request to remove a review? */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
