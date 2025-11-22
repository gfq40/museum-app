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
  IonSpinner,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { fetchExhibits3D, Exhibit3D } from '../services/database';
import './Exhibits3D.css';

// Lazy load Babylon.js only when needed
let BABYLON: any = null;
let loadersLoaded = false;

const Exhibits3D: React.FC = () => {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exhibits, setExhibits] = useState<Exhibit3D[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const engineRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);

  // Get current language
  const currentLang = i18n.language || 'en';

  // Fetch exhibits from Supabase
  useEffect(() => {
    const loadExhibits = async () => {
      setLoadingData(true);
      try {
        const data = await fetchExhibits3D();
        setExhibits(data);
        if (data.length > 0 && !selectedExhibit) {
          setSelectedExhibit(data[0].id);
        }
      } catch (err) {
        console.error('Error loading exhibits:', err);
      } finally {
        setLoadingData(false);
      }
    };

    loadExhibits();
  }, []);

  // Dynamically load Babylon.js
  const loadBabylon = async () => {
    if (!BABYLON) {
      setIsLoading(true);
      BABYLON = await import('@babylonjs/core');
      if (!loadersLoaded) {
        await import('@babylonjs/loaders');
        loadersLoaded = true;
      }
      setIsLoading(false);
    }
    return BABYLON;
  };

  useEffect(() => {
    // Wait until data is loaded and canvas is rendered
    if (!canvasRef.current || loadingData) {
      return;
    }

    const initBabylon = async () => {
      const BabylonModule = await loadBabylon();

      if (!canvasRef.current) {
        return;
      }

      // Create Babylon.js engine with antialiasing and adaptive device ratio
      const engine = new BabylonModule.Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        adaptToDeviceRatio: true
      });
      engineRef.current = engine;

      // Ensure canvas has correct resolution
      engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

      // Create scene
      const scene = new BabylonModule.Scene(engine);
      sceneRef.current = scene;
      scene.clearColor = new BabylonModule.Color4(0.1, 0.1, 0.15, 1);

      // Create camera
      const camera = new BabylonModule.ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 2.5,
        4,
        BabylonModule.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvasRef.current, true);
      camera.lowerRadiusLimit = 2;
      camera.upperRadiusLimit = 10;

      // Create light
      const light = new BabylonModule.HemisphericLight(
        'light',
        new BabylonModule.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 0.7;

      // Add directional light for better shadows
      const dirLight = new BabylonModule.DirectionalLight(
        'dirLight',
        new BabylonModule.Vector3(-1, -2, -1),
        scene
      );
      dirLight.intensity = 0.5;

      // Create initial mesh
      createMesh(selectedExhibit, scene);

      // Render loop
      engine.runRenderLoop(() => {
        scene.render();
      });

      // Initial resize to ensure correct aspect ratio
      setTimeout(() => {
        engine.resize();
      }, 100);

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
    };

    initBabylon();
  }, [loadingData]); // Re-run when loadingData changes

  useEffect(() => {
    if (sceneRef.current && selectedExhibit) {
      // Remove old meshes
      sceneRef.current.meshes.forEach((mesh: any) => {
        if (mesh.name !== 'camera') {
          mesh.dispose();
        }
      });

      // Find the selected exhibit
      const exhibit = exhibits.find(e => e.id === selectedExhibit);

      if (exhibit) {
        if (exhibit.model_type === 'gltf' && exhibit.model_data?.url) {
          // Load GLTF model
          loadModel(exhibit.model_data.url, sceneRef.current);
        } else if (exhibit.model_type === 'primitive' && exhibit.model_data?.shape) {
          // Create primitive mesh
          createMesh(exhibit.model_data.shape, sceneRef.current);
        }
      }
    }
  }, [selectedExhibit, exhibits]);

  const loadModel = async (url: string, scene: any) => {
    if (!BABYLON) return;
    try {
      // Import the model
      const result = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        '',
        url,
        scene
      );

      if (result.meshes.length > 0) {
        // Get the root mesh
        const rootMesh = result.meshes[0];

        // Center and scale the model
        const boundingBox = rootMesh.getHierarchyBoundingVectors();
        const size = boundingBox.max.subtract(boundingBox.min);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2 / maxDimension;

        rootMesh.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);
        rootMesh.position = BABYLON.Vector3.Zero();

        // Add rotation animation
        scene.registerBeforeRender(() => {
          rootMesh.rotation.y += 0.005;
        });
      }
    } catch (error) {
      console.error('Error loading model:', error);
      // Fallback to primitive if model fails to load
      createMesh('sphere', scene);
    }
  };

  const createMesh = (type: string, scene: any) => {
    if (!BABYLON) return;
    let mesh: any;

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
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('exhibits3d')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">3D Exhibits</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="exhibits-container">
          {loadingData ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <IonSpinner name="crescent" />
            </div>
          ) : (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{t('interactive3dViewer')}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {isLoading && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '400px'
                    }}>
                      <IonSpinner name="crescent" />
                    </div>
                  )}
                  <canvas
                    ref={canvasRef}
                    className="babylon-canvas"
                    style={{
                      width: '100%',
                      height: '400px',
                      borderRadius: '8px',
                      touchAction: 'none',
                      display: isLoading ? 'none' : 'block',
                    }}
                  />
                  <p style={{ marginTop: '12px', textAlign: 'center' }}>
                    {t('useMouseToRotate') || 'Use mouse/touch to rotate and zoom'}
                  </p>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{t('selectExhibit')}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {exhibits.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '20px' }}>
                      {t('noExhibitsFound') || 'No exhibits found'}
                    </p>
                  ) : (
                    <IonList>
                      {exhibits.map((exhibit) => {
                        const name = exhibit[`name_${currentLang}` as keyof Exhibit3D] as string || exhibit.name_en;
                        const description = exhibit[`description_${currentLang}` as keyof Exhibit3D] as string || exhibit.description_en;

                        return (
                          <IonItem
                            key={exhibit.id}
                            button
                            onClick={() => setSelectedExhibit(exhibit.id)}
                            color={selectedExhibit === exhibit.id ? 'primary' : ''}
                          >
                            <IonLabel>
                              <h2>{name}</h2>
                              <p>{description}</p>
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                    </IonList>
                  )}
                </IonCardContent>
              </IonCard>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Exhibits3D;

