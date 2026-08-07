import { Platform, type ViewStyle } from 'react-native';

interface ShadowLevel {
  offsetY: number;
  radius: number;
  opacity: number;
  elevation: number;
}

/**
 * Android (the primary test target) ignores iOS shadow* props, so elevation
 * is the real shadow there. iOS/web get the softer shadow* treatment.
 */
function buildShadow({ offsetY, radius, opacity, elevation }: ShadowLevel): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation };
  }
  return {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
}

export const shadows = {
  sm: buildShadow({ offsetY: 2, radius: 6, opacity: 0.25, elevation: 3 }),
  md: buildShadow({ offsetY: 8, radius: 24, opacity: 0.35, elevation: 8 }),
  lg: buildShadow({ offsetY: 16, radius: 40, opacity: 0.45, elevation: 16 }),
} satisfies Record<'sm' | 'md' | 'lg', ViewStyle>;

/**
 * Very subtle accent glow for a selected/important element. Android elevation
 * shadows can't be tinted reliably, so Android gets a soft lavender rim
 * instead of a colored shadow. Use sparingly — never on every card.
 */
export const accentGlow: ViewStyle =
  Platform.OS === 'android'
    ? { borderWidth: 1, borderColor: 'rgba(178, 140, 255, 0.4)', elevation: 6 }
    : {
        shadowColor: '#B28CFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      };
