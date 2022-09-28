import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Typography } from '@mui/material';

export default function GuestGuide() {
  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-3 support-sidebar">
            <div className="mb-3">
              <Link to="/guest-guide#getting-started-with-vumah">Getting Started with Vumah</Link>
            </div>

            <div className="mb-3">
              <Link to="/guest-guide#trouble-with-booking">Trouble with your booking</Link>
            </div>

            <div className="mb-3">
              <Link to="/guest-guide#guest-fees">Guest Fees</Link>
            </div>

            <div className="mb-3">
              <Link to="/guest-guide#breakdown">Breakdown</Link>
            </div>

            <div className="mb-3">
              <Link to="/guest-guide#account-safety">Keeping your account safe</Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">
              <div className="col-12">
                <Typography component="snap" variant="h3" sx={{ mb: 8, fontWeight: '500', fontSize: '2rem' }}>
                  Getting Started with Vumah
                </Typography>
                <h2>Join the Vumah Community</h2>
                <p className="ml-4">
                  If you have not signed up to the Vumah platform yet, go www.vumah.com and click Sign Up found in the
                  drop-down menu. After you sign up, you will only be able to reserve a vehicle once your account
                  information has been completed and verified. The following steps will outline what is required before
                  you can finally start your adventure!
                </p>
                <ol className="support-order-list">
                  <li>Select an account (Individual) or (business).</li>
                  <li>Before you book a vehicle, make sure to get approved.</li>
                  <li>
                    To keep everyone safe, most of the guests will go through the approval process, and usually,
                    verification takes at least 24 hours.
                  </li>
                  <li>Review the approval status on your account before booking a vehicle.</li>
                  <li>Once you are approved, look for the vehicle of your choice.</li>
                </ol>

                <h2 className="mt-5">Search for a suitable vehicle</h2>
                <p className="ml-4">
                  Choosing a suitable vehicle might not always be the easiest thing. Especially when there are a lot of
                  options to choose from on our platform. You can filter your choice, simply by following the steps
                  below:
                </p>
                <ol className="support-order-list">
                  <li>
                    Choose a vehicle type, then search for a city or a postcode, and enter a suitable date/time. After
                    that click search.
                  </li>
                  <li>
                    A list of vehicles will come up on the results page for you to choose from. Even if you have not
                    found the right vehicle, there are other vehicles nearby to choose from. You can also see vehicle
                    location on the map.
                  </li>
                  <li>Go ahead and book a vehicle.</li>
                </ol>

                <h2 className="mt-5">Booking your vehicle</h2>
                <p className="ml-4">
                  <span className="text-underline">Pick Up & return location:</span> Once a booking has been made, you
                  can then contact the host of the vehicle reserved and choose the best pick up & return location that
                  suits you both.
                </p>
                <p className="ml-4">
                  <span className="text-underline">Date of your Trip:</span> Choose your trip’s start and end time, from
                  the calendar and hours based on the same day. Your trip’s cost is based on the trip’s length and other
                  factors depending on the features provided by the host. Changing the start and end times might change
                  the overall cost of your trip. Note: A vehicle can only be reserved for a minimum of 6 hours per
                  request.
                </p>
                <p className="ml-4">
                  <span className="text-underline">Cancellation policy:</span> There is a free cancellation policy if
                  the guest has canceled their trip before 24 hours of the trip start time. If a trip has been canceled
                  within the 24-hour window before the trip’s start time, then a cancelation fee may incur.
                </p>

                <h2 className="mt-5">Picking Up the Vehicle</h2>
                <p className="ml-4">
                  <b>Motor vehicle:</b> <br />
                  Bring your permanent driver’s license when you come to pick up the car. Your host cannot give you the
                  car if you do not present them with a valid license.
                </p>
                <p>When you check-in: Document the vehicle’s condition, mileage, and fuel.</p>
                <p>Make sure to take photos, so we can support you in case of a reimbursement dispute.</p>
                <p className="ml-4">
                  <b>Bicycle:</b> <br />
                  Bring your provisional or permanent driver’s license when you come to pick up the bicycle. Your host
                  cannot give you the bicycle if you do not present them with a valid license.
                </p>
                <p>When you check-in: Document the vehicle’s condition, mileage (if eligible), and fuel.</p>
                <p>Make sure to take photos, so we can support you in case of a reimbursement dispute.</p>

                <h2 className="mt-5">Returning the vehicle</h2>
                <p className="ml-4">
                  You are responsible for returning the vehicle in the same condition in which you received it. You can
                  document a vehicle by taking a photo, video, or any other suitable way.
                </p>
                <p>When you check out: Take photos, document the vehicle’s condition, mileage, and fuel.</p>
                <p>
                  <b>Note:</b> After the trip, you will be able to leave a review about your trip and your host will
                  also be able to review you as a guest.
                </p>
              </div>
              {/* join vumah community */}

              {/* 2.	Trouble with your booking: */}
              <div className="col-12 mt-5" id="trouble-with-booking">
                <div className="support-search-main text-center mb-4 mt-5" style={{ marginLeft: 0, marginRight: 0 }}>
                  <h2>Trouble with your booking:</h2>
                </div>
              </div>
              <div className="col-12">
                <h2>Host didn’t show up</h2>
                <p className="ml-4">
                  Has the host not shown up? When you arrive to pick up the vehicle and your host or the vehicle is not
                  there, follow these guidelines:
                </p>
                <ol className="support-order-list">
                  <li>Check the address: Open your trip details and confirm that you are at the right location.</li>
                  <li>
                    Check your Vumah messages to see if your host sent you any additional information about the
                    vehicle’s location.
                  </li>
                  <li>Check the time: If you arrived early or on time.</li>
                  <li>Contact your host: Send a message to your host via Vumah or try to call your host.</li>
                </ol>

                <h2 className="mt-5">Vehicle unsafe or unsatisfactory</h2>
                <p className="ml-4">
                  When you meet your host in person, ask them to wait while you walk around the vehicle to check inside
                  (depending on the vehicle type), outside, take pre-trip photos, and check the state of the vehicle in
                  general.
                </p>
                <ol className="support-order-list">
                  <li>
                    Contact Vumah Support immediately and do not check-in if you have concerns about the vehicle’s
                    cleanliness and sanitization.
                  </li>
                  <li>
                    Speak to the host immediately and communicate your concerns, if you feel that the vehicle is unsafe
                    or in an illegal state to be driven.
                  </li>
                </ol>

                <h2 className="mt-5">Extending your trip</h2>
                <p className="ml-4">
                  You can change the end time of your trip to keep the vehicle longer. To do that, you must submit a
                  request via Vumah before the trip starts or while it is in progress. You will be unable to submit via
                  the system once the trip has ended. A trip change is only valid if you make the request through Vumah
                  and your host approves it.
                </p>
                <p className="ml-4">
                  Furthermore, if you extend your trip without approval via the Vumah platform, we may charge you a late
                  return fee. If you make an unapproved early return, we will be unable to refund you for any unused
                  trip time.
                </p>

                <h2 className="mt-5">Late returns</h2>
                <p className="ml-4">If you need more time for your trip, notify the host and request an extension.</p>
                <ol className="support-order-list">
                  <li>
                    <b>What happens if the guest is running late for the check-in?</b> If you’re running late for
                    check-in, let the host know via Vumah. The guest should arrive on time at the start of the booking
                    to pick up the vehicle from the host. If running late, communication must be made with the host via
                    the Vumah platform.
                  </li>
                  <li>
                    <b>What happens if the guest returns the vehicle late?</b> Guests have a 15-minute grace period to
                    return the vehicle, after this, the guest will be charged 1.5x the hourly rate of the vehicle until
                    the vehicle has been returned providing that both parties (host and guest) have checked out.
                  </li>
                </ol>
              </div>
              {/* 2. Trouble with your booking: */}

              {/* 3. Guest Fees */}
              <div className="col-12 mt-5" id="guest-fees">
                <div className="support-search-main text-center mb-4 mt-5" style={{ marginLeft: 0, marginRight: 0 }}>
                  <h2>Guest Fees</h2>
                </div>
              </div>
              <div className="col-12">
                <h2>Avoiding additional charges</h2>
                <p className="ml-4">
                  To avoid additional charges, make sure you read through our terms and conditions carefully, read the
                  requirements when making a reservation and understand the does and do not as following:
                </p>
                <ol className="support-order-list">
                  <li>
                    If you cancel within 24 hours of the journey unless due to unforeseen circumstances (e.g lockdown),
                    the guest will get charged 25% of the daily rate of the vehicle.
                  </li>
                  <li>
                    If the vehicle has not been returned by the state it was originally delivered to, the fees will
                    depend on the severity of the state it was brought back.
                  </li>
                  <li>
                    You are encouraged to take a picture of the fuel gauge or electric charge before and after the
                    return of the vehicle. This will help avoid any misunderstandings if the host sends a complaint. If
                    the host has sent a complaint explaining that the fuel or charge is not at least half and is proven,
                    there will be a flat fee of £50.
                  </li>
                  <li>
                    Tickets and tolls shall be covered by the guest during the duration of the journey if the guest is
                    liable.
                  </li>
                  <li>
                    Guest no show, the guest will not receive their deposit back unless they have provided a valid
                    reason/proof for mitigating circumstances for not showing up.
                  </li>
                  <li>Additional mileage depends on how much the host is willing to charge.</li>
                  <li>
                    Cleaning policy- You, the guest, will be responsible for the cost of cleaning the vehicle provided
                    to you by the host at the time of reservation. If a host reports the need for cleaning, and the
                    request is approved by Vumah, it is in Vumah’s reasonable discretion and reserves the right to
                    facilitate payment for the reasonable cost of the cleaning charge on behalf of the host using your
                    payment method designated in your account.
                  </li>
                </ol>
              </div>
              {/* 3. Guest Fees */}

              {/* 4.	Breakdown */}
              <div className="col-12 mt-5" id="breakdown">
                <div className="support-search-main text-center mb-4 mt-5" style={{ marginLeft: 0, marginRight: 0 }}>
                  <h2>Breakdown</h2>
                </div>
              </div>
              <div className="col-12">
                <p>
                  Call the insurance provided by the host during business hours to speak to a member support team. They
                  can confirm the next steps and transfer you to our roadside recovery partner if needed.
                </p>
                <p className="text-underline">Breakdown allowing a 2-hour grace period:</p>
                <ol className="support-order-list">
                  <li>Flat Tyre</li>
                  <li>Clutch</li>
                  <li>Overheating</li>
                  <li>Steering issues</li>
                  <li>Cut-off/engine won’t start</li>
                  <li>Brake or Handbrake problems</li>
                </ol>
                <p className="text-underline">Breakdown allowing a 1-hour grace period:</p>
                <ol className="support-order-list">
                  <li>Flat Tyre</li>
                  <li>Wrong Fuel</li>
                  <li>Lights</li>
                </ol>
                <p className="text-underline">Breakdown allowing no grace period:</p>
                <ol className="support-order-list">
                  <li>Loosing, breaking, or accidentally leaving the key in the ignition</li>
                </ol>
              </div>
              {/* 4. Breakdown */}

              {/* 5.	Keeping your account safe */}
              <div className="col-12 mt-5" id="account-safety">
                <div className="support-search-main text-center mb-4 mt-5" style={{ marginLeft: 0, marginRight: 0 }}>
                  <h2>Keeping your account safe</h2>
                </div>
              </div>
              <div className="col-12">
                <p>
                  We place high importance on the security of your personal information; therefore, we take several
                  precautions to safeguard your account. You can also take some simple actions to make your account more
                  secure.
                </p>
                <p>Here are some steps you may take to help safeguard your account and personal information.</p>
                <ol className="support-order-list">
                  <li>
                    Change your password regularly. We recommend that you change your password frequently to keep your
                    account secure. To create a strong new password, follow these guidelines:
                    <ol className="support-order-list">
                      <li>Personal information such as your name, birth date, or user ID should be avoided.</li>
                      <li>Use a term if possible (for example, a song lyric or book title)</li>
                      <li>Make use of numerals and other special characters.</li>
                      <li>Use a different password for this account than you do for other accounts.</li>
                      <li>If you believe your account has been hacked, you should reset your password.</li>
                    </ol>
                  </li>
                  <li>
                    Be wary of phishing emails. <br />
                    Phishing emails impersonate Vumah and are sent to gain access to your passwords and other sensitive
                    information. If you get a strange email purporting to be from Vumah, please forward it to
                    support@vumah.co.uk right away. Do not open any attachments or click any links in the email. We will
                    let you know as soon as we have more information.
                  </li>
                  <li>
                    Any unusual activity on your account should be reported <br />
                    Check your account and your preferences frequently to ensure that no one has accessed or changed
                    your account without your consent. If anything has changed without your permission, please let us
                    know as soon as possible. <br />
                    If a new device is used, we will send you an email. If you do not recognize the login information,
                    please contact us. It is also a good idea to update your password. <br />
                    If you believe someone is attempting to steal control of your account, we may place a temporary hold
                    on it until we can safely return control to you.
                  </li>
                </ol>
              </div>
              {/* 5.	Keeping your account safe */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
