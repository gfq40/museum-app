import { useEffect, useRef, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { camera, informationCircle } from 'ionicons/icons';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import './ARView.css';

const ARView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arSupported, setArSupported] = useState<boolean>(false);
  const [arActive, setArActive] = useState<boolean>(false);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);

  useEffect(() => {
    // Check if WebXR is supported
    checkARSupport();

    if (!canvasRef.current) return;

    // Create Babylon.js engine
    const engine = new BABYLON.Engine(canvasRef.current, true);
    engineRef.current = engine;

    // Create scene
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;
    scene.clearColor = new BABYLON.Color4(0.05, 0.05, 0.1, 1);

    // Create camera
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2.5,
      5,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // Create light
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.8;

    // Create a sample 3D model (artifact)
    const artifact = BABYLON.MeshBuilder.CreateTorusKnot(
      'artifact',
      { radius: 0.5, tube: 0.2, radialSegments: 128, tubularSegments: 64 },
      scene
    );

    // Create material
    const material = new BABYLON.StandardMaterial('artifactMat', scene);
    material.diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.3);
    material.specularColor = new BABYLON.Color3(1, 1, 1);
    material.specularPower = 32;
    artifact.material = material;

    // Add rotation animation
    scene.registerBeforeRender(() => {
      artifact.rotation.y += 0.01;
    });

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  const checkARSupport = async () => {
    if ('xr' in navigator) {
      try {
        const supported = await (navigator as any).xr.isSessionSupported('immersive-ar');
        setArSupported(supported);
      } catch (error) {
        console.log('AR not supported:', error);
        setArSupported(false);
      }
    } else {
      setArSupported(false);
    }
  };

  const startARSession = async () => {
    if (!sceneRef.current || !arSupported) {
      alert('AR is not supported on this device/browser');
      return;
    }

    try {
      // Create WebXR experience helper
      const xrHelper = await sceneRef.current.createDefaultXRExperienceAsync({
        uiOptions: {
          sessionMode: 'immersive-ar',
        },
      });

      if (xrHelper.baseExperience) {
        setArActive(true);
        
        // Enter AR mode
        await xrHelper.baseExperience.enterXRAsync(
          'immersive-ar',
          'unbounded',
          xrHelper.renderTarget
        );

        // Handle AR session end
        xrHelper.baseExperience.onStateChangedObservable.add((state) => {
          if (state === BABYLON.WebXRState.NOT_IN_XR) {
            setArActive(false);
          }
        });
      }
    } catch (error) {
      console.error('Error starting AR session:', error);
      alert('Could not start AR session. Make sure you are using HTTPS and have camera permissions.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AR View</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">AR View</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="ar-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Augmented Reality Viewer</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <canvas
                ref={canvasRef}
                className="ar-canvas"
                style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: '8px',
                  touchAction: 'none',
                }}
              />
              
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                {arSupported ? (
                  <IonButton
                    expand="block"
                    onClick={startARSession}
                    disabled={arActive}
                  >
                    <IonIcon slot="start" icon={camera} />
                    {arActive ? 'AR Session Active' : 'Start AR Experience'}
                  </IonButton>
                ) : (
                  <IonText color="warning">
                    <p>
                      <IonIcon icon={informationCircle} /> AR is not supported on this device/browser
                    </p>
                  </IonText>
                )}
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>AR Requirements</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>HTTPS Required</h3>
                    <p>AR features require a secure connection (HTTPS)</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Camera Permission</h3>
                    <p>Allow camera access when prompted</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Compatible Device</h3>
                    <p>AR works on ARCore (Android) and ARKit (iOS) devices</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Modern Browser</h3>
                    <p>Chrome, Safari, or Edge with WebXR support</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>How to Use AR</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ol>
                <li>Click "Start AR Experience" button</li>
                <li>Grant camera permissions when prompted</li>
                <li>Point your camera at a flat surface</li>
                <li>The 3D artifact will appear in your space</li>
                <li>Walk around to view from different angles</li>
              </ol>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ARView;

