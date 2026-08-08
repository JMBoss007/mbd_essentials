import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppInput, AppText, Button, IconButton, Screen } from '@/src/components/ui';
import { colors, glow, radius, spacing } from '@/src/theme';

/**
 * Practical, not RFC 5322: local@domain.tld. Authoritative validation happens
 * server-side once Clerk is integrated — this only prevents obviously
 * malformed submissions.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [hasBlurred, setHasBlurred] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const trimmedEmail = email.trim();
  const isEmpty = trimmedEmail.length === 0;
  const isValid = !isEmpty && isValidEmail(trimmedEmail);
  const showError = (hasBlurred || submitAttempted) && !isEmpty && !isValid;

  const handleBack = () => router.back();

  const handleSignIn = () => router.push('/sign-in');

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (!isValid) {
      return;
    }
    router.push({ pathname: '/verify-email', params: { mode: 'sign-up', email: trimmedEmail } });
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton icon="arrow-back" onPress={handleBack} accessibilityLabel="Go back" />
      </View>

      <View style={styles.illustrationSection} importantForAccessibility="no-hide-descendants">
        <View style={styles.glowOuter} pointerEvents="none" />
        <View style={styles.ring} pointerEvents="none">
          <Ionicons name="mail-outline" size={56} color={colors.brand.lavender} />
        </View>
      </View>

      <View style={styles.copySection}>
        <AppText variant="caption" style={styles.eyebrow}>
          CREATE ACCOUNT
        </AppText>
        <AppText variant="display1" style={styles.headline}>
          {"What's your\nemail address?"}
        </AppText>
        <AppText variant="body" color="secondary" style={styles.supportingText}>
          We&apos;ll send a 6-digit code to verify your email address.
        </AppText>
      </View>

      <View style={styles.fieldSection}>
        <AppInput
          label="EMAIL ADDRESS"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          error={showError ? 'Enter a valid email address.' : undefined}
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          onBlur={() => setHasBlurred(true)}
          accessibilityLabel="Email address"
        />
      </View>

      <View style={styles.ctaSection}>
        <Button
          title="Send Code"
          onPress={handleSubmit}
          variant="primary"
          fullWidth
          disabled={!isValid}
          accessibilityLabel="Send Code"
        />
        <Pressable
          onPress={handleSignIn}
          style={styles.signInRow}
          accessibilityRole="button"
          accessibilityLabel="Already have an account? Sign In">
          <AppText variant="body" color="secondary">
            Already have an account?{' '}
            <AppText variant="body" style={styles.signInLink}>
              Sign In
            </AppText>
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing[8],
    paddingBottom: spacing[24],
  },
  header: {
    alignItems: 'flex-start',
  },
  illustrationSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginTop: spacing[8],
  },
  glowOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: radius.full,
    backgroundColor: glow.lavender,
  },
  ring: {
    width: 112,
    height: 112,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(178, 140, 255, 0.35)',
    backgroundColor: colors.neutral.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copySection: {
    alignItems: 'center',
    marginTop: spacing[24],
    marginBottom: spacing[32],
  },
  eyebrow: {
    letterSpacing: 2,
    marginBottom: spacing[8],
    color: colors.brand.lavender,
    textAlign: 'center',
  },
  headline: {
    textAlign: 'center',
    marginBottom: spacing[12],
  },
  supportingText: {
    textAlign: 'center',
    maxWidth: 300,
  },
  fieldSection: {
    marginBottom: spacing[24],
  },
  ctaSection: {
    marginTop: 'auto',
    gap: spacing[12],
    paddingTop: spacing[24],
  },
  signInRow: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  signInLink: {
    color: colors.brand.lavender,
  },
});
