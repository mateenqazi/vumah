import React from 'react';
import useAuth from './hooks/useAuth';
import Router from './routes';
import NotistackProvider from './components/NotistackProvider';
import GlobalStyles from './theme/globalStyles';
import LoadingScreen from './components/LoadingScreen';
import { DroidDialogProvider } from './contexts/WebDroidDialog';
import ScrollToTop from './components/ScrollToTop';
import { WebNotificationsProvider } from './contexts/WebNotificationsProvider';
import UpdateLastSeen from './UpdateLastSeen';

import './globalcss.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  const { isInitialized } = useAuth();

  return (
    <>
      {isInitialized ? (
        <WebNotificationsProvider>
          <NotistackProvider>
            <DroidDialogProvider>
              <UpdateLastSeen />
              <ScrollToTop />
              <GlobalStyles />
              <Router />
            </DroidDialogProvider>
          </NotistackProvider>
        </WebNotificationsProvider>
      ) : (
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
      )}
    </>
  );
}
export default App;
