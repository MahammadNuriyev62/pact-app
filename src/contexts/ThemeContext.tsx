import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors, ThemeColors } from '@/constants/theme';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
  mode: 'system',
  setMode: () => {},
});

const STORAGE_KEY = '@pact_theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setModeState(stored);
      }
      setLoaded(true);
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const isDark =
    mode === 'system' ? systemScheme !== 'light' : mode === 'dark';

  const colors = isDark ? darkColors : lightColors;

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ colors, isDark, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
