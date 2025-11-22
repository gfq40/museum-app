import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { fetchArtifacts, Artifact } from '../services/database';
import { useFavorites } from '../hooks/useFavorites';
import LazyImage from './LazyImage';
import './RelatedArtifacts.css';

interface RelatedArtifactsProps {
  currentArtifactId: string;
  category?: string;
  period?: string;
}

const RelatedArtifacts: React.FC<RelatedArtifactsProps> = ({
  currentArtifactId,
  category,
  period,
}) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [relatedArtifacts, setRelatedArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const loadRelatedArtifacts = async () => {
      setLoading(true);
      try {
        const allArtifacts = await fetchArtifacts();
        
        // Filter related artifacts
        const related = allArtifacts
          .filter((artifact) => artifact.id !== currentArtifactId)
          .filter((artifact) => {
            // Match by category or period
            const matchesCategory = category && artifact.category === category;
            const matchesPeriod = period && artifact.period === period;
            return matchesCategory || matchesPeriod;
          })
          .slice(0, 4); // Limit to 4 related items

        setRelatedArtifacts(related);
      } catch (error) {
        console.error('Error loading related artifacts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedArtifacts();
  }, [currentArtifactId, category, period]);

  if (loading || relatedArtifacts.length === 0) {
    return null;
  }

  const getArtifactName = (artifact: Artifact) => {
    const nameKey = `name_${currentLang}` as keyof Artifact;
    return (artifact[nameKey] as string) || (artifact as any).name_en || 'Untitled';
  };

  const handleArtifactClick = (id: string) => {
    history.push(`/artifact/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <IonCard className="related-artifacts-card">
      <IonCardHeader>
        <IonCardTitle>{t('relatedArtifacts') || 'Related Artifacts'}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            {relatedArtifacts.map((artifact) => (
              <IonCol size="6" key={artifact.id}>
                <div
                  className="related-artifact-item"
                  onClick={() => handleArtifactClick(artifact.id)}
                >
                  <div className="related-artifact-image">
                    <LazyImage
                      src={artifact.image_url}
                      alt={getArtifactName(artifact)}
                      className="artifact-image"
                    />
                    <button
                      className="favorite-button"
                      onClick={(e) => handleFavoriteClick(e, artifact.id)}
                    >
                      <IonIcon
                        icon={isFavorite(artifact.id) ? heart : heartOutline}
                        color={isFavorite(artifact.id) ? 'danger' : 'light'}
                      />
                    </button>
                  </div>
                  <div className="related-artifact-info">
                    <h4>{getArtifactName(artifact)}</h4>
                    <p>{artifact.period}</p>
                  </div>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default RelatedArtifacts;

