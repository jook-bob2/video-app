// themes.ts

export type ThemeName = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
