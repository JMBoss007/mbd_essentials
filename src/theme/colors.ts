/**
 * Canonical MBD Essentials color tokens.
 * Source of truth — do not scatter raw hex strings in components.
 * Mirrored (necessarily) into tailwind.config.js as `mbd-*` classes, since
 * Tailwind's config runs in plain Node and cannot import this TS module.
 * Keep both in sync if these values ever change.
 */

export const brand = {
  deepBrown: '#1A1412',
  darkPlum: '#2A1835',
  royalPurple: '#5B3DCC',
  lavender: '#B28CFF',
} as const;

export const neutral = {
  charcoal: '#0E0B10',
  background: '#0E0B10',
  darkSurface: '#151218',
  surface: '#1F1A22',
  surfaceElevated: '#25202A',
  border: '#2E2833',
  borderStrong: '#44394D',
  textPrimary: '#F4F2F7',
  textSecondary: '#B8B1C1',
  textMuted: '#81798B',
  disabled: '#625B68',
} as const;

export const semantic = {
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#4EA1FF',
} as const;

export const colors = {
  brand,
  neutral,
  semantic,
} as const;
