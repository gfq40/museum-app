import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  IonLabel,
  IonIcon,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { calendar, location, informationCircle, heart, heartOutline, shareOutline, chevronBack, chevronForward, swapHorizontal } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import AudioGuide from '../components/AudioGuide';
import SkeletonDetail from '../components/SkeletonDetail';
import ImageZoom from '../components/ImageZoom';
import RelatedArtifacts from '../components/RelatedArtifacts';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import { useFavorites } from '../hooks/useFavorites';
import { fetchArtifactById, fetchArtifacts, Artifact } from '../services/database';
import './ArtifactDetail.css';

const ArtifactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allArtifacts, setAllArtifacts] = useState<Artifact[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Get current language
  const currentLang = i18n.language || 'en';

  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id]);

  // Load all artifacts for navigation
  useEffect(() => {
    const loadAllArtifacts = async () => {
      try {
        const data = await fetchArtifacts();
        setAllArtifacts(data);
      } catch (err) {
        console.error('Error loading artifacts:', err);
      }
    };
    loadAllArtifacts();
  }, []);

  // Fetch artifact from Supabase
  useEffect(() => {
    const loadArtifact = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchArtifactById(id);
        if (data) {
          setArtifact(data);
        } else {
          setError('Artifact not found');
        }
      } catch (err) {
        console.error('Error loading artifact:', err);
        setError('Failed to load artifact');
      } finally {
        setLoading(false);
      }
    };

    loadArtifact();
  }, [id]);

  // Swipe navigation functions
  const getCurrentIndex = () => {
    return allArtifacts.findIndex((a) => a.id === id);
  };

  const navigateToNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex >= 0 && currentIndex < allArtifacts.length - 1) {
      const nextArtifact = allArtifacts[currentIndex + 1];
      history.push(`/artifact/${nextArtifact.id}`);
    }
  };

  const navigateToPrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      const prevArtifact = allArtifacts[currentIndex - 1];
      history.push(`/artifact/${prevArtifact.id}`);
    }
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateToNext();
    }
    if (isRightSwipe) {
      navigateToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Loading state
  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/gallery" />
            </IonButtons>
            <IonTitle>{t('artifactDetails')}</IonTitle>
            <IonButtons slot="end">
              <ThemeToggle />
              <LanguageSelector />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SkeletonDetail />
        </IonContent>
      </IonPage>
    );
  }

  // Error or not found state
  if (error || !artifact) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/gallery" />
            </IonButtons>
            <IonTitle>Artifact Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>{error || 'Sorry, this artifact could not be found.'}</p>
            <IonButton onClick={() => history.push('/gallery')}>
              {t('backToGallery') || 'Back to Gallery'}
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Get localized content
  const title = artifact[`name_${currentLang}` as keyof Artifact] as string || artifact.name_en;
  const description = artifact[`description_${currentLang}` as keyof Artifact] as string || artifact.description_en;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/gallery" />
          </IonButtons>
          <IonTitle>{t('artifactDetails')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite(artifact.id)}>
              <IonIcon
                icon={isFavorite(artifact.id) ? heart : heartOutline}
                color={isFavorite(artifact.id) ? 'danger' : 'medium'}
              />
            </IonButton>
            <IonButton onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: title,
                    text: description,
                    url: window.location.href,
                  });
                } catch (err) {
                  console.log('Error sharing:', err);
                }
              }
            }}>
              <IonIcon icon={shareOutline} />
            </IonButton>
            <LanguageSelector />
            <ThemeToggle />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="artifact-detail-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {artifact.type === 'image' ? (
                <ImageZoom src={artifact.image_url} alt={title} />
              ) : (
                <video controls className="artifact-detail-video">
                  <source src={artifact.image_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </IonCardContent>
          </IonCard>

          {/* Audio Guide */}
          {artifact.audio_guide_url && (
            <AudioGuide
              title={title}
              audioUrl={artifact.audio_guide_url}
              artifactId={artifact.id}
            />
          )}

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={informationCircle} /> Description
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="detailed-description">{description}</p>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Artifact Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="info-section">
                {artifact.period && (
                  <div className="info-item">
                    <IonIcon icon={calendar} className="info-icon" />
                    <div>
                      <strong>Period:</strong>
                      <p>{artifact.period}</p>
                    </div>
                  </div>
                )}

                {artifact.origin && (
                  <div className="info-item">
                    <IonIcon icon={location} className="info-icon" />
                    <div>
                      <strong>Origin:</strong>
                      <p>{artifact.origin}</p>
                    </div>
                  </div>
                )}

                {artifact.material && (
                  <div className="info-item">
                    <strong>Material:</strong>
                    <p>{artifact.material}</p>
                  </div>
                )}

                {artifact.dimensions && (
                  <div className="info-item">
                    <strong>Dimensions:</strong>
                    <p>{artifact.dimensions}</p>
                  </div>
                )}

                {artifact.discovered && (
                  <div className="info-item">
                    <strong>Discovered:</strong>
                    <p>{artifact.discovered}</p>
                  </div>
                )}

                {artifact.condition && (
                  <div className="info-item">
                    <strong>Condition:</strong>
                    <p>{artifact.condition}</p>
                  </div>
                )}
              </div>
            </IonCardContent>
          </IonCard>

          {/* Related Artifacts */}
          <RelatedArtifacts
            currentArtifactId={artifact.id}
            category={artifact.category}
            period={artifact.period}
          />

          {/* Navigation Buttons */}
          {allArtifacts.length > 1 && (
            <div className="navigation-indicators">
              <div
                className={`nav-button ${getCurrentIndex() === 0 ? 'disabled' : ''}`}
                onClick={navigateToPrevious}
                style={{ cursor: getCurrentIndex() === 0 ? 'not-allowed' : 'pointer' }}
              >
                <IonIcon icon={chevronBack} />
                <span>Previous</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ion-color-medium)' }}>
                {getCurrentIndex() + 1} / {allArtifacts.length}
              </div>
              <div
                className={`nav-button ${getCurrentIndex() === allArtifacts.length - 1 ? 'disabled' : ''}`}
                onClick={navigateToNext}
                style={{ cursor: getCurrentIndex() === allArtifacts.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                <span>Next</span>
                <IonIcon icon={chevronForward} />
              </div>
            </div>
          )}
        </div>

        {/* Swipe Hint */}
        {showSwipeHint && allArtifacts.length > 1 && (
          <div className="swipe-hint">
            <IonIcon icon={swapHorizontal} />
            <span>Swipe to navigate</span>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ArtifactDetail;

