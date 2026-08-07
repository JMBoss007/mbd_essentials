import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/src/theme';

import { AppText } from './AppText';

export type BadgeStatus = 'default' | 'selected' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  label: string;
  status?: BadgeStatus;
}

const STATUS_STYLES: Record<BadgeStatus, { bg: string; border: string; text: string }> = {
  default: {
    bg: colors.neutral.surfaceElevated,
    border: colors.neutral.border,
    text: colors.neutral.textSecondary,
  },
  selected: {
    bg: 'rgba(178, 140, 255, 0.15)',
    border: colors.brand.lavender,
    text: colors.brand.lavender,
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.12)',
    border: colors.semantic.success,
    text: colors.semantic.success,
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.12)',
    border: colors.semantic.warning,
    text: colors.semantic.warning,
  },
  error: {
    bg: 'rgba(239, 68, 68, 0.12)',
    border: colors.semantic.error,
    text: colors.semantic.error,
  },
};

export function Badge({ label, status = 'default' }: BadgeProps) {
  const palette = STATUS_STYLES[status];

  return (
    <View style={[styles.base, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <AppText variant="caption" style={{ color: palette.text }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
  },
});
