import { useState, useEffect } from 'react';
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
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonBadge,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonSpinner,
} from '@ionic/react';
import { trophy, star, ribbon, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { fetchQuizQuestions, QuizQuestion } from '../services/database';
import './Quiz.css';

const Quiz: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // Get current language
  const currentLang = i18n.language || 'en';

  // Fetch quiz questions from Supabase
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchQuizQuestions();
        setQuizQuestions(data);
        setAnsweredQuestions(new Array(data.length).fill(false));
      } catch (err) {
        console.error('Error loading quiz questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct_answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setShowExplanation(false);
  };

  const getBadge = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { icon: trophy, color: 'warning', text: t('perfectScore') };
    if (percentage >= 80) return { icon: star, color: 'success', text: t('excellent') };
    if (percentage >= 60) return { icon: ribbon, color: 'primary', text: t('goodJob') };
    return { icon: checkmarkCircle, color: 'medium', text: t('keepLearning') };
  };

  const progress = (currentQuestion + 1) / quizQuestions.length;

  // Loading state
  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{t('museumQuiz')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // No questions state
  if (quizQuestions.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{t('museumQuiz')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>{t('noQuestionsFound') || 'No quiz questions available'}</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const question = currentQ[`question_${currentLang}` as keyof QuizQuestion] as string || currentQ.question_en;
  const options = [
    currentQ[`option1_${currentLang}` as keyof QuizQuestion] as string || currentQ.option1_en,
    currentQ[`option2_${currentLang}` as keyof QuizQuestion] as string || currentQ.option2_en,
    currentQ[`option3_${currentLang}` as keyof QuizQuestion] as string || currentQ.option3_en,
    currentQ[`option4_${currentLang}` as keyof QuizQuestion] as string || currentQ.option4_en,
  ];
  const explanation = currentQ[`explanation_${currentLang}` as keyof QuizQuestion] as string || currentQ.explanation_en;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('museumQuiz')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="quiz-container">
          {!showResult ? (
            <>
              {/* Progress Bar */}
              <IonCard>
                <IonCardContent>
                  <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t('question')} {currentQuestion + 1} {t('of')} {quizQuestions.length}</span>
                    <span>{t('score')}: {score}</span>
                  </div>
                  <IonProgressBar value={progress} />
                </IonCardContent>
              </IonCard>

              {/* Question Card */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{question}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRadioGroup
                    value={selectedAnswer}
                    onIonChange={(e) => handleAnswerSelect(e.detail.value)}
                  >
                    {options.map((option, index) => (
                      <IonItem key={index} lines="none">
                        <IonRadio
                          slot="start"
                          value={index}
                          disabled={showExplanation}
                        />
                        <IonLabel className="ion-text-wrap">{option}</IonLabel>
                        {showExplanation && index === currentQ.correct_answer && (
                          <IonIcon icon={checkmarkCircle} color="success" slot="end" />
                        )}
                        {showExplanation && index === selectedAnswer && index !== currentQ.correct_answer && (
                          <IonIcon icon={closeCircle} color="danger" slot="end" />
                        )}
                      </IonItem>
                    ))}
                  </IonRadioGroup>

                  {showExplanation && (
                    <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--ion-color-light)', borderRadius: '8px' }}>
                      <p style={{ margin: 0 }}>
                        <strong>{t('explanation')}:</strong> {explanation}
                      </p>
                    </div>
                  )}

                  <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    {!showExplanation ? (
                      <IonButton
                        expand="block"
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        style={{ flex: 1 }}
                      >
                        {t('submitAnswer')}
                      </IonButton>
                    ) : (
                      <IonButton
                        expand="block"
                        onClick={handleNextQuestion}
                        style={{ flex: 1 }}
                      >
                        {currentQuestion < quizQuestions.length - 1 ? t('nextQuestion') : t('viewResults')}
                      </IonButton>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            </>
          ) : (
            /* Results Card */
            <IonCard>
              <IonCardHeader>
                <IonCardTitle style={{ textAlign: 'center' }}>{t('quizComplete')}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <IonIcon
                    icon={getBadge().icon}
                    style={{ fontSize: '80px' }}
                    color={getBadge().color}
                  />
                  <h2>{getBadge().text}</h2>
                  <h1 style={{ fontSize: '48px', margin: '20px 0' }}>
                    {score} / {quizQuestions.length}
                  </h1>
                  <p style={{ fontSize: '18px', color: 'var(--ion-color-medium)' }}>
                    {t('youScored')} {Math.round((score / quizQuestions.length) * 100)}%
                  </p>

                  {/* Badge Display */}
                  <div style={{ marginTop: '30px' }}>
                    <h3>{t('yourBadges')}</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {score >= 3 && (
                        <IonBadge color="primary" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {t('scholarBadge')}
                        </IonBadge>
                      )}
                      {score >= 4 && (
                        <IonBadge color="success" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {t('expertBadge')}
                        </IonBadge>
                      )}
                      {score === 5 && (
                        <IonBadge color="warning" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {t('masterBadge')}
                        </IonBadge>
                      )}
                    </div>
                  </div>

                  <IonButton
                    expand="block"
                    onClick={handleRestartQuiz}
                    style={{ marginTop: '30px' }}
                  >
                    {t('tryAgain')}
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;

