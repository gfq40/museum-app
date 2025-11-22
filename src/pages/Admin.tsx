import { useState, useEffect } from 'react';
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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import { add, create, trash, logOut } from 'ionicons/icons';
import { Artifact } from '../services/database';
import { getAllArtifacts, addArtifact, updateArtifact, deleteArtifact, ArtifactInput } from '../services/adminService';
import ArtifactForm from '../components/ArtifactForm';
import './Admin.css';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [artifactToDelete, setArtifactToDelete] = useState<string | null>(null);

  // Check if already authenticated in session
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadArtifacts();
    }
  }, []);

  const handleLogin = () => {
    // Simple password check (in production, use proper authentication)
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'museum2024';
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      loadArtifacts();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  const loadArtifacts = async () => {
    setLoading(true);
    const { data, error } = await getAllArtifacts();
    if (!error) {
      setArtifacts(data);
    } else {
      alert('Error loading artifacts: ' + error.message);
    }
    setLoading(false);
  };

  const handleAddArtifact = () => {
    setEditingArtifact(null);
    setShowForm(true);
  };

  const handleEditArtifact = (artifact: Artifact) => {
    setEditingArtifact(artifact);
    setShowForm(true);
  };

  const handleSaveArtifact = async (artifactData: ArtifactInput) => {
    setLoading(true);
    
    if (editingArtifact) {
      // Update existing artifact
      const { data, error } = await updateArtifact(editingArtifact.id, artifactData);
      if (error) {
        alert('Error updating artifact: ' + error.message);
      } else {
        alert('Artifact updated successfully!');
        setShowForm(false);
        loadArtifacts();
      }
    } else {
      // Add new artifact
      const { data, error } = await addArtifact(artifactData);
      if (error) {
        alert('Error adding artifact: ' + error.message);
      } else {
        alert('Artifact added successfully!');
        setShowForm(false);
        loadArtifacts();
      }
    }
    
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setArtifactToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (!artifactToDelete) return;
    
    setLoading(true);
    const { success, error } = await deleteArtifact(artifactToDelete);
    
    if (success) {
      alert('Artifact deleted successfully!');
      loadArtifacts();
    } else {
      alert('Error deleting artifact: ' + error.message);
    }
    
    setArtifactToDelete(null);
    setLoading(false);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Admin Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="login-container">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>🔐 Museum Admin Panel</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value || '')}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Enter admin password"
                  />
                </IonItem>
                <IonButton expand="block" onClick={handleLogin} style={{ marginTop: '20px' }}>
                  Login
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Admin Dashboard
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: '#667eea', fontWeight: '600' }}>🏛️ Admin Panel</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOut} />
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner />
          </div>
        )}

        {!loading && !showForm && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Artifact Management</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Total Artifacts: {artifacts.length}</p>
              </IonCardContent>
            </IonCard>

            <IonList>
              {artifacts.map((artifact) => (
                <IonCard key={artifact.id}>
                  <IonCardContent>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <img
                        src={artifact.image_url}
                        alt={(artifact as any).name_en || artifact.image_url}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3>{(artifact as any).name_en || 'Untitled'}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--ion-color-medium)' }}>
                          {artifact.period} • {artifact.location}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <IonButton size="small" onClick={() => handleEditArtifact(artifact)}>
                          <IonIcon icon={create} />
                        </IonButton>
                        <IonButton size="small" color="danger" onClick={() => handleDeleteClick(artifact.id)}>
                          <IonIcon icon={trash} />
                        </IonButton>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>

            {/* Floating Add Button */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={handleAddArtifact}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <ArtifactForm
            artifact={editingArtifact}
            onSave={handleSaveArtifact}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Delete Confirmation Alert */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Delete Artifact"
          message="Are you sure you want to delete this artifact? This action cannot be undone."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: handleDeleteConfirm,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Admin;

