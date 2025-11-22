import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import {
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { scan, close } from 'ionicons/icons';
import './QRScanner.css';

interface QRScannerProps {
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onClose }) => {
  const history = useHistory();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = 'qr-reader';

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setScanning(true);
      setError('');

      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        onScanSuccess,
        onScanFailure
      );
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      setError('Unable to access camera. Please check permissions.');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  const onScanSuccess = (decodedText: string) => {
    console.log('QR Code detected:', decodedText);
    
    // Expected format: "artifact:1" or just "1" or full URL
    let artifactId = '';
    
    if (decodedText.startsWith('artifact:')) {
      artifactId = decodedText.replace('artifact:', '');
    } else if (decodedText.includes('/artifact/')) {
      const match = decodedText.match(/\/artifact\/(\d+)/);
      if (match) {
        artifactId = match[1];
      }
    } else if (/^\d+$/.test(decodedText)) {
      artifactId = decodedText;
    }

    if (artifactId) {
      stopScanner();
      onClose();
      history.push(`/artifact/${artifactId}`);
    } else {
      setError('Invalid QR code. Please scan a museum artifact QR code.');
    }
  };

  const onScanFailure = (error: string) => {
    // Ignore scan failures (happens continuously while scanning)
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <div className="qr-scanner-overlay">
      <div className="qr-scanner-container">
        <div className="qr-scanner-header">
          <h2>Scan Artifact QR Code</h2>
          <IonButton fill="clear" onClick={handleClose}>
            <IonIcon icon={close} />
          </IonButton>
        </div>

        <div id={qrCodeRegionId} className="qr-reader"></div>

        {error && (
          <div className="qr-scanner-error">
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          </div>
        )}

        <div className="qr-scanner-instructions">
          <IonIcon icon={scan} className="scan-icon" />
          <p>Point your camera at the QR code</p>
          <p className="small-text">Make sure the QR code is well lit and centered</p>
        </div>

        <IonButton expand="block" color="light" onClick={handleClose}>
          Cancel
        </IonButton>
      </div>
    </div>
  );
};

export default QRScanner;

