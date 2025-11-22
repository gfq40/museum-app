import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './contexts/AuthContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Admin from './pages/Admin';
import AdminSetup from './pages/AdminSetup';
import StorageDebug from './pages/StorageDebug';
import MainTabs from './components/MainTabs';
import OfflineIndicator from './components/OfflineIndicator';
import HamburgerMenu from './components/HamburgerMenu';
import MiniPlayer from './components/MiniPlayer';
import './i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import './theme/dark-theme.css';
import './theme/mobile.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    // Register service worker for PWA (only in production)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('/museum-app/sw.js').then(
        (registration) => {
          console.log('Service Worker registered:', registration);
        },
        (error) => {
          console.log('Service Worker registration failed:', error);
        }
      );
    }
  }, []);

  return (
    <IonApp>
      <AuthProvider>
        <AudioPlayerProvider>
          <OfflineIndicator />
          <IonReactRouter basename="/museum-app">
            <HamburgerMenu />
            <IonRouterOutlet id="main-content">
              {/* Onboarding (first-time users) */}
              <Route exact path="/onboarding">
                <Onboarding />
              </Route>

              {/* Welcome/Auth Page (no tabs) */}
              <Route exact path="/welcome">
                <Welcome />
              </Route>

              {/* Storage Debug (hidden route) */}
              <Route exact path="/storage-debug">
                <StorageDebug />
              </Route>

              {/* Admin Setup (hidden route) */}
              <Route exact path="/admin-setup">
                <AdminSetup />
              </Route>

              {/* Admin Panel (hidden route) */}
              <Route exact path="/admin">
                <Admin />
              </Route>

              {/* Main App Routes (with tabs) */}
              <Route path="/tabs">
                <MainTabs />
              </Route>

              {/* Default redirect - check if onboarding completed */}
              <Route exact path="/">
                <Redirect to={localStorage.getItem('onboardingCompleted') === 'true' ? '/welcome' : '/onboarding'} />
              </Route>
            </IonRouterOutlet>

            {/* Mini Player - Persistent across all pages */}
            <MiniPlayer />
          </IonReactRouter>
        </AudioPlayerProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
