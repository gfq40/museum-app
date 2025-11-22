import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './SkeletonCard.css';

const SkeletonDetail: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Image Skeleton */}
      <div className="skeleton skeleton-image" style={{ height: '300px', marginBottom: '20px' }}></div>
      
      {/* Title Skeleton */}
      <div className="skeleton skeleton-title" style={{ width: '80%', height: '32px', marginBottom: '16px' }}></div>
      
      {/* Metadata Skeleton */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <div className="skeleton" style={{ width: '100px', height: '24px' }}></div>
        <div className="skeleton" style={{ width: '120px', height: '24px' }}></div>
        <div className="skeleton" style={{ width: '80px', height: '24px' }}></div>
      </div>
      
      {/* Description Skeleton */}
      <IonCard>
        <IonCardContent>
          <div className="skeleton skeleton-text" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '90%', marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
        </IonCardContent>
      </IonCard>
      
      {/* Additional Info Skeleton */}
      <IonCard>
        <IonCardContent>
          <div className="skeleton skeleton-text" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '85%', marginBottom: '8px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '75%' }}></div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default SkeletonDetail;

