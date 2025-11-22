import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { logoGoogle, logoApple, mail, lockClosed, eye, eyeOff } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import './Welcome.css';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { signIn, signUp, signInWithGoogle, signInWithApple, continueAsGuest } = useAuth();

  const [showEmailAuth, setShowEmailAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // OAuth will redirect, so we don't need to handle success here
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    setError('');
    const { error } = await signInWithApple();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // OAuth will redirect, so we don't need to handle success here
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setError(t('pleaseEnterEmailPassword') || 'Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (isSignUp) {
        setError(t('checkEmailVerification') || 'Please check your email to verify your account');
        setLoading(false);
      } else {
        history.push('/tabs/gallery');
      }
    }
  };

  const handleGuestMode = () => {
    continueAsGuest();
    history.push('/tabs/gallery');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">
        <div className="welcome-container">
          {/* Logo and Title Section */}
          <div className="welcome-header">
            <div className="logo-container">
              <svg className="museum-logo" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tympanum - First polyline (outer) - extended beyond columns */}
                <polyline points="25,50 60,18 95,50" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                {/* Tympanum - Second polyline (inner) - more spacing */}
                <polyline points="32,44 60,25 88,44" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                {/* Left column - shorter */}
                <line x1="35" y1="55" x2="35" y2="85" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round"/>

                {/* Center column - taller (perspective) */}
                <line x1="60" y1="55" x2="60" y2="95" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round"/>

                {/* Right column - shorter */}
                <line x1="85" y1="55" x2="85" y2="85" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round"/>

                {/* Base line - lower */}
                <line x1="25" y1="100" x2="95" y2="100" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="app-title">{t('virtualMuseum') || 'Virtual Museum'}</h1>
            <p className="app-tagline">{t('exploreHistory') || 'Explore History in Your Hands'}</p>
          </div>

          {/* Auth Options */}
          <div className="auth-container">
            {!showEmailAuth ? (
              <>
                {/* Social Login Buttons */}
                <IonButton
                  expand="block"
                  className="social-button google-button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <IonIcon slot="start" icon={logoGoogle} />
                  {t('continueWithGoogle') || 'Continue with Google'}
                </IonButton>

                <IonButton
                  expand="block"
                  className="social-button apple-button"
                  onClick={handleAppleSignIn}
                  disabled={loading}
                >
                  <IonIcon slot="start" icon={logoApple} />
                  {t('continueWithApple') || 'Continue with Apple'}
                </IonButton>

                {/* Divider */}
                <div className="divider">
                  <span>{t('or') || 'or'}</span>
                </div>

                {/* Email Auth Toggle */}
                <IonButton
                  expand="block"
                  fill="outline"
                  className="email-toggle-button"
                  onClick={() => setShowEmailAuth(true)}
                >
                  <IonIcon slot="start" icon={mail} />
                  {t('continueWithEmail') || 'Continue with Email'}
                </IonButton>
              </>
            ) : (
              <>
                {/* Email/Password Form */}
                <IonCard className="auth-card">
                  <IonCardContent>
                    <h2 className="auth-title">
                      {isSignUp ? (t('signUp') || 'Sign Up') : (t('login') || 'Login')}
                    </h2>

                    {error && (
                      <IonText color="danger" className="error-text">
                        <p>{error}</p>
                      </IonText>
                    )}

                    <IonItem lines="none" className="auth-input">
                      <IonIcon icon={mail} slot="start" />
                      <IonInput
                        type="email"
                        placeholder={t('email') || 'Email'}
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                      />
                    </IonItem>

                    <IonItem lines="none" className="auth-input">
                      <IonIcon icon={lockClosed} slot="start" />
                      <IonInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('password') || 'Password'}
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                      />
                      <IonIcon
                        icon={showPassword ? eyeOff : eye}
                        slot="end"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      />
                    </IonItem>

                    <IonButton
                      expand="block"
                      onClick={handleEmailAuth}
                      disabled={loading}
                      className="submit-button"
                    >
                      {loading ? <IonSpinner name="crescent" /> : (isSignUp ? (t('signUp') || 'Sign Up') : (t('login') || 'Login'))}
                    </IonButton>

                    <div className="auth-switch">
                      <IonText>
                        {isSignUp ? (t('alreadyHaveAccount') || 'Already have an account?') : (t('dontHaveAccount') || "Don't have an account?")}
                      </IonText>
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setError('');
                        }}
                      >
                        {isSignUp ? (t('login') || 'Login') : (t('signUp') || 'Sign Up')}
                      </IonButton>
                    </div>

                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => setShowEmailAuth(false)}
                      className="back-button"
                    >
                      {t('back') || 'Back'}
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </>
            )}

            {/* Guest Mode */}
            <div className="guest-mode">
              <IonButton
                fill="clear"
                onClick={handleGuestMode}
                className="guest-button"
              >
                {t('continueAsGuest') || 'Continue as Guest'}
              </IonButton>
            </div>
          </div>

          {/* Footer */}
          <div className="welcome-footer">
            <p>{t('welcomeFooter') || 'Discover ancient artifacts, explore 3D exhibits, and test your knowledge'}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;

