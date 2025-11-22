import React from 'react';
import { IonIcon } from '@ionic/react';
import './OnboardingSlide.css';

interface OnboardingSlideProp {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProp> = ({
  icon,
  title,
  description,
  color,
}) => {
  return (
    <div className="onboarding-slide">
      <div className="onboarding-icon-container" style={{ backgroundColor: color }}>
        <IonIcon icon={icon} className="onboarding-icon" />
      </div>
      <h2 className="onboarding-title">{title}</h2>
      <p className="onboarding-description">{description}</p>
    </div>
  );
};

export default OnboardingSlide;

