import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { images, cube, scan, school } from 'ionicons/icons';
import Gallery from '../pages/Gallery';
import Exhibits3D from '../pages/Exhibits3D';
import ARView from '../pages/ARView';
import Quiz from '../pages/Quiz';
import ArtifactDetail from '../pages/ArtifactDetail';
import Help from '../pages/Help';
import About from '../pages/About';
import Credits from '../pages/Credits';

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/gallery">
          <Gallery />
        </Route>
        <Route exact path="/tabs/artifact/:id">
          <ArtifactDetail />
        </Route>
        <Route exact path="/tabs/exhibits">
          <Exhibits3D />
        </Route>
        <Route path="/tabs/ar">
          <ARView />
        </Route>
        <Route path="/tabs/quiz">
          <Quiz />
        </Route>
        <Route exact path="/tabs/help">
          <Help />
        </Route>
        <Route exact path="/tabs/about">
          <About />
        </Route>
        <Route exact path="/tabs/credits">
          <Credits />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/gallery" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="gallery" href="/tabs/gallery">
          <IonIcon aria-hidden="true" icon={images} />
          <IonLabel>Gallery</IonLabel>
        </IonTabButton>
        <IonTabButton tab="exhibits" href="/tabs/exhibits">
          <IonIcon aria-hidden="true" icon={cube} />
          <IonLabel>3D Exhibits</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ar" href="/tabs/ar">
          <IonIcon aria-hidden="true" icon={scan} />
          <IonLabel>AR View</IonLabel>
        </IonTabButton>
        <IonTabButton tab="quiz" href="/tabs/quiz">
          <IonIcon aria-hidden="true" icon={school} />
          <IonLabel>Quiz</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;

