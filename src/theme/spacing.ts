/**
 * MBD Essentials spacing scale (4/8pt-based).
 * Keyed by pixel value to match the approved scale directly.
 */
export const spacing = {
  0: 0,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  64: 64,
} as const;

export type SpacingKey = keyof typeof spacing;

/** Default horizontal mobile screen padding. */
export const screenPadding = spacing[20];
