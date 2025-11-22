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
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuButton,
} from '@ionic/react';
import {
  imagesOutline,
  cubeOutline,
  qrCodeOutline,
  cameraOutline,
  gameControllerOutline,
  heartOutline,
  searchOutline,
  shareOutline,
  languageOutline,
  moonOutline,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './Help.css';

const Help: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/gallery" />
          </IonButtons>
          <IonTitle>{t('help')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="help-content">
        <div className="help-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('helpWelcome')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{t('helpIntro')}</p>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('helpFeatures')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonIcon icon={imagesOutline} slot="start" color="primary" />
                  <IonLabel>
                    <h2>{t('helpGalleryTitle')}</h2>
                    <p>{t('helpGalleryDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={cubeOutline} slot="start" color="secondary" />
                  <IonLabel>
                    <h2>{t('help3DTitle')}</h2>
                    <p>{t('help3DDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={qrCodeOutline} slot="start" color="tertiary" />
                  <IonLabel>
                    <h2>{t('helpQRTitle')}</h2>
                    <p>{t('helpQRDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={cameraOutline} slot="start" color="success" />
                  <IonLabel>
                    <h2>{t('helpARTitle')}</h2>
                    <p>{t('helpARDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={gameControllerOutline} slot="start" color="warning" />
                  <IonLabel>
                    <h2>{t('helpQuizTitle')}</h2>
                    <p>{t('helpQuizDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={heartOutline} slot="start" color="danger" />
                  <IonLabel>
                    <h2>{t('helpFavoritesTitle')}</h2>
                    <p>{t('helpFavoritesDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={searchOutline} slot="start" color="medium" />
                  <IonLabel>
                    <h2>{t('helpSearchTitle')}</h2>
                    <p>{t('helpSearchDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={shareOutline} slot="start" color="primary" />
                  <IonLabel>
                    <h2>{t('helpShareTitle')}</h2>
                    <p>{t('helpShareDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={languageOutline} slot="start" color="secondary" />
                  <IonLabel>
                    <h2>{t('helpLanguageTitle')}</h2>
                    <p>{t('helpLanguageDesc')}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={moonOutline} slot="start" color="tertiary" />
                  <IonLabel>
                    <h2>{t('helpThemeTitle')}</h2>
                    <p>{t('helpThemeDesc')}</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('helpTips')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ul className="help-tips-list">
                <li>{t('helpTip1')}</li>
                <li>{t('helpTip2')}</li>
                <li>{t('helpTip3')}</li>
                <li>{t('helpTip4')}</li>
                <li>{t('helpTip5')}</li>
              </ul>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Help;

