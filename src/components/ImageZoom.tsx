import React, { useState, useRef } from 'react';
import { IonModal, IonButton, IonIcon, IonButtons } from '@ionic/react';
import { close, expand } from 'ionicons/icons';
import './ImageZoom.css';

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1));
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Thumbnail Image */}
      <div className="image-zoom-thumbnail" onClick={handleImageClick}>
        <img src={src} alt={alt} />
        <div className="image-zoom-overlay">
          <IonIcon icon={expand} />
          <span>Tap to zoom</span>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <IonModal isOpen={isModalOpen} onDidDismiss={handleClose} className="image-zoom-modal">
        <div className="image-zoom-container">
          {/* Header */}
          <div className="image-zoom-header">
            <IonButtons slot="end">
              <IonButton onClick={handleClose}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </div>

          {/* Zoomable Image */}
          <div
            ref={imageRef}
            className="image-zoom-content"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={src}
              alt={alt}
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            />
          </div>

          {/* Zoom Controls */}
          <div className="image-zoom-controls">
            <IonButton onClick={handleZoomOut} disabled={scale <= 1}>
              −
            </IonButton>
            <span>{Math.round(scale * 100)}%</span>
            <IonButton onClick={handleZoomIn} disabled={scale >= 4}>
              +
            </IonButton>
            <IonButton onClick={handleReset} fill="outline">
              Reset
            </IonButton>
          </div>
        </div>
      </IonModal>
    </>
  );
};

export default ImageZoom;

