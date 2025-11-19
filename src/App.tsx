import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, cube, scan } from 'ionicons/icons';
import Gallery from './pages/Gallery';
import Exhibits3D from './pages/Exhibits3D';
import ARView from './pages/ARView';

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
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/exhibits">
            <Exhibits3D />
          </Route>
          <Route path="/ar">
            <ARView />
          </Route>
          <Route exact path="/">
            <Redirect to="/gallery" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="gallery" href="/gallery">
            <IonIcon aria-hidden="true" icon={images} />
            <IonLabel>Gallery</IonLabel>
          </IonTabButton>
          <IonTabButton tab="exhibits" href="/exhibits">
            <IonIcon aria-hidden="true" icon={cube} />
            <IonLabel>3D Exhibits</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ar" href="/ar">
            <IonIcon aria-hidden="true" icon={scan} />
            <IonLabel>AR View</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
