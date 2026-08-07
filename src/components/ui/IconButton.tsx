import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

import { colors } from '@/src/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
  selected?: boolean;
  accessibilityLabel: string;
}

export function IconButton({ icon, onPress, size = 44, disabled = false, selected = false, accessibilityLabel }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected }}
      android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: true, radius: size / 2 }}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: selected ? 'rgba(178, 140, 255, 0.15)' : colors.neutral.surfaceElevated,
          borderColor: selected ? colors.brand.lavender : colors.neutral.border,
        },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Ionicons name={icon} size={size * 0.45} color={selected ? colors.brand.lavender : colors.neutral.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
