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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Gallery.css';

const Gallery: React.FC = () => {
  // Sample museum items - replace with your actual content
  const galleryItems = [
    {
      id: 1,
      title: 'Ancient Pottery',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
      description: 'Ancient pottery from the Bronze Age',
    },
    {
      id: 2,
      title: 'Historical Artifacts',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
      description: 'Collection of historical artifacts',
    },
    {
      id: 3,
      title: 'Museum Tour',
      type: 'video',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Virtual tour of the museum',
    },
    {
      id: 4,
      title: 'Ancient Sculpture',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800',
      description: 'Classical sculpture from ancient Greece',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Museum Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonGrid>
          <IonRow>
            {galleryItems.map((item) => (
              <IonCol size="12" sizeMd="6" key={item.id}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{item.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="gallery-media"
                      />
                    ) : (
                      <video
                        controls
                        className="gallery-media"
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <p style={{ marginTop: '12px' }}>{item.description}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Gallery;

