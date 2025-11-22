import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/react';
import {
  images,
  cube,
  qrCode,
  heart,
  language,
  musicalNotes,
  helpCircle,
  checkmarkCircle,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import OnboardingSlide from '../components/OnboardingSlide';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Onboarding.css';

const Onboarding: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const slides = [
    {
      icon: images,
      title: t('onboardingSlide1Title') || 'Explore Artifacts',
      description: t('onboardingSlide1Desc') || 'Browse through a stunning collection of historical artifacts from around the world with high-quality images and detailed information.',
      color: '#667eea',
    },
    {
      icon: cube,
      title: t('onboardingSlide2Title') || '3D & AR Viewing',
      description: t('onboardingSlide2Desc') || 'Experience artifacts in 3D! Rotate, zoom, and view exhibits in augmented reality for an immersive museum experience.',
      color: '#f093fb',
    },
    {
      icon: qrCode,
      title: t('onboardingSlide3Title') || 'QR Code Scanning',
      description: t('onboardingSlide3Desc') || 'Scan QR codes at museums to instantly access detailed information about exhibits and artifacts.',
      color: '#4facfe',
    },
    {
      icon: musicalNotes,
      title: t('onboardingSlide4Title') || 'Audio Guides',
      description: t('onboardingSlide4Desc') || 'Listen to expert audio guides that bring artifacts to life with fascinating stories and historical context.',
      color: '#43e97b',
    },
    {
      icon: heart,
      title: t('onboardingSlide5Title') || 'Save Favorites',
      description: t('onboardingSlide5Desc') || 'Mark your favorite artifacts and create your personal collection for quick access anytime.',
      color: '#fa709a',
    },
    {
      icon: helpCircle,
      title: t('onboardingSlide6Title') || 'Interactive Quizzes',
      description: t('onboardingSlide6Desc') || 'Test your knowledge with fun quizzes and earn badges as you learn about history and culture.',
      color: '#feca57',
    },
    {
      icon: language,
      title: t('onboardingSlide7Title') || 'Multi-Language',
      description: t('onboardingSlide7Desc') || 'Available in English, Italian, Spanish, and French. Switch languages anytime to enjoy content in your preferred language.',
      color: '#a29bfe',
    },
    {
      icon: checkmarkCircle,
      title: t('onboardingSlide8Title') || 'Ready to Explore!',
      description: t('onboardingSlide8Desc') || 'You\'re all set! Start your journey through history and discover amazing artifacts from ancient civilizations.',
      color: '#00d2d3',
    },
  ];

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    history.replace('/tabs/gallery');
  };

  const handleGetStarted = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    history.replace('/tabs/gallery');
  };

  const handleNext = () => {
    if (swiperRef.current) {
      if (isLastSlide) {
        handleGetStarted();
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsLastSlide(swiper.isEnd);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="onboarding-content">
        <div className="onboarding-container">
          {/* Skip Button */}
          <div className="onboarding-header">
            <IonButton fill="clear" onClick={handleSkip} className="skip-button">
              {t('skip') || 'Skip'}
            </IonButton>
          </div>

          {/* Slides */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="onboarding-slides"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <OnboardingSlide
                  icon={slide.icon}
                  title={slide.title}
                  description={slide.description}
                  color={slide.color}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="onboarding-footer">
            <IonButton
              expand="block"
              size="large"
              onClick={handleGetStarted}
              className="get-started-button"
            >
              {t('getStarted') || 'Get Started'}
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              onClick={handleNext}
              className="next-button"
            >
              {t('next') || 'Next'}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;

