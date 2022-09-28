import Page from '../../components/Page';
import LandingHero from './LandingHero';
import ServiceMain from './ServiceMain';
import WhyUsMain from './WhyUsMain';
import BlogsList from './BlogsList';

// ----------------------------------------------------------------------

export default function index() {
  return (
    <Page title="Vumah">
      <LandingHero />
      <ServiceMain />
      <WhyUsMain />
      <BlogsList />
    </Page>
  );
}
