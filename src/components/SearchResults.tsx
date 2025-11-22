import React from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline, sadOutline } from 'ionicons/icons';
import './SearchResults.css';

interface SearchResultsProps {
  count: number;
  searchTerm?: string;
  hasFilters?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  count,
  searchTerm,
  hasFilters,
}) => {
  if (count === 0) {
    return (
      <div className="search-results-empty">
        <IonIcon icon={sadOutline} className="empty-icon" />
        <h3>No artifacts found</h3>
        {searchTerm && (
          <p>No results for "<strong>{searchTerm}</strong>"</p>
        )}
        {hasFilters && (
          <p className="empty-hint">Try adjusting your filters or search term</p>
        )}
      </div>
    );
  }

  return (
    <div className="search-results-count">
      <IonIcon icon={searchOutline} />
      <span>
        Found <strong>{count}</strong> {count === 1 ? 'artifact' : 'artifacts'}
        {searchTerm && (
          <> for "<strong>{searchTerm}</strong>"</>
        )}
      </span>
    </div>
  );
};

export default SearchResults;

