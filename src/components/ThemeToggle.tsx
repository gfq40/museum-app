import { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark theme
    const savedTheme = localStorage.getItem('theme');

    // Default to dark theme if no preference is saved
    const shouldBeDark = savedTheme === 'dark' || savedTheme === null;
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (dark: boolean) => {
    document.body.classList.toggle('dark', dark);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <IonButton fill="clear" onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IonIcon icon={isDark ? sunny : moon} />
    </IonButton>
  );
};

export default ThemeToggle;

