import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonMenuButton,
  IonSpinner,
} from '@ionic/react';
import { qrCode, heart, heartOutline, image, videocam, time, location, grid } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import QRScanner from '../components/QRScanner';
import SkeletonCard from '../components/SkeletonCard';
import FilterChips, { FilterOption } from '../components/FilterChips';
import SearchResults from '../components/SearchResults';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import LazyImage from '../components/LazyImage';
import { useFavorites } from '../hooks/useFavorites';
import { fetchArtifacts, Artifact } from '../services/database';
import './Gallery.css';

const Gallery: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current language
  const currentLang = i18n.language || 'en';

  // Define filter options based on actual artifact data
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  // Generate filter options from artifacts
  useEffect(() => {
    if (artifacts.length === 0) return;

    const categories = new Set<string>();
    const periods = new Set<string>();

    artifacts.forEach((artifact) => {
      if (artifact.category) categories.add(artifact.category);
      if (artifact.period) periods.add(artifact.period);
    });

    const options: FilterOption[] = [
      { id: 'type-image', label: 'Images', value: 'image', icon: image },
      { id: 'type-video', label: 'Videos', value: 'video', icon: videocam },
      { id: 'favorites', label: 'Favorites', value: 'favorites', icon: heart },
    ];

    // Add category filters
    Array.from(categories).forEach((category) => {
      options.push({
        id: `category-${category}`,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
        icon: grid,
      });
    });

    // Add period filters (limit to first 5)
    Array.from(periods).slice(0, 5).forEach((period) => {
      options.push({
        id: `period-${period}`,
        label: period,
        value: period,
        icon: time,
      });
    });

    setFilterOptions(options);
  }, [artifacts]);

  // Fetch artifacts from Supabase
  const loadArtifacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArtifacts();
      setArtifacts(data);
    } catch (err) {
      console.error('Error loading artifacts:', err);
      setError('Failed to load artifacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtifacts();
  }, []);

  // Handle pull-to-refresh
  const handleRefresh = async (event: CustomEvent) => {
    await loadArtifacts();
    event.detail.complete();
  };

  // Transform artifacts to gallery items format with full artifact data
  const galleryItems = artifacts.map((artifact) => ({
    id: artifact.id,
    title: artifact[`name_${currentLang}` as keyof Artifact] as string || artifact.name_en,
    description: artifact[`description_${currentLang}` as keyof Artifact] as string || artifact.description_en,
    type: artifact.type,
    src: artifact.image_url,
    category: artifact.category,
    period: artifact.period,
  }));

  // Handle filter toggle
  const handleFilterToggle = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  // Filter and search logic with chip-based filters
  const filteredItems = galleryItems.filter((item) => {
    // Search filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());

    // If no active filters, show all (that match search)
    if (activeFilters.length === 0) {
      // Still respect the old segment filter for backward compatibility
      const matchesSegment =
        filterType === 'all' ||
        (filterType === 'images' && item.type === 'image') ||
        (filterType === 'videos' && item.type === 'video') ||
        (filterType === 'favorites' && isFavorite(item.id));
      return matchesSearch && matchesSegment;
    }

    // Check if item matches any active filter
    const matchesChipFilters = activeFilters.some((filterId) => {
      if (filterId === 'type-image') return item.type === 'image';
      if (filterId === 'type-video') return item.type === 'video';
      if (filterId === 'favorites') return isFavorite(item.id);
      if (filterId.startsWith('category-')) {
        const category = filterId.replace('category-', '');
        return item.category === category;
      }
      if (filterId.startsWith('period-')) {
        const period = filterId.replace('period-', '');
        return item.period === period;
      }
      return false;
    });

    return matchesSearch && matchesChipFilters;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ color: '#667eea', fontWeight: '600' }}>{t('museumGallery')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Pull to Refresh */}
        <IonRefresher
          slot="fixed"
          onIonRefresh={handleRefresh}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" style={{ color: '#667eea', fontWeight: '600' }}>Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Search Bar */}
        <div style={{ padding: '16px 16px 0 16px' }}>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder={t('searchArtifacts')}
            animated
          />
        </div>

        {/* Filter Chips */}
        {filterOptions.length > 0 && (
          <FilterChips
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
            onClearAll={handleClearAllFilters}
          />
        )}

        {/* Filter Segment (kept for backward compatibility) */}
        <div style={{ padding: '0 16px 16px 16px' }}>
          <IonSegment
            value={filterType}
            onIonChange={(e) => setFilterType(e.detail.value as string)}
          >
            <IonSegmentButton value="all">
              <IonLabel>{t('all')}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              <IonLabel>{t('favorites')}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="images">
              <IonLabel>{t('images')}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="videos">
              <IonLabel>{t('videos')}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Search Results Count */}
        {!loading && (
          <SearchResults
            count={filteredItems.length}
            searchTerm={searchText}
            hasFilters={activeFilters.length > 0 || filterType !== 'all'}
          />
        )}

        {/* Loading State with Skeleton Cards */}
        {loading && (
          <IonGrid>
            <IonRow>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
              <IonCol size="6" sizeMd="4" sizeLg="3">
                <SkeletonCard count={1} />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        {/* Error State */}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--ion-color-danger)' }}>
            <p>{error}</p>
            <IonButton onClick={loadArtifacts}>{t('retry') || 'Retry'}</IonButton>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <IonGrid>
            <IonRow>
              {filteredItems.map((item) => (
              <IonCol size="6" sizeMd="4" sizeLg="3" key={item.id}>
                <IonCard className="gallery-card">
                  <IonCardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <IonCardTitle
                        onClick={() => history.push(`/tabs/artifact/${item.id}`)}
                        style={{ cursor: 'pointer', flex: 1 }}
                      >
                        {item.title}
                      </IonCardTitle>
                      <IonButton
                        fill="clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                      >
                        <IonIcon
                          icon={isFavorite(item.id) ? heart : heartOutline}
                          color={isFavorite(item.id) ? 'danger' : 'medium'}
                        />
                      </IonButton>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    {item.type === 'image' ? (
                      <LazyImage
                        src={item.src}
                        alt={item.title}
                        className="gallery-media"
                        onClick={() => history.push(`/tabs/artifact/${item.id}`)}
                      />
                    ) : (
                      <div onClick={() => history.push(`/tabs/artifact/${item.id}`)}>
                        <video
                          className="gallery-media"
                          controls
                          playsInline
                        >
                          <source src={item.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        {/* Floating QR Scanner Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowScanner(true)}>
            <IonIcon icon={qrCode} />
          </IonFabButton>
        </IonFab>

        {/* QR Scanner Modal */}
        {showScanner && <QRScanner onClose={() => setShowScanner(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default Gallery;

