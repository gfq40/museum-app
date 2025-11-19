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
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import './Exhibits3D.css';

const Exhibits3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<string>('sphere');
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);

  const exhibits = [
    { id: 'sphere', name: 'Ancient Globe', description: 'A spherical artifact' },
    { id: 'box', name: 'Stone Cube', description: 'Carved stone cube' },
    { id: 'cylinder', name: 'Column Fragment', description: 'Ancient column piece' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create Babylon.js engine
    const engine = new BABYLON.Engine(canvasRef.current, true);
    engineRef.current = engine;

    // Create scene
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;
    scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.15, 1);

    // Create camera
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2.5,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;

    // Create light
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;

    // Add directional light for better shadows
    const dirLight = new BABYLON.DirectionalLight(
      'dirLight',
      new BABYLON.Vector3(-1, -2, -1),
      scene
    );
    dirLight.intensity = 0.5;

    // Create initial mesh
    createMesh(selectedExhibit, scene);

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

  useEffect(() => {
    if (sceneRef.current) {
      // Remove old meshes
      sceneRef.current.meshes.forEach((mesh) => {
        if (mesh.name !== 'camera') {
          mesh.dispose();
        }
      });
      // Create new mesh
      createMesh(selectedExhibit, sceneRef.current);
    }
  }, [selectedExhibit]);

  const createMesh = (type: string, scene: BABYLON.Scene) => {
    let mesh: BABYLON.Mesh;

    switch (type) {
      case 'sphere':
        mesh = BABYLON.MeshBuilder.CreateSphere(
          'sphere',
          { diameter: 2, segments: 32 },
          scene
        );
        break;
      case 'box':
        mesh = BABYLON.MeshBuilder.CreateBox(
          'box',
          { size: 2 },
          scene
        );
        break;
      case 'cylinder':
        mesh = BABYLON.MeshBuilder.CreateCylinder(
          'cylinder',
          { height: 3, diameter: 1 },
          scene
        );
        break;
      default:
        mesh = BABYLON.MeshBuilder.CreateSphere(
          'sphere',
          { diameter: 2 },
          scene
        );
    }

    // Create material with texture
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(0.8, 0.7, 0.5);
    material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    material.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    mesh.material = material;

    // Add rotation animation
    scene.registerBeforeRender(() => {
      mesh.rotation.y += 0.005;
    });

    return mesh;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>3D Exhibits</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">3D Exhibits</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="exhibits-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Interactive 3D Viewer</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <canvas
                ref={canvasRef}
                className="babylon-canvas"
                style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: '8px',
                  touchAction: 'none',
                }}
              />
              <p style={{ marginTop: '12px', textAlign: 'center' }}>
                Use mouse/touch to rotate and zoom
              </p>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Select Exhibit</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {exhibits.map((exhibit) => (
                  <IonItem
                    key={exhibit.id}
                    button
                    onClick={() => setSelectedExhibit(exhibit.id)}
                    color={selectedExhibit === exhibit.id ? 'primary' : ''}
                  >
                    <IonLabel>
                      <h2>{exhibit.name}</h2>
                      <p>{exhibit.description}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Exhibits3D;

