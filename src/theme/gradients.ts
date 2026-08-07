import { brand, neutral } from './colors';

/**
 * Centralized gradient definitions for expo-linear-gradient.
 * Use sparingly and intentionally — see docs/DESIGN_SYSTEM.md.
 */
export const gradients = {
  /** Primary CTA: darkPlum -> lavender. */
  primaryCta: [brand.darkPlum, brand.lavender] as const,
  /** Performance / secondary accent: royalPurple -> brighter lavender-purple. */
  performance: [brand.royalPurple, '#8C68FF'] as const,
  /** Accent gradient for highlights. */
  accent: ['#7A4DFF', '#C19CFF'] as const,
  /** Subtle dark surface gradient for elevated panels. */
  darkSurface: [neutral.darkSurface, neutral.surface] as const,
} as const;

/**
 * Low-opacity ambient glow colors. Keep glows subtle — never a full-opacity
 * purple halo around every surface.
 */
export const glow = {
  lavender: 'rgba(178, 140, 255, 0.18)',
  lavenderStrong: 'rgba(178, 140, 255, 0.4)',
  plum: 'rgba(42, 24, 53, 0.35)',
} as const;
