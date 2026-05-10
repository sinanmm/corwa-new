import { create } from 'zustand';

interface AppState {
  language: 'malayalam' | 'english';
  theme: 'light' | 'dark';
  toggleLanguage: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: 'malayalam' | 'english') => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'english', // Options: malayalam, english
  theme: 'light',
  toggleLanguage: () =>
    set((state) => ({ language: state.language === 'english' ? 'malayalam' : 'english' })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (lang) => set({ language: lang }),
  setTheme: (theme) => set({ theme: theme }),
}));
