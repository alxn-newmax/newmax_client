import React, { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type ThemeType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeType>({
  theme: '',
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  }

  const themeValue: ThemeType = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={themeValue}>{props.children}</ThemeContext.Provider>;
};

export default ThemeContext;
