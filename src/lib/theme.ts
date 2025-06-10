
export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  mode: 'light' | 'dark';
}

export const defaultTheme: ThemeConfig = {
  primary: '#000000',
  secondary: '#ffffff', 
  background: '#ffffff',
  foreground: '#000000',
  mode: 'light'
};

export const magentaTheme: ThemeConfig = {
  primary: '#d946ef',
  secondary: '#000000',
  background: '#ffffff',
  foreground: '#000000',
  mode: 'light'
};

export const darkTheme: ThemeConfig = {
  primary: '#ffffff',
  secondary: '#000000',
  background: '#000000',
  foreground: '#ffffff',
  mode: 'dark'
};

export const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--foreground', theme.foreground);
  root.classList.toggle('dark', theme.mode === 'dark');
};
