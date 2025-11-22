import React from 'react';
import { IonChip, IonLabel, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import './FilterChips.css';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

interface FilterChipsProps {
  filters: FilterOption[];
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  onClearAll: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  activeFilters,
  onFilterToggle,
  onClearAll,
}) => {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="filter-chips-container">
      <div className="filter-chips-scroll">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <IonChip
              key={filter.id}
              className={`filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => onFilterToggle(filter.id)}
            >
              {filter.icon && <IonIcon icon={filter.icon} />}
              <IonLabel>{filter.label}</IonLabel>
              {isActive && <IonIcon icon={close} />}
            </IonChip>
          );
        })}
      </div>
      
      {hasActiveFilters && (
        <IonChip
          className="clear-all-chip"
          onClick={onClearAll}
          color="danger"
        >
          <IonIcon icon={close} />
          <IonLabel>Clear All</IonLabel>
        </IonChip>
      )}
    </div>
  );
};

export default FilterChips;

