-- Museum App - Seed Data
-- Run this after 001_initial_schema.sql

-- ============================================================================
-- ARTIFACTS
-- ============================================================================

INSERT INTO artifacts (
  name_en, name_it, name_es, name_fr,
  description_en, description_it, description_es, description_fr,
  image_url, type,
  period, origin, material, dimensions, discovered, condition,
  audio_guide_url
) VALUES
-- Artifact 1: Ancient Pottery
(
  'Ancient Pottery',
  'Ceramica Antica',
  'Cerámica Antigua',
  'Poterie Ancienne',
  'This remarkable piece of pottery dates back to the Bronze Age, approximately 3000-1200 BCE. The intricate geometric patterns and the distinctive red-brown coloring are characteristic of pottery from this era. The vessel was likely used for storing grain or water and shows signs of daily use, including minor chips and wear patterns that tell the story of its ancient owners.',
  'Questo straordinario pezzo di ceramica risale all''Età del Bronzo, circa 3000-1200 a.C. I complessi motivi geometrici e il caratteristico colore rosso-bruno sono tipici della ceramica di quest''epoca. Il vaso era probabilmente usato per conservare grano o acqua e mostra segni di uso quotidiano, inclusi piccoli scheggiature e segni di usura che raccontano la storia dei suoi antichi proprietari.',
  'Esta notable pieza de cerámica se remonta a la Edad del Bronce, aproximadamente 3000-1200 a.C. Los intrincados patrones geométricos y el distintivo color marrón rojizo son característicos de la cerámica de esta era. La vasija probablemente se usaba para almacenar grano o agua y muestra signos de uso diario, incluidas astillas menores y patrones de desgaste que cuentan la historia de sus antiguos dueños.',
  'Cette remarquable pièce de poterie remonte à l''âge du bronze, environ 3000-1200 avant notre ère. Les motifs géométriques complexes et la couleur brun-rouge distinctive sont caractéristiques de la poterie de cette époque. Le récipient était probablement utilisé pour stocker du grain ou de l''eau et montre des signes d''utilisation quotidienne, y compris des éclats mineurs et des motifs d''usure qui racontent l''histoire de ses anciens propriétaires.',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
  'image',
  'Bronze Age (3000-1200 BCE)',
  'Mediterranean Region',
  'Terracotta clay',
  '45cm height, 30cm diameter',
  'Archaeological excavation, 1987',
  'Well preserved with minor restoration',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
),

-- Artifact 2: Historical Artifacts Collection
(
  'Historical Artifacts',
  'Reperti Storici',
  'Artefactos Históricos',
  'Artefacts Historiques',
  'This curated collection represents various periods of human history, showcasing the evolution of craftsmanship and artistic expression. Each piece in this collection has been carefully preserved and studied by our team of archaeologists and historians. The artifacts include tools, decorative items, and everyday objects that provide insight into the daily lives of ancient civilizations.',
  'Questa collezione curata rappresenta vari periodi della storia umana, mostrando l''evoluzione dell''artigianato e dell''espressione artistica. Ogni pezzo di questa collezione è stato accuratamente preservato e studiato dal nostro team di archeologi e storici. I reperti includono strumenti, oggetti decorativi e oggetti di uso quotidiano che forniscono informazioni sulla vita quotidiana delle antiche civiltà.',
  'Esta colección curada representa varios períodos de la historia humana, mostrando la evolución de la artesanía y la expresión artística. Cada pieza de esta colección ha sido cuidadosamente preservada y estudiada por nuestro equipo de arqueólogos e historiadores. Los artefactos incluyen herramientas, artículos decorativos y objetos cotidianos que proporcionan información sobre la vida diaria de las civilizaciones antiguas.',
  'Cette collection organisée représente diverses périodes de l''histoire humaine, mettant en valeur l''évolution de l''artisanat et de l''expression artistique. Chaque pièce de cette collection a été soigneusement préservée et étudiée par notre équipe d''archéologues et d''historiens. Les artefacts comprennent des outils, des objets décoratifs et des objets du quotidien qui donnent un aperçu de la vie quotidienne des civilisations anciennes.',
  'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
  'image',
  'Various periods (500 BCE - 1500 CE)',
  'Multiple locations',
  'Mixed materials (metal, stone, ceramic)',
  'Various sizes',
  'Multiple excavations, 1950-2000',
  'Varied conditions, professionally conserved',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
),

-- Artifact 3: Museum Tour Video
(
  'Museum Tour',
  'Tour del Museo',
  'Tour del Museo',
  'Visite du Musée',
  'Take a comprehensive virtual tour through our museum galleries. This video guide showcases our most prized collections and provides expert commentary on the historical significance of each exhibit. Perfect for visitors planning their trip or for those who want to revisit their favorite pieces from home.',
  'Fai un tour virtuale completo attraverso le gallerie del nostro museo. Questa guida video mostra le nostre collezioni più preziose e fornisce commenti esperti sul significato storico di ogni mostra. Perfetto per i visitatori che pianificano il loro viaggio o per coloro che vogliono rivisitare i loro pezzi preferiti da casa.',
  'Realice un recorrido virtual completo por nuestras galerías del museo. Esta guía en video muestra nuestras colecciones más preciadas y proporciona comentarios expertos sobre el significado histórico de cada exhibición. Perfecto para visitantes que planean su viaje o para aquellos que quieren volver a visitar sus piezas favoritas desde casa.',
  'Faites une visite virtuelle complète de nos galeries de musée. Ce guide vidéo présente nos collections les plus précieuses et fournit des commentaires d''experts sur l''importance historique de chaque exposition. Parfait pour les visiteurs qui planifient leur voyage ou pour ceux qui veulent revisiter leurs pièces préférées depuis chez eux.',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'video',
  'Contemporary (2024)',
  'Museum Collection',
  'Digital media',
  'HD Video, 10 minutes',
  'Produced in-house',
  'Digital format',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
),

-- Artifact 4: Ancient Sculpture
(
  'Ancient Sculpture',
  'Scultura Antica',
  'Escultura Antigua',
  'Sculpture Ancienne',
  'This classical sculpture from ancient Greece represents the pinnacle of Hellenistic artistry. Carved from a single block of Parian marble, it showcases the exceptional skill of ancient sculptors in capturing human form and emotion. The piece depicts a figure in classical contrapposto pose, demonstrating the Greek mastery of naturalistic representation.',
  'Questa scultura classica dell''antica Grecia rappresenta l''apice dell''arte ellenistica. Scolpita da un singolo blocco di marmo pario, mostra l''eccezionale abilità degli scultori antichi nel catturare la forma e l''emozione umana. Il pezzo raffigura una figura in posa classica di contrapposto, dimostrando la maestria greca della rappresentazione naturalistica.',
  'Esta escultura clásica de la antigua Grecia representa el pináculo del arte helenístico. Tallada de un solo bloque de mármol de Paros, muestra la habilidad excepcional de los escultores antiguos para capturar la forma y la emoción humanas. La pieza representa una figura en pose clásica de contrapposto, demostrando el dominio griego de la representación naturalista.',
  'Cette sculpture classique de la Grèce antique représente le summum de l''art hellénistique. Sculptée dans un seul bloc de marbre de Paros, elle met en valeur le talent exceptionnel des sculpteurs anciens pour capturer la forme et l''émotion humaines. La pièce représente une figure en pose classique de contrapposto, démontrant la maîtrise grecque de la représentation naturaliste.',
  'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?w=800',
  'image',
  'Hellenistic Period (323-31 BCE)',
  'Ancient Greece',
  'Parian marble',
  '180cm height, 60cm width',
  'Athens excavation, 1923',
  'Restored, some surface weathering',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
);

-- ============================================================================
-- 3D EXHIBITS
-- ============================================================================

INSERT INTO exhibits_3d (
  name_en, name_it, name_es, name_fr,
  description_en, description_it, description_es, description_fr,
  model_type, model_data, thumbnail_url
) VALUES
-- Exhibit 1: Ancient Globe
(
  'Ancient Globe',
  'Globo Antico',
  'Globo Antiguo',
  'Globe Ancien',
  'A spherical artifact',
  'Un artefatto sferico',
  'Un artefacto esférico',
  'Un artefact sphérique',
  'primitive',
  '{"shape": "sphere", "color": "#8B7355", "size": 2}',
  NULL
),

-- Exhibit 2: Stone Cube
(
  'Stone Cube',
  'Cubo di Pietra',
  'Cubo de Piedra',
  'Cube de Pierre',
  'Carved stone cube',
  'Cubo di pietra scolpito',
  'Cubo de piedra tallado',
  'Cube de pierre sculpté',
  'primitive',
  '{"shape": "box", "color": "#696969", "size": 2}',
  NULL
),

-- Exhibit 3: Column Fragment
(
  'Column Fragment',
  'Frammento di Colonna',
  'Fragmento de Columna',
  'Fragment de Colonne',
  'Piece of ancient column',
  'Pezzo di colonna antica',
  'Pieza de columna antigua',
  'Morceau de colonne ancienne',
  'primitive',
  '{"shape": "cylinder", "color": "#D2B48C", "size": 2}',
  NULL
),

-- Exhibit 4: Skull Model
(
  'Skull Model',
  'Modello di Cranio',
  'Modelo de Cráneo',
  'Modèle de Crâne',
  '3D scanned skull',
  'Cranio scansionato in 3D',
  'Cráneo escaneado en 3D',
  'Crâne scanné en 3D',
  'gltf',
  '{"url": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Skull/glTF-Binary/Skull.glb"}',
  NULL
),

-- Exhibit 5: Damaged Helmet
(
  'Damaged Helmet',
  'Elmo Danneggiato',
  'Casco Dañado',
  'Casque Endommagé',
  'Ancient helmet worn by battle',
  'Elmo antico consumato dalla battaglia',
  'Casco antiguo desgastado por la batalla',
  'Casque ancien usé par la bataille',
  'gltf',
  '{"url": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"}',
  NULL
);

-- ============================================================================
-- QUIZ QUESTIONS
-- ============================================================================

INSERT INTO quiz_questions (
  question_en, question_it, question_es, question_fr,
  option1_en, option1_it, option1_es, option1_fr,
  option2_en, option2_it, option2_es, option2_fr,
  option3_en, option3_it, option3_es, option3_fr,
  option4_en, option4_it, option4_es, option4_fr,
  correct_answer,
  explanation_en, explanation_it, explanation_es, explanation_fr,
  difficulty, category, order_index, is_active
) VALUES
-- Question 1
(
  'What period is the Ancient Pottery from?',
  'Da quale periodo proviene la Ceramica Antica?',
  '¿De qué período es la Cerámica Antigua?',
  'De quelle période provient la Poterie Ancienne?',
  'Iron Age', 'Età del Ferro', 'Edad del Hierro', 'Âge du Fer',
  'Bronze Age', 'Età del Bronzo', 'Edad del Bronce', 'Âge du Bronze',
  'Stone Age', 'Età della Pietra', 'Edad de Piedra', 'Âge de Pierre',
  'Medieval Period', 'Periodo Medievale', 'Período Medieval', 'Période Médiévale',
  1,
  'The Ancient Pottery dates back to the Bronze Age, approximately 3000-1200 BCE.',
  'La Ceramica Antica risale all''Età del Bronzo, circa 3000-1200 a.C.',
  'La Cerámica Antigua se remonta a la Edad del Bronce, aproximadamente 3000-1200 a.C.',
  'La Poterie Ancienne remonte à l''âge du bronze, environ 3000-1200 avant notre ère.',
  'medium', 'history', 1, true
),

-- Question 2
(
  'Where was the Ancient Sculpture discovered?',
  'Dove è stata scoperta la Scultura Antica?',
  '¿Dónde se descubrió la Escultura Antigua?',
  'Où la Sculpture Ancienne a-t-elle été découverte?',
  'Rome', 'Roma', 'Roma', 'Rome',
  'Athens', 'Atene', 'Atenas', 'Athènes',
  'Egypt', 'Egitto', 'Egipto', 'Égypte',
  'Mesopotamia', 'Mesopotamia', 'Mesopotamia', 'Mésopotamie',
  1,
  'The Ancient Sculpture is a classical piece from ancient Greece, discovered in Athens.',
  'La Scultura Antica è un pezzo classico dell''antica Grecia, scoperto ad Atene.',
  'La Escultura Antigua es una pieza clásica de la antigua Grecia, descubierta en Atenas.',
  'La Sculpture Ancienne est une pièce classique de la Grèce antique, découverte à Athènes.',
  'medium', 'geography', 2, true
),

-- Question 3
(
  'What material is the Ancient Pottery made from?',
  'Di quale materiale è fatta la Ceramica Antica?',
  '¿De qué material está hecha la Cerámica Antigua?',
  'De quel matériau la Poterie Ancienne est-elle faite?',
  'Bronze', 'Bronzo', 'Bronce', 'Bronze',
  'Marble', 'Marmo', 'Mármol', 'Marbre',
  'Terracotta', 'Terracotta', 'Terracota', 'Terre cuite',
  'Gold', 'Oro', 'Oro', 'Or',
  2,
  'Ancient pottery was typically made from terracotta, a type of fired clay.',
  'La ceramica antica era tipicamente fatta di terracotta, un tipo di argilla cotta.',
  'La cerámica antigua se hacía típicamente de terracota, un tipo de arcilla cocida.',
  'La poterie ancienne était généralement faite de terre cuite, un type d''argile cuite.',
  'easy', 'materials', 3, true
),

-- Question 4
(
  'Which civilization is known for creating the first museums?',
  'Quale civiltà è nota per aver creato i primi musei?',
  '¿Qué civilización es conocida por crear los primeros museos?',
  'Quelle civilisation est connue pour avoir créé les premiers musées?',
  'Romans', 'Romani', 'Romanos', 'Romains',
  'Greeks', 'Greci', 'Griegos', 'Grecs',
  'Egyptians', 'Egiziani', 'Egipcios', 'Égyptiens',
  'Chinese', 'Cinesi', 'Chinos', 'Chinois',
  1,
  'The ancient Greeks created the first museums, called "Mouseion" (temples of the Muses).',
  'Gli antichi Greci crearono i primi musei, chiamati "Mouseion" (templi delle Muse).',
  'Los antiguos griegos crearon los primeros museos, llamados "Mouseion" (templos de las Musas).',
  'Les anciens Grecs ont créé les premiers musées, appelés "Mouseion" (temples des Muses).',
  'hard', 'history', 4, true
),

-- Question 5
(
  'What is the primary purpose of museum conservation?',
  'Qual è lo scopo principale della conservazione museale?',
  '¿Cuál es el propósito principal de la conservación museística?',
  'Quel est le but principal de la conservation muséale?',
  'To make artifacts look new', 'Far sembrare nuovi i reperti', 'Hacer que los artefactos parezcan nuevos', 'Faire paraître les artefacts neufs',
  'To preserve artifacts for future generations', 'Preservare i reperti per le generazioni future', 'Preservar artefactos para generaciones futuras', 'Préserver les artefacts pour les générations futures',
  'To increase artifact value', 'Aumentare il valore dei reperti', 'Aumentar el valor de los artefactos', 'Augmenter la valeur des artefacts',
  'To clean artifacts regularly', 'Pulire regolarmente i reperti', 'Limpiar artefactos regularmente', 'Nettoyer régulièrement les artefacts',
  1,
  'Conservation aims to preserve artifacts in their current state for future generations to study and enjoy.',
  'La conservazione mira a preservare i reperti nel loro stato attuale per le generazioni future da studiare e apprezzare.',
  'La conservación tiene como objetivo preservar los artefactos en su estado actual para que las generaciones futuras los estudien y disfruten.',
  'La conservation vise à préserver les artefacts dans leur état actuel pour que les générations futures puissent les étudier et en profiter.',
  'medium', 'conservation', 5, true
);

-- ============================================================================
-- COMPLETED
-- ============================================================================
-- Seed data inserted successfully!
-- Next steps:
-- 1. Verify data in Supabase Dashboard
-- 2. Test queries from your application
-- 3. Configure storage buckets for images/audio

