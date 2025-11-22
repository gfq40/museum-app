import { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { Artifact } from '../services/database';
import { ArtifactInput } from '../services/adminService';
import FileUpload from './FileUpload';

interface ArtifactFormProps {
  artifact?: Artifact | null;
  onSave: (artifact: ArtifactInput) => void;
  onCancel: () => void;
}

const ArtifactForm: React.FC<ArtifactFormProps> = ({ artifact, onSave, onCancel }) => {
  const [currentLang, setCurrentLang] = useState<'en' | 'it' | 'es' | 'fr'>('en');
  
  const [formData, setFormData] = useState<ArtifactInput>({
    name_en: (artifact as any)?.name_en || '',
    name_it: (artifact as any)?.name_it || '',
    name_es: (artifact as any)?.name_es || '',
    name_fr: (artifact as any)?.name_fr || '',
    description_en: artifact?.description_en || '',
    description_it: artifact?.description_it || '',
    description_es: artifact?.description_es || '',
    description_fr: artifact?.description_fr || '',
    image_url: artifact?.image_url || '',
    type: (artifact as any)?.type || 'image',
    period: artifact?.period || '',
    location: artifact?.location || '',
    category: artifact?.category || 'sculpture',
    audio_guide_url: artifact?.audio_guide_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name_en || !formData.description_en || !formData.image_url) {
      alert('Please fill in at least English name, description, and image');
      return;
    }

    onSave(formData);
  };

  const updateField = (field: keyof ArtifactInput, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{artifact ? 'Edit Artifact' : 'Add New Artifact'}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {/* Language Tabs */}
          <IonSegment value={currentLang} onIonChange={(e) => setCurrentLang(e.detail.value as any)}>
            <IonSegmentButton value="en">
              <IonLabel>🇬🇧 English</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="it">
              <IonLabel>🇮🇹 Italian</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="es">
              <IonLabel>🇪🇸 Spanish</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="fr">
              <IonLabel>🇫🇷 French</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Name Fields */}
          <IonItem style={{ marginTop: '20px' }}>
            <IonLabel position="stacked">Name ({currentLang.toUpperCase()}) *</IonLabel>
            <IonInput
              value={formData[`name_${currentLang}` as keyof ArtifactInput] as string}
              onIonInput={(e) => updateField(`name_${currentLang}` as keyof ArtifactInput, e.detail.value || '')}
              placeholder={`Enter name in ${currentLang.toUpperCase()}`}
              required={currentLang === 'en'}
            />
          </IonItem>

          {/* Description Fields */}
          <IonItem>
            <IonLabel position="stacked">Description ({currentLang.toUpperCase()}) *</IonLabel>
            <IonTextarea
              value={formData[`description_${currentLang}` as keyof ArtifactInput] as string}
              onIonInput={(e) => updateField(`description_${currentLang}` as keyof ArtifactInput, e.detail.value || '')}
              placeholder={`Enter description in ${currentLang.toUpperCase()}`}
              rows={6}
              required={currentLang === 'en'}
            />
          </IonItem>

          {/* Common Fields (shown only in English tab) */}
          {currentLang === 'en' && (
            <>
              {/* Image Upload */}
              <div style={{ marginTop: '20px' }}>
                <IonLabel>
                  <h3>Artifact Image *</h3>
                </IonLabel>
                <FileUpload
                  fileType="image"
                  currentUrl={formData.image_url}
                  onUploadComplete={(url) => updateField('image_url', url)}
                />
              </div>

              <IonItem>
                <IonLabel position="stacked">Type *</IonLabel>
                <IonSelect
                  value={formData.type}
                  onIonChange={(e) => updateField('type', e.detail.value || 'image')}
                >
                  <IonSelectOption value="image">Image</IonSelectOption>
                  <IonSelectOption value="video">Video</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Period</IonLabel>
                <IonInput
                  value={formData.period}
                  onIonInput={(e) => updateField('period', e.detail.value || '')}
                  placeholder="e.g., Ancient Rome, Medieval"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Location</IonLabel>
                <IonInput
                  value={formData.location}
                  onIonInput={(e) => updateField('location', e.detail.value || '')}
                  placeholder="e.g., Rome, Italy"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Category</IonLabel>
                <IonSelect
                  value={formData.category}
                  onIonChange={(e) => updateField('category', e.detail.value)}
                >
                  <IonSelectOption value="sculpture">Sculpture</IonSelectOption>
                  <IonSelectOption value="painting">Painting</IonSelectOption>
                  <IonSelectOption value="pottery">Pottery</IonSelectOption>
                  <IonSelectOption value="jewelry">Jewelry</IonSelectOption>
                  <IonSelectOption value="manuscript">Manuscript</IonSelectOption>
                  <IonSelectOption value="weapon">Weapon</IonSelectOption>
                  <IonSelectOption value="tool">Tool</IonSelectOption>
                  <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>

              {/* Audio Guide Upload */}
              <div style={{ marginTop: '20px' }}>
                <IonLabel>
                  <h3>Audio Guide (optional)</h3>
                </IonLabel>
                <FileUpload
                  fileType="audio"
                  currentUrl={formData.audio_guide_url}
                  onUploadComplete={(url) => updateField('audio_guide_url', url)}
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <IonButton expand="block" type="submit" color="primary">
              {artifact ? 'Update Artifact' : 'Add Artifact'}
            </IonButton>
            <IonButton expand="block" type="button" color="medium" onClick={onCancel}>
              Cancel
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </form>
  );
};

export default ArtifactForm;

