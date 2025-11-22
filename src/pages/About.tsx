import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
  IonLabel,
  IonMenuButton,
} from '@ionic/react';
import {
  logoReact,
  logoIonic,
  cubeOutline,
  globeOutline,
  phonePortraitOutline,
  cloudOfflineOutline,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './About.css';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/gallery" />
          </IonButtons>
          <IonTitle>{t('about')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="about-content">
        <div className="about-container">
          <IonCard className="about-hero">
            <IonCardHeader>
              <div className="about-logo">🏛️</div>
              <IonCardTitle className="about-title">{t('aboutAppName')}</IonCardTitle>
              <p className="about-version">{t('aboutVersion')}</p>
            </IonCardHeader>
            <IonCardContent>
              <p className="about-description">{t('aboutDescription')}</p>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('aboutFeatures')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="features-grid">
                <div className="feature-item">
                  <IonIcon icon={globeOutline} color="primary" />
                  <h3>{t('aboutFeature1Title')}</h3>
                  <p>{t('aboutFeature1Desc')}</p>
                </div>
                <div className="feature-item">
                  <IonIcon icon={cubeOutline} color="secondary" />
                  <h3>{t('aboutFeature2Title')}</h3>
                  <p>{t('aboutFeature2Desc')}</p>
                </div>
                <div className="feature-item">
                  <IonIcon icon={phonePortraitOutline} color="tertiary" />
                  <h3>{t('aboutFeature3Title')}</h3>
                  <p>{t('aboutFeature3Desc')}</p>
                </div>
                <div className="feature-item">
                  <IonIcon icon={cloudOfflineOutline} color="success" />
                  <h3>{t('aboutFeature4Title')}</h3>
                  <p>{t('aboutFeature4Desc')}</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('aboutTechnology')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="tech-stack">
                <IonChip color="primary">
                  <IonIcon icon={logoReact} />
                  <IonLabel>React 19</IonLabel>
                </IonChip>
                <IonChip color="primary">
                  <IonIcon icon={logoIonic} />
                  <IonLabel>Ionic Framework</IonLabel>
                </IonChip>
                <IonChip color="secondary">
                  <IonLabel>TypeScript</IonLabel>
                </IonChip>
                <IonChip color="secondary">
                  <IonLabel>Babylon.js</IonLabel>
                </IonChip>
                <IonChip color="tertiary">
                  <IonLabel>i18next</IonLabel>
                </IonChip>
                <IonChip color="tertiary">
                  <IonLabel>Vite</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonLabel>PWA</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonLabel>Supabase</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('aboutContact')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{t('aboutContactDesc')}</p>
              <div className="contact-info">
                <p><strong>{t('aboutDeveloper')}:</strong> Museum App Team</p>
                <p><strong>{t('aboutWebsite')}:</strong> https://gfq40.github.io/museum-app/</p>
                <p><strong>{t('aboutEmail')}:</strong> info@museumapp.example</p>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent className="about-footer">
              <p>{t('aboutCopyright')}</p>
              <p>{t('aboutLicense')}</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;

