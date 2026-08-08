import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, radius, spacing, typography } from '@/src/theme';

import { AppText } from './AppText';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface AppInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'sentences',
  autoCorrect,
  autoComplete,
  textContentType,
  returnKeyType,
  onSubmitEditing,
  onBlur,
  editable = true,
  accessibilityLabel,
  containerStyle,
}: AppInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.semantic.error
    : focused
      ? colors.brand.lavender
      : colors.neutral.border;

  return (
    <View style={containerStyle}>
      {label && (
        <AppText variant="body" color="secondary" style={styles.label}>
          {label}
        </AppText>
      )}
      <View style={[styles.inputRow, { borderColor }, !editable && styles.disabled]}>
        {leftIcon && <Ionicons name={leftIcon} size={18} color={colors.neutral.textMuted} style={styles.leftIcon} />}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          accessibilityLabel={accessibilityLabel ?? label}
          style={styles.input}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={18}
            color={colors.neutral.textMuted}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
      {(error || helperText) && (
        <AppText variant="caption" color={error ? 'error' : 'muted'} style={styles.helper}>
          {error ?? helperText}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing[8],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: spacing[16],
  },
  input: {
    flex: 1,
    ...typography.bodyLarge,
    color: colors.neutral.textPrimary,
    paddingVertical: spacing[12],
  },
  leftIcon: {
    marginRight: spacing[8],
  },
  rightIcon: {
    marginLeft: spacing[8],
  },
  helper: {
    marginTop: spacing[8],
  },
  disabled: {
    opacity: 0.5,
  },
});
