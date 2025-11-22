import { useEffect, useState } from 'react';
import { IonToast } from '@ionic/react';

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={
          isOnline
            ? '✅ Back online! Content will sync automatically.'
            : '📵 You are offline. Cached content is still available.'
        }
        duration={3000}
        color={isOnline ? 'success' : 'warning'}
        position="top"
      />
    </>
  );
};

export default OfflineIndicator;

