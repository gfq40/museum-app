import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRange,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import {
  play,
  pause,
  close,
  playSkipForward,
  playSkipBack,
  speedometer,
} from 'ionicons/icons';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import './MiniPlayer.css';

const MiniPlayer: React.FC = () => {
  const history = useHistory();
  const {
    currentAudio,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    pauseAudio,
    resumeAudio,
    stopAudio,
    seekTo,
    skipForward,
    skipBackward,
    setPlaybackRate,
  } = useAudioPlayer();

  const [showSpeedPopover, setShowSpeedPopover] = useState(false);
  const [speedPopoverEvent, setSpeedPopoverEvent] = useState<any>(undefined);

  // Don't render if no audio is loaded
  if (!currentAudio) {
    return null;
  }

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const handleSeek = (value: number) => {
    seekTo(value);
  };

  const handleSpeedClick = (e: any) => {
    setSpeedPopoverEvent(e);
    setShowSpeedPopover(true);
  };

  const handleSpeedSelect = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedPopover(false);
  };

  const handleTitleClick = () => {
    history.push(`/tabs/artifact/${currentAudio.artifactId}`);
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="mini-player-container">
      <IonCard className="mini-player-card">
        <IonCardContent className="mini-player-content">
          {/* Title and Close Button */}
          <div className="mini-player-header">
            <div className="mini-player-title" onClick={handleTitleClick}>
              <IonIcon icon={play} className="mini-player-icon" />
              <span>{currentAudio.title}</span>
            </div>
            <IonButton fill="clear" size="small" onClick={stopAudio}>
              <IonIcon icon={close} />
            </IonButton>
          </div>

          {/* Progress Bar */}
          <div className="mini-player-progress">
            <span className="time-label">{formatTime(currentTime)}</span>
            <IonRange
              min={0}
              max={duration || 100}
              value={currentTime}
              onIonChange={(e) => handleSeek(e.detail.value as number)}
              className="progress-range"
            />
            <span className="time-label">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="mini-player-controls">
            {/* Skip Backward */}
            <IonButton fill="clear" onClick={() => skipBackward(15)}>
              <IonIcon icon={playSkipBack} />
              <span className="skip-label">15s</span>
            </IonButton>

            {/* Play/Pause */}
            <IonButton
              fill="solid"
              shape="round"
              onClick={handlePlayPause}
              className="play-pause-button"
            >
              <IonIcon icon={isPlaying ? pause : play} />
            </IonButton>

            {/* Skip Forward */}
            <IonButton fill="clear" onClick={() => skipForward(15)}>
              <span className="skip-label">15s</span>
              <IonIcon icon={playSkipForward} />
            </IonButton>

            {/* Speed Control */}
            <IonButton fill="clear" onClick={handleSpeedClick}>
              <IonIcon icon={speedometer} />
              <span className="speed-label">{playbackRate}x</span>
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>

      {/* Speed Popover */}
      <IonPopover
        isOpen={showSpeedPopover}
        event={speedPopoverEvent}
        onDidDismiss={() => setShowSpeedPopover(false)}
      >
        <IonList>
          {speedOptions.map((speed) => (
            <IonItem
              key={speed}
              button
              onClick={() => handleSpeedSelect(speed)}
              className={playbackRate === speed ? 'speed-selected' : ''}
            >
              <IonLabel>{speed}x</IonLabel>
              {playbackRate === speed && <IonIcon icon={play} slot="end" />}
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </div>
  );
};

export default MiniPlayer;

