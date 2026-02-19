/** Converts a hex color to rgba with the given alpha */
export function withAlpha(color: string, alpha: number): string {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const shared = {
  primary: '#4ECDC4',
  primaryLight: '#7EDCD6',
  primaryDark: '#3BA99F',

  accent1: '#FF6B6B',
  accent2: '#4ECDC4',
  accent3: '#FFE66D',
  accent4: '#95E1D3',
  accent5: '#F38181',
  accent6: '#292F36',

  streakFire: '#FF9500',
  streakGold: '#FFD700',

  success: '#4ECDC4',
  warning: '#FFE66D',
  error: '#FF6B6B',
};

export const darkColors = {
  ...shared,
  background: '#040404',
  backgroundSecondary: '#111111',
  backgroundTertiary: '#1A1A1A',

  textPrimary: '#F7FFF7',
  textSecondary: '#A8B0A8',
  textTertiary: '#8A918A',
  textInverse: '#040404',

  onPrimary: '#FFFFFF',
  onSuccess: '#FFFFFF',
  onError: '#FFFFFF',

  border: '#1E1E1E',
  borderLight: '#2A2A2A',

  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(247, 255, 247, 0.05)',
  overlayHeavy: 'rgba(10, 10, 15, 0.95)',
  overlayTextPrimary: '#FFFFFF',
  overlayTextSecondary: 'rgba(255, 255, 255, 0.7)',
  overlayTextTertiary: 'rgba(255, 255, 255, 0.6)',

  warningText: '#FFE66D',
  successText: '#4ECDC4',
  streakFireText: '#FF9500',

  tabBarBg: 'rgba(4, 4, 4, 0.92)',
  tabBarActiveBg: 'rgba(78, 205, 196, 0.12)',
};

export const lightColors: typeof darkColors = {
  ...shared,
  background: '#F7FFF7',
  backgroundSecondary: '#EDF5ED',
  backgroundTertiary: '#E3EBE3',

  textPrimary: '#292F36',
  textSecondary: '#5A6260',
  textTertiary: '#8A928F',
  textInverse: '#F7FFF7',

  onPrimary: '#FFFFFF',
  onSuccess: '#FFFFFF',
  onError: '#FFFFFF',

  border: '#D6DED6',
  borderLight: '#C8D0C8',

  overlay: 'rgba(0, 0, 0, 0.3)',
  overlayLight: 'rgba(41, 47, 54, 0.03)',
  overlayHeavy: 'rgba(10, 10, 15, 0.95)',
  overlayTextPrimary: '#FFFFFF',
  overlayTextSecondary: 'rgba(255, 255, 255, 0.7)',
  overlayTextTertiary: 'rgba(255, 255, 255, 0.6)',

  warningText: '#9E8600',
  successText: '#2A8A83',
  streakFireText: '#C47400',

  tabBarBg: 'rgba(247, 255, 247, 0.90)',
  tabBarActiveBg: 'rgba(78, 205, 196, 0.10)',
};

export type ThemeColors = typeof darkColors;

// Default export for backward compat
export const colors = darkColors;

/** Avatar color palette with WCAG-compliant text variants */
export const avatarColors = {
  palette: ['#7C5CFC', '#FF6B6B', '#4ECDC4', '#FFE66D', '#F38181', '#95E1D3'],
  textPalette: ['#5A3FD4', '#D44545', '#2A8A83', '#9E8600', '#C95A5A', '#3BA99F'],
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const typography = {
  hero: { fontSize: 34, fontWeight: '800' as const, letterSpacing: -0.5 },
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.3 },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
  captionBold: { fontSize: 13, fontWeight: '600' as const },
  tiny: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.5 },
  micro: { fontSize: 10, fontWeight: '500' as const },
  tabLabel: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 0.3 },
};

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

export const layout = {
  tabBarClearance: 120,
  iconButtonSm: 36,
  iconButtonMd: 44,
  iconButtonLg: 56,
  avatarCheckSize: 28,
} as const;
