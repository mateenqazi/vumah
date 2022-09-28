import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function HostGuide() {
  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-3 support-sidebar">
            <div className="mb-3">
              <Link to="/trust#our-promise">
                Our Promise to Trust and Safety
              </Link>
            </div>

            <div>
              <Link to="/trust#future">
                Future Steps to improve Trust & Safety
              </Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">
              <div className="col-12" id="our-promise">
                <h2>
                  Our Promise to Trust and Safety
                </h2>
                <p className="ml-4">
                  Making sure everyone at Vumah and the vehicles safe is a top priority.
                </p>
                <p className="ml-4">
                  Therefore, we wanted to highlight the various arrangements we took to earn our users’ trust and protect their safety.
                </p>
                <p className="ml-4">
                  This is how we maintain support and promote trust & safety at Vumah:
                </p>
                <ol className="support-order-list">
                  <li>
                    Verification and user screening.
                    <br />
                    Every Vumah user must pass a thorough trust and safety screening to verify their identity and driving history.
                  </li>
                  <li>
                    Trip monitoring “Real Time” (only when location is enabled) and safety notifications.
                    <br />
                    The Vumah team receives and monitors real-time notifications for late returns and other renter activities that may indicate a safety concern.
                    <br />
                    Vumah monitors these activities on a 24/7 basis and our team takes immediate and suitable action. This includes working with hosts and, if needed, local authorities to resolve the issue as quickly as possible.
                  </li>
                  <li>
                    Hosts control over untrustworthy renters.
                    <br />
                    All Vumah hosts have the ability to mark previous renters as untrustworthy in our platform.  By performing this action, hosts can block those renters from renting their vehicle in the future. In addition, repeatedly blocked renters are reviewed by our trust and safety team and are subject to removal from our service.
                  </li>
                  <li>
                    Feedback from community to maintain top standards.
                    <br />
                    By utilising feedback after the trip has finished (Check out). Our team actively works to reinforce our community standards when those standards are not being met.
                    <br />
                    This may include: general education, written warnings, fee enforcements, or account suspension.
                  </li>
                </ol>
              </div>

              <div className="col-12 mt-4" id="future">
                <h2>
                  Future Steps to improve Trust & Safety
                </h2>

                <h6 className="mb-3 mt-5 my-button">
                  Events for local community.
                </h6>
                <p className="ml-4">
                  Vumah team always work to organize a community event with Vumah hosts in order to share information and gather new ideas on how we can better partner with and support our host community in the area.
                </p>
                <p className="ml-4">
                  Continues developments. Including improvements to our renter verification and stricter fees and policies to discourage irresponsible behaviour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
