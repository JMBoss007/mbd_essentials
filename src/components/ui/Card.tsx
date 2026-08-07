import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/src/theme';

export type CardVariant = 'surface' | 'elevated' | 'outlined';

export interface CardProps extends PropsWithChildren {
  variant?: CardVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function Card({ children, variant = 'surface', onPress, style, accessibilityLabel }: CardProps) {
  const content = <View style={[styles.base, styles[variant], style]}>{children}</View>;

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing[16],
  },
  surface: {
    backgroundColor: colors.neutral.surface,
  },
  elevated: {
    backgroundColor: colors.neutral.surfaceElevated,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.neutral.surface,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  pressed: {
    opacity: 0.9,
  },
});
