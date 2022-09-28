import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function AccountManagementGuide() {

  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="row">
          <div className="col-md-3 support-sidebar">
            <div className="mb-3">
              <Link to="/account-management-guide#reset-password">
                Resetting your password
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/account-management-guide#contact-info">
                Change your contact information
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/account-management-guide#account-safety">
                Keeping your account safe
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/account-management-guide#account-suspension">
                Account suspensions and restrictions
              </Link>
            </div>
          </div>
          <div className="col-md-8 guest-management padding-left-thirty">
            <div className="row">

              {/* Resetting your password */}
              <div className="col-12" id="reset-password">
                <h2>
                  Resetting your password
                </h2>
                <p>
                  Whether you have forgotten your password and, or want to change it for security reasons, it is easy to change your password.
                </p>
                <p>
                  If you have forgotten your password and you try and sign in, there will be a “forgot your password” option which will just ask for your email and send you a link to your inbox, which will allow you to change your password.
                </p>
                <p>
                  If you simply want to reset it, just go to your account and you will see the option to update your password. It will first ask you for your original password for security reasons, and then the new password that you want to change into.
                </p>
              </div>
              {/* Resetting your password */}


              {/* Change your contact information */}
              <div className="col-12 mt-4" id="contact-info">
                <h2>Change your contact information</h2>
                <p>
                  If you have changed your address or phone number, or have set up a new email address, make sure that you update the details on your account. To do this, simply go to your account page where you can go to your contact information and change it. As you change your email it will send a new link to your new email address for verification.
                </p>
              </div>
              {/* Change your contact information */}


              {/* Keeping your account safe */}
              <div className="col-12 mt-5" id="account-safety">
                <h2>Keeping your account safe</h2>
                <p>
                  We place high importance on the security of your personal information; therefore, we take several precautions to safeguard your account. You can also take some simple actions to make your account more secure.
                </p>
                <p>
                  Here are some steps you may take to help safeguard your account and personal information.
                </p>
                <ol className="support-order-list">
                  <li>
                    Change your password regularly and recommend that you change your password frequently to keep your account secure. To create a strong new password, follow these guidelines:
                    <ol className="support-order-list">
                      <li>
                        Personal information such as your name, birth date, or user ID should be avoided.
                      </li>
                      <li>
                        Use a term if possible (for example, a song lyric or book title).
                      </li>
                      <li>
                        Make use of numerals and other special characters.
                      </li>
                      <li>
                        Use a different password for this account than you do for other accounts.
                      </li>
                      <li>
                        If you believe your account has been hacked, you should reset your password.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Beaware of phishing emails
                    <p>Phishing emails impersonate Vumah and are sent to gain access to your passwords and other sensitive information. If you get a strange email purporting to be from Vumah, please forward it to support@vumah.co.uk right away. Do not open any attachments or click any links in the email. We will let you know as soon as we have more information.</p>
                  </li>
                  <li>
                    Any unusual activity on your account should be reported.
                    <p>
                      Check your account and your preferences frequently to ensure that no one has accessed or changed your account without your consent. Verify that your activities are yours. If anything has changed without your permission, please let us know as soon as possible.
                    </p>
                    <p>
                      If a new device is used, we will send you an email. If you do not recognize the login information, please contact us. It is also a good idea to update your password.
                    </p>
                    <p>
                      If you believe someone is attempting to steal control of your account, we may place a temporary hold on it until we can safely return control to you. We can also assist you in removing any fraudulent or illegal listings.
                    </p>
                  </li>
                </ol>
              </div>
              {/* Keeping your account safe */}

              {/* Account suspensions and restrictions */}
              <div className="col-12 mt-5" id="account-suspension">
                <h2>Account suspensions and restrictions</h2>
                <p>
                  To ensure safety and trust within the community, if hosts break the terms and conditions, they will undergo the strike system.
                </p>
                <ol className="support-order-list">
                  <li>
                    Strike 1: Account restriction for 1 week
                  </li>
                  <li>
                    Strike 2: Account restriction for 1 month
                  </li>
                  <li>
                    Strike 3: Account permanently banned
                  </li>
                </ol>
                <p>
                  Each strike dependant on the conditions broken, e.g., renting out stolen vehicles or outside deals would result in a strike 3, which is a permanent ban.
                </p>
              </div>
              {/* Account suspensions and restrictions */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}