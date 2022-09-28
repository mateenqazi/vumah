// mock api
import './_apis_';

// i18n
import './locales/i18n';

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lightbox
import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// material
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store, persistor } from './redux/store';
// contexts
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
// components
import LoadingScreen from './components/LoadingScreen';

import { AuthProvider } from './contexts/JWTContext';

//
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import GraphQlContainer from './graphql';

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './assets/styles/style.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeConfig from './theme';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KfTZ5KD8DXRtfuXHVqqmubdZxnv9cKZ1mfDPAA9664mfD2TSC9PcCfKJJRQl7awXwU9oIjkGk4i2t35l1NnNq5O00Nz9lMNB4'
);

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <GraphQlContainer>
          <ThemeConfig>
            <PersistGate
              loading={
                <div
                  style={{
                    minHeight: '100vh',
                    minWidth: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <LoadingScreen />
                </div>
              }
              persistor={persistor}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CollapseDrawerProvider>
                  <BrowserRouter>
                    <AuthProvider>
                      <App />
                    </AuthProvider>
                  </BrowserRouter>
                </CollapseDrawerProvider>
              </LocalizationProvider>
            </PersistGate>
          </ThemeConfig>
        </GraphQlContainer>
      </ReduxProvider>
    </HelmetProvider>
  </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
