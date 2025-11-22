import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { createStorageBuckets } from '../services/storageService';

const AdminSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetup = async () => {
    setLoading(true);
    setError(null);

    try {
      await createStorageBuckets();
      setSetupComplete(true);
      alert('✅ Storage buckets created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create storage buckets');
      alert('❌ Error: ' + (err.message || 'Failed to create storage buckets'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: '#667eea', fontWeight: '600' }}>
            🔧 Admin Setup
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Supabase Storage Setup</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              This will create the necessary storage buckets in Supabase for
              storing images, audio, videos, and 3D models.
            </p>

            <IonList style={{ marginTop: '20px' }}>
              <IonItem>
                <IonLabel>
                  <h3>📦 Buckets to create:</h3>
                  <ul style={{ marginTop: '10px' }}>
                    <li>artifacts (for images)</li>
                    <li>audio (for audio guides)</li>
                    <li>videos (for videos)</li>
                    <li>models (for 3D models)</li>
                  </ul>
                </IonLabel>
              </IonItem>
            </IonList>

            {error && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  background: 'var(--ion-color-danger)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              >
                <IonIcon icon={closeCircle} /> {error}
              </div>
            )}

            {setupComplete && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  background: 'var(--ion-color-success)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              >
                <IonIcon icon={checkmarkCircle} /> Setup complete! You can now
                go to the admin panel.
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              <IonButton
                expand="block"
                onClick={handleSetup}
                disabled={loading || setupComplete}
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" style={{ marginRight: '10px' }} />
                    Creating Buckets...
                  </>
                ) : setupComplete ? (
                  '✅ Setup Complete'
                ) : (
                  '🚀 Create Storage Buckets'
                )}
              </IonButton>

              {setupComplete && (
                <IonButton
                  expand="block"
                  color="secondary"
                  routerLink="/admin"
                  style={{ marginTop: '10px' }}
                >
                  Go to Admin Panel
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard style={{ marginTop: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>ℹ️ Important Notes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul>
              <li>You only need to run this setup once</li>
              <li>Buckets will be created as public (anyone can view files)</li>
              <li>Only admins can upload files</li>
              <li>Max file size: 100MB per file</li>
              <li>
                If buckets already exist, this will not create duplicates
              </li>
            </ul>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AdminSetup;

