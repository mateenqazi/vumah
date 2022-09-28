import { Outlet } from 'react-router-dom';
import MainNavbar from '../../components/header';
import MainFooter from '../../components/footer';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
      <MainFooter />
    </>
  );
}
