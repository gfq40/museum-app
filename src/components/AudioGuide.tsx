import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { play, pause } from 'ionicons/icons';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import './AudioGuide.css';

interface AudioGuideProps {
  audioUrl?: string;
  title?: string;
  artifactId: string;
}

const AudioGuide: React.FC<AudioGuideProps> = ({
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title = 'Audio Guide',
  artifactId
}) => {
  const { playAudio, pauseAudio, isPlaying, currentAudio } = useAudioPlayer();

  // Check if this audio is currently playing
  const isThisAudioPlaying = currentAudio?.url === audioUrl && isPlaying;

  const handlePlayPause = () => {
    if (isThisAudioPlaying) {
      pauseAudio();
    } else {
      playAudio(audioUrl, title, artifactId);
    }
  };

  return (
    <IonCard className="audio-guide-card">
      <IonCardHeader>
        <IonCardTitle>🎧 {title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="audio-controls-simple">
          <IonButton
            expand="block"
            size="large"
            onClick={handlePlayPause}
            className="play-button-simple"
            color={isThisAudioPlaying ? 'danger' : 'primary'}
          >
            <IonIcon icon={isThisAudioPlaying ? pause : play} slot="start" />
            {isThisAudioPlaying ? 'Pause Audio Guide' : 'Play Audio Guide'}
          </IonButton>
        </div>

        <div className="audio-info">
          <p>
            <small>
              {isThisAudioPlaying
                ? '🎵 Audio is playing in the mini player below. You can continue browsing while listening!'
                : 'Listen to the audio guide to learn more about this artifact\'s history, significance, and the story behind its discovery.'
              }
            </small>
          </p>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default AudioGuide;

