import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, gradients, radius } from '@/src/theme';

export interface ProgressBarProps {
  /** Progress value from 0 to 1. */
  value: number;
  height?: number;
  gradient?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({ value, height = 8, gradient = true, accessibilityLabel, style }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));

  return (
    <View
      style={[styles.track, { height, borderRadius: height / 2 }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? 'Progress'}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}>
      {gradient ? (
        <LinearGradient
          colors={gradients.performance}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${clamped * 100}%`, borderRadius: height / 2 }]}
        />
      ) : (
        <View
          style={[
            styles.fill,
            { width: `${clamped * 100}%`, borderRadius: height / 2, backgroundColor: colors.brand.lavender },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.neutral.surfaceElevated,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
});
