import React, { Suspense, lazy } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

import Guest from '../layouts/guests';
import LoadingScreen from '../components/LoadingScreen';
import AccountNew from 'src/pages/account/AccountNew';
import Notifications from 'src/pages/notifications/Notifications';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: <Guest />,
      children: [
        { path: '', element: <Landing /> },
        { path: 'tester', element: <Tester /> },
        { path: 'components', element: <ChatComponents /> },
        { path: 'about-us', element: <AboutUs /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'public-guest-review', element: <Publicguestreview /> },
        { path: 'guest-account', element: <GuestAccount /> },
        { path: 'public-review', element: <PublicReview /> },
        { path: 'car-listing', element: <CarListing /> },
        { path: 'partnership', element: <Partnership /> },
        { path: 'career', element: <Career /> },
        { path: 'landing-page', element: <LandingPage /> },
        { path: 'support', element: <Support /> },
        { path: 'old-search', element: <OldSearch /> },
        { path: 'search', element: <Search /> },
        { path: 'guest-guide', element: <GuestGuide /> },
        { path: 'host-guide', element: <HostGuide /> },
        { path: 'account-management-guide', element: <AccountManagementGuide /> },
        { path: 'tos', element: <TOS /> },
        { path: 'privacy', element: <Privacy /> },
        { path: 'faq', element: <FAQ /> },
        { path: 'covid', element: <Covid /> },
        { path: 'trust', element: <Trust /> },
        { path: 'blog-1', element: <Blog1 /> },
        { path: 'blog-2', element: <Blog2 /> },
        { path: 'private-review', element: <PrivateReview /> },
        { path: 'request-booking', element: <RequestBooking /> },
        { path: 'confirmation', element: <BookingConfirmationOld /> },
        { path: 'confirmation/:id', element: <BookingConfirmation /> },
        { path: 'old-chat', element: <OldChat /> },
        { path: 'booking', element: <OldBooking /> },
        { path: 'charts', element: <Charts /> },
        { path: 'vehicle/:id', element: <Vehicle /> },
        { path: 'request-booking/:id', element: <RequestBookings /> },
        { path: 'profile', element: <Profile /> },
        { path: 'profile/:id', element: <ProfilePublic /> },
        { path: 'email-verification', element: <EmailVerification /> },
        { path: 'email-verification/:token', element: <EmailVerification /> },
        { path: 'verify-password-change/:token', element: <PasswordVerification /> },
        { path: 'verify-phoneNumber-change/:token', element: <PhoneNumberVerification /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'forgot-password/:token', element: <ForgotPassword /> },
        { path: 'old-messages', element: <OldMessages /> },
        { path: 'account', element: <Account /> },
        { path: 'account-new', element: <AccountNew /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'vehicle-listing', element: <Earning /> },
        { path: 'notifications', element: <Notifications /> },

        {
          path: 'messages',
          element: <Outlet />,
          children: [
            { path: '', element: <Messages /> },
            {
              path: ':contactKey',
              element: <Messages />,
              children: [{ path: ':conversationKey', element: <Messages /> }]
            }
          ]
        },
        {
          path: 'bookings',
          element: <Outlet />,
          children: [
            { path: '', element: <Chat /> },
            {
              path: ':contactKey',
              element: <Chat />,
              children: [{ path: ':conversationKey', element: <Chat /> }]
            }
          ]
        }
      ]
    }
  ]);
}

const Tester = Loadable(lazy(() => import('../tester')));

const ChatComponents = Loadable(lazy(() => import('../pages/Messager/components/Components')));
const Chat = Loadable(lazy(() => import('../pages/newChat')));
const Messages = Loadable(lazy(() => import('../pages/newMessages')));

const Home = Loadable(lazy(() => import('../pages/home')));
const BookingConfirmationOld = Loadable(lazy(() => import('../pages/requestBooking/BookingConfirmationOId')));
const BookingConfirmation = Loadable(lazy(() => import('../pages/requestBooking/BookingConfirmation')));
const Charts = Loadable(lazy(() => import('../components/ViewCharts')));

const Vehicle = Loadable(lazy(() => import('../pages/VehicleDetails')));
const RequestBookings = Loadable(lazy(() => import('../pages/requestBooking')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const ProfilePublic = Loadable(lazy(() => import('../pages/Public-Profile')));

const EmailVerification = Loadable(lazy(() => import('../pages/Verification/EmailVerification')));
const PasswordVerification = Loadable(lazy(() => import('../pages/Verification/PasswordVerification')));
const PhoneNumberVerification = Loadable(lazy(() => import('../pages/Verification/PhoneNumberVerification')));
const ForgotPassword = Loadable(lazy(() => import('../pages/Verification/ForgotPassword')));

const Contact = Loadable(lazy(() => import('../pages/contact')));
const Publicguestreview = Loadable(lazy(() => import('../pages/public-guest-review')));
const Landing = Loadable(lazy(() => import('../pages/Landing')));
const Favorites = Loadable(lazy(() => import('../pages/Favorites')));
const AboutUs = Loadable(lazy(() => import('../pages/about')));
const Account = Loadable(lazy(() => import('../pages/account/index.js')));
const GuestAccount = Loadable(lazy(() => import('../pages/guestAccount')));
const PrivateReview = Loadable(lazy(() => import('../pages/privateReview')));
const PublicReview = Loadable(lazy(() => import('../pages/public-review')));
const CarListing = Loadable(lazy(() => import('../pages/car-listing')));
const RequestBooking = Loadable(lazy(() => import('../pages/request-booking')));
const OldBooking = Loadable(lazy(() => import('../pages/chat')));
const Partnership = Loadable(lazy(() => import('../pages/partnership')));
const Career = Loadable(lazy(() => import('../pages/career')));
const LandingPage = Loadable(lazy(() => import('../pages/landingpage')));
const Earning = Loadable(lazy(() => import('../pages/earning/index.js')));
const OldChat = Loadable(lazy(() => import('../pages/messages')));
const OldMessages = Loadable(lazy(() => import('../pages/messages')));
const Support = Loadable(lazy(() => import('../pages/support')));
const Search = Loadable(lazy(() => import('../pages/NewSearch')));
const OldSearch = Loadable(lazy(() => import('../pages/search')));
const GuestGuide = Loadable(lazy(() => import('../pages/blogs/guest')));
const HostGuide = Loadable(lazy(() => import('../pages/blogs/hosts')));
const AccountManagementGuide = Loadable(lazy(() => import('../pages/blogs/accountManagement')));
const TOS = Loadable(lazy(() => import('../pages/blogs/tos')));
const Trust = Loadable(lazy(() => import('../pages/blogs/trust')));
const Covid = Loadable(lazy(() => import('../pages/blogs/covid')));
const FAQ = Loadable(lazy(() => import('../pages/blogs/faq')));
const Privacy = Loadable(lazy(() => import('../pages/blogs/privacy')));
const Blog1 = Loadable(lazy(() => import('../pages/blogs/blog-1')));
const Blog2 = Loadable(lazy(() => import('../pages/blogs/blog-2')));
