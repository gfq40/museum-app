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
  IonLabel,
  IonIcon,
  IonMenuButton,
} from '@ionic/react';
import { linkOutline, imageOutline, codeSlashOutline, musicalNotesOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import './Credits.css';

const Credits: React.FC = () => {
  const { t } = useTranslation();

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/gallery" />
          </IonButtons>
          <IonTitle>{t('credits')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="credits-content">
        <div className="credits-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('creditsThankYou')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{t('creditsIntro')}</p>
            </IonCardContent>
          </IonCard>

          {/* Open Source Libraries */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={codeSlashOutline} /> {t('creditsLibraries')}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openLink('https://react.dev/')}>
                  <IonLabel>
                    <h2>React</h2>
                    <p>{t('creditsReactDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://ionicframework.com/')}>
                  <IonLabel>
                    <h2>Ionic Framework</h2>
                    <p>{t('creditsIonicDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://www.babylonjs.com/')}>
                  <IonLabel>
                    <h2>Babylon.js</h2>
                    <p>{t('creditsBabylonDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://www.i18next.com/')}>
                  <IonLabel>
                    <h2>i18next</h2>
                    <p>{t('creditsI18nDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://vitejs.dev/')}>
                  <IonLabel>
                    <h2>Vite</h2>
                    <p>{t('creditsViteDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://supabase.com/')}>
                  <IonLabel>
                    <h2>Supabase</h2>
                    <p>{t('creditsSupabaseDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://github.com/mebjas/html5-qrcode')}>
                  <IonLabel>
                    <h2>html5-qrcode</h2>
                    <p>{t('creditsQRDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Images */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={imageOutline} /> {t('creditsImages')}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openLink('https://unsplash.com/')}>
                  <IonLabel>
                    <h2>Unsplash</h2>
                    <p>{t('creditsUnsplashDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>
              </IonList>
              <div className="credits-photographers">
                <p><strong>{t('creditsPhotographers')}:</strong></p>
                <ul>
                  <li>Europeana (Ancient Pottery)</li>
                  <li>Birmingham Museums Trust (Historical Artifacts)</li>
                  <li>Europeana (Medieval Manuscript)</li>
                  <li>Europeana (Renaissance Painting)</li>
                  <li>Europeana (Ancient Sculpture)</li>
                </ul>
              </div>
            </IonCardContent>
          </IonCard>

          {/* 3D Models */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={codeSlashOutline} /> {t('credits3DModels')}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openLink('https://sketchfab.com/')}>
                  <IonLabel>
                    <h2>Sketchfab</h2>
                    <p>{t('creditsSketchfabDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>

                <IonItem button onClick={() => openLink('https://www.babylonjs.com/')}>
                  <IonLabel>
                    <h2>Babylon.js Playground</h2>
                    <p>{t('creditsBabylonPlaygroundDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Audio */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={musicalNotesOutline} /> {t('creditsAudio')}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openLink('https://www.soundhelix.com/')}>
                  <IonLabel>
                    <h2>SoundHelix</h2>
                    <p>{t('creditsSoundHelixDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Icons */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={imageOutline} /> {t('creditsIcons')}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openLink('https://ionic.io/ionicons')}>
                  <IonLabel>
                    <h2>Ionicons</h2>
                    <p>{t('creditsIoniconsDesc')}</p>
                  </IonLabel>
                  <IonIcon icon={linkOutline} slot="end" />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Special Thanks */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{t('creditsSpecialThanks')}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{t('creditsSpecialThanksDesc')}</p>
              <ul className="credits-thanks-list">
                <li>{t('creditsThanks1')}</li>
                <li>{t('creditsThanks2')}</li>
                <li>{t('creditsThanks3')}</li>
                <li>{t('creditsThanks4')}</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent className="credits-footer">
              <p>{t('creditsFooter')}</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Credits;

