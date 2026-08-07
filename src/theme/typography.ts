import type { TextStyle } from 'react-native';

/**
 * Inter static font faces, keyed to match the names passed to `useFonts` at
 * the app root. Weight lives in the font family itself (static faces), so
 * typography variants intentionally omit `fontWeight` — combining a numeric
 * fontWeight with a named static face can make Android pick the wrong glyph
 * or silently fake-bold.
 */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export interface TypographyVariant extends Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'> {}

export const typography = {
  display1: { fontFamily: fontFamily.extraBold, fontSize: 32, lineHeight: 40 },
  display2: { fontFamily: fontFamily.extraBold, fontSize: 28, lineHeight: 36 },
  heading1: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 },
  heading2: { fontFamily: fontFamily.semiBold, fontSize: 18, lineHeight: 24 },
  bodyLarge: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22 },
  caption: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TypographyVariant>;

export type TypographyVariantName = keyof typeof typography;
