import { create } from 'zustand';
import type { DeviceTier } from '../lib/performanceDetect';

interface WorldState {
  scrollProgress: number;
  currentZone: number;
  deviceTier: DeviceTier;
  isLoading: boolean;
  loadingProgress: number;
  naiChatOpen: boolean;
  terminalOpen: boolean;
  language: 'en' | 'ur';

  setScrollProgress: (v: number) => void;
  setCurrentZone: (v: number) => void;
  setDeviceTier: (t: DeviceTier) => void;
  setLoading: (v: boolean) => void;
  setLoadingProgress: (v: number) => void;
  toggleNAI: () => void;
  toggleTerminal: () => void;
  setLanguage: (l: 'en' | 'ur') => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  scrollProgress: 0,
  currentZone: 0,
  deviceTier: {
    tier: 'mid',
    maxParticles: 1500,
    usePostProcessing: false,
    shadowsEnabled: false,
    pixelRatio: 1.5,
  },
  isLoading: true,
  loadingProgress: 0,
  naiChatOpen: false,
  terminalOpen: false,
  language: 'en',

  setScrollProgress: (v) => set({ scrollProgress: v }),
  setCurrentZone: (v) => set({ currentZone: v }),
  setDeviceTier: (t) => set({ deviceTier: t }),
  setLoading: (v) => set({ isLoading: v }),
  setLoadingProgress: (v) => set({ loadingProgress: v }),
  toggleNAI: () => set((state) => ({ naiChatOpen: !state.naiChatOpen })),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setLanguage: (l) => set({ language: l }),
}));
