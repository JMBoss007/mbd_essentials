import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariantName } from '@/src/theme';

export type AppTextColor = 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariantName;
  color?: AppTextColor;
}

const COLOR_MAP: Record<AppTextColor, string> = {
  primary: colors.neutral.textPrimary,
  secondary: colors.neutral.textSecondary,
  muted: colors.neutral.textMuted,
  success: colors.semantic.success,
  warning: colors.semantic.warning,
  error: colors.semantic.error,
};

export function AppText({ variant = 'body', color = 'primary', style, ...rest }: AppTextProps) {
  return (
    <Text
      allowFontScaling
      style={[typography[variant], { color: COLOR_MAP[color] }, style]}
      {...rest}
    />
  );
}
