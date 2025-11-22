import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './SkeletonCard.css';

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <IonCard key={index} className="skeleton-card gallery-card">
          <div className="skeleton skeleton-image"></div>
          <IonCardContent>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default SkeletonCard;

