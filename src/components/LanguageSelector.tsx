import { IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <IonSelect
      value={i18n.language}
      onIonChange={(e) => changeLanguage(e.detail.value)}
      interface="popover"
      style={{ minWidth: '80px' }}
    >
      <IonSelectOption value="en">🇬🇧 EN</IonSelectOption>
      <IonSelectOption value="it">🇮🇹 IT</IonSelectOption>
      <IonSelectOption value="es">🇪🇸 ES</IonSelectOption>
      <IonSelectOption value="fr">🇫🇷 FR</IonSelectOption>
    </IonSelect>
  );
};

export default LanguageSelector;

