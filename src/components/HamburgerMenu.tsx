import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonListHeader,
  IonToggle,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  languageOutline,
  moonOutline,
  helpCircleOutline,
  informationCircleOutline,
  ribbonOutline,
  sunnyOutline,
  schoolOutline,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = React.useState(
    document.body.classList.contains('dark')
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    document.body.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  const navigateTo = (path: string) => {
    history.push(path);
    // Close menu after navigation
    const menu = document.querySelector('ion-menu');
    menu?.close();
  };

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{t('menu')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Language Selection */}
          <IonListHeader>
            <IonIcon icon={languageOutline} slot="start" />
            <IonLabel>{t('language')}</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonSelect
              value={i18n.language}
              onIonChange={(e) => changeLanguage(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="en">🇬🇧 English</IonSelectOption>
              <IonSelectOption value="it">🇮🇹 Italiano</IonSelectOption>
              <IonSelectOption value="es">🇪🇸 Español</IonSelectOption>
              <IonSelectOption value="fr">🇫🇷 Français</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Theme Toggle */}
          <IonListHeader>
            <IonIcon icon={isDarkMode ? moonOutline : sunnyOutline} slot="start" />
            <IonLabel>{t('theme')}</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonIcon icon={sunnyOutline} slot="start" />
            <IonLabel>{t('lightMode')}</IonLabel>
            <IonToggle
              checked={isDarkMode}
              onIonChange={(e) => toggleDarkMode(e.detail.checked)}
              slot="end"
            />
            <IonIcon icon={moonOutline} slot="end" style={{ marginLeft: '8px' }} />
          </IonItem>

          {/* Navigation Items */}
          <IonListHeader style={{ marginTop: '20px' }}>
            <IonLabel>{t('information')}</IonLabel>
          </IonListHeader>

          <IonItem button onClick={() => navigateTo('/onboarding')}>
            <IonIcon icon={schoolOutline} slot="start" />
            <IonLabel>{t('showTutorial')}</IonLabel>
          </IonItem>

          <IonItem button onClick={() => navigateTo('/tabs/help')}>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>{t('help')}</IonLabel>
          </IonItem>

          <IonItem button onClick={() => navigateTo('/tabs/about')}>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>{t('about')}</IonLabel>
          </IonItem>

          <IonItem button onClick={() => navigateTo('/tabs/credits')}>
            <IonIcon icon={ribbonOutline} slot="start" />
            <IonLabel>{t('credits')}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default HamburgerMenu;

