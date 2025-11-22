import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import { supabase } from '../services/supabase';

const StorageDebug: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [createStatus, setCreateStatus] = useState<string>('');

  const listBuckets = async () => {
    setLoading(true);
    setError(null);

    console.log('=== LIST BUCKETS DEBUG ===');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase client exists:', !!supabase);

    if (!supabase) {
      setError('Supabase not configured - check .env file');
      setLoading(false);
      return;
    }

    try {
      console.log('Calling supabase.storage.listBuckets()...');
      const { data, error: listError } = await supabase.storage.listBuckets();

      console.log('Response data:', data);
      console.log('Response error:', listError);

      if (listError) {
        setError(`Error listing buckets: ${JSON.stringify(listError)}`);
      } else {
        setBuckets(data || []);
        console.log('Found buckets:', data?.length || 0);
      }
    } catch (err: any) {
      console.error('Exception:', err);
      setError(`Exception: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createBucket = async (bucketName: string) => {
    if (!supabase) {
      alert('Supabase not configured');
      return;
    }

    setCreateStatus(`Creating ${bucketName}...`);

    try {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 104857600, // 100MB
      });

      if (error) {
        setCreateStatus(`❌ Error creating ${bucketName}: ${error.message}`);
        alert(`Error: ${error.message}`);
      } else {
        setCreateStatus(`✅ Created ${bucketName}`);
        alert(`✅ Created bucket: ${bucketName}`);
        // Refresh list
        listBuckets();
      }
    } catch (err: any) {
      setCreateStatus(`❌ Exception: ${err.message}`);
      alert(`Exception: ${err.message}`);
    }
  };

  const createAllBuckets = async () => {
    const bucketNames = ['artifacts', 'audio', 'videos', 'models'];
    
    for (const name of bucketNames) {
      await createBucket(name);
      // Wait a bit between creations
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Storage Debug</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Supabase Storage Debug</h2>

        {/* Configuration Info */}
        <div style={{ padding: '15px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Configuration:</h3>
          <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'NOT SET'}</p>
          <p><strong>Anon Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set (hidden)' : '❌ NOT SET'}</p>
          <p><strong>Supabase Client:</strong> {supabase ? '✅ Initialized' : '❌ Not initialized'}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <IonButton expand="block" onClick={listBuckets} disabled={loading}>
            {loading ? <IonSpinner /> : 'List Buckets'}
          </IonButton>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <IonButton expand="block" color="success" onClick={createAllBuckets}>
            Create All Buckets
          </IonButton>
        </div>

        {createStatus && (
          <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '20px' }}>
            <p>{createStatus}</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '20px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <h3>Existing Buckets ({buckets.length}):</h3>
        
        {buckets.length === 0 ? (
          <p>No buckets found. Click "List Buckets" to check.</p>
        ) : (
          <IonList>
            {buckets.map((bucket) => (
              <IonItem key={bucket.id}>
                <IonLabel>
                  <h2>{bucket.name}</h2>
                  <p>ID: {bucket.id}</p>
                  <p>Public: {bucket.public ? '✅ Yes' : '❌ No'}</p>
                  <p>Created: {new Date(bucket.created_at).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <div style={{ marginTop: '30px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
          <h3>Instructions:</h3>
          <ol>
            <li>Click "List Buckets" to see existing buckets</li>
            <li>If no buckets exist, click "Create All Buckets"</li>
            <li>Wait for success messages</li>
            <li>Click "List Buckets" again to verify</li>
            <li>Go back to admin panel and try uploading</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" fill="outline" routerLink="/admin">
            Go to Admin Panel
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StorageDebug;

