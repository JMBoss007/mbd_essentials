/** MBD Essentials border radius scale. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 999,
} as const;

export type RadiusKey = keyof typeof radius;
