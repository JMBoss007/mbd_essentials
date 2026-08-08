/**
 * Six-box (default) OTP entry. A single hidden `TextInput` overlays the
 * visible boxes and owns the real controlled value — the boxes are a pure
 * projection of that string. This gets auto-advance, backspace, and paste
 * for free from normal `TextInput` text-editing behavior instead of manual
 * per-box focus juggling, while staying screen-reader accessible through the
 * one real input underneath.
 *
 * Shared by sign-up and (future) sign-in verification — both are the same
 * "enter the 6-digit code we emailed you" interaction.
 */
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/src/components/ui';
import { colors, radius, spacing } from '@/src/theme';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChangeText: (code: string) => void;
  onSubmitEditing?: () => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  accessibilityLabel?: string;
}

const BOX_HEIGHT = 56;

export function OtpInput({
  length = 6,
  value,
  onChangeText,
  onSubmitEditing,
  error = false,
  disabled = false,
  autoFocus = true,
  accessibilityLabel = 'Verification code',
}: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    // Normalizes pasted content (spaces/hyphens from a copied "123-456") and
    // enforces the digits-only, max-length contract without extra libraries.
    const digitsOnly = text.replace(/\D/g, '').slice(0, length);
    onChangeText(digitsOnly);
  };

  const focusInput = () => inputRef.current?.focus();
  const currentIndex = Math.min(value.length, length - 1);

  return (
    <View>
      <Pressable
        onPress={focusInput}
        style={styles.row}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] ?? '';
          const isFilled = digit.length > 0;
          const isCurrent = isFocused && !disabled && index === currentIndex;

          return (
            <View
              key={index}
              style={[
                styles.box,
                isFilled && styles.boxFilled,
                isCurrent && styles.boxFocused,
                error && styles.boxError,
              ]}>
              <AppText variant="heading1" style={styles.digit}>
                {digit}
              </AppText>
            </View>
          );
        })}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        editable={!disabled}
        caretHidden
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        returnKeyType="done"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={`${value.length} of ${length} digits entered`}
        style={styles.hiddenInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing[8],
  },
  box: {
    flex: 1,
    height: BOX_HEIGHT,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    borderColor: colors.neutral.borderStrong,
    backgroundColor: colors.neutral.surfaceElevated,
  },
  boxFocused: {
    borderColor: colors.brand.lavender,
  },
  boxError: {
    borderColor: colors.semantic.error,
  },
  digit: {
    textAlign: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BOX_HEIGHT,
    opacity: 0,
  },
});
