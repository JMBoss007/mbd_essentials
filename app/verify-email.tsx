import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, IconButton, Screen } from '@/src/components/ui';
import { OtpInput } from '@/src/features/auth/components/OtpInput';
import { colors, glow, radius, spacing } from '@/src/theme';
import { isAuthMode, type AuthMode } from '@/src/types/auth';

/** Same practical (not RFC 5322) check used on /sign-up; kept local since it's tiny. */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ mode?: string; email?: string }>();

  const mode: AuthMode = isAuthMode(params.mode) ? params.mode : 'sign-up';
  const email = typeof params.email === 'string' ? params.email : undefined;
  const hasValidEmail = !!email && EMAIL_REGEX.test(email);

  // Sign-in isn't built yet; this only decides where "back to email" lands.
  const emailEntryRoute = mode === 'sign-in' ? '/sign-in' : '/sign-up';

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS);

  const isComplete = code.length === OTP_LENGTH;
  const resendReady = secondsRemaining === 0;

  useEffect(() => {
    if (resendReady) {
      return;
    }
    const intervalId = setInterval(() => {
      setSecondsRemaining((previous) => Math.max(previous - 1, 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [resendReady]);

  const handleBackToEmail = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(emailEntryRoute);
  }, [emailEntryRoute]);

  const handleVerifyPress = () => {
    if (!isComplete) {
      return;
    }
    setErrorMessage(null);
    // TEMPORARY: no real verification exists yet. Replace with a Clerk
    // verify-code call (loading state + inline error via `errorMessage`)
    // in the next task. Never treat this as a successful sign-in.
    Alert.alert(
      'Not connected yet',
      'Real code verification will be connected with Clerk in the next step.'
    );
  };

  const handleResendPress = () => {
    if (!resendReady) {
      return;
    }
    setSecondsRemaining(RESEND_SECONDS);
    // TEMPORARY: no email is actually sent yet — do not claim otherwise.
    Alert.alert(
      'Not connected yet',
      'Real code resend will be connected with Clerk in the next step.'
    );
  };

  if (!hasValidEmail) {
    return (
      <Screen contentContainerStyle={styles.fallbackContent}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-back"
            onPress={handleBackToEmail}
            accessibilityLabel="Back to email"
          />
        </View>
        <View style={styles.fallbackBody}>
          <AppText variant="heading1" style={styles.fallbackHeading}>
            We couldn&apos;t find that email
          </AppText>
          <AppText variant="body" color="secondary" style={styles.fallbackText}>
            Go back and enter your email address to receive a verification code.
          </AppText>
          <Button
            title="Back to email"
            variant="primary"
            fullWidth
            onPress={handleBackToEmail}
            accessibilityLabel="Back to email"
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-back"
          onPress={handleBackToEmail}
          accessibilityLabel="Back to email"
        />
      </View>

      <View style={styles.illustrationSection} importantForAccessibility="no-hide-descendants">
        <View style={styles.glowOuter} pointerEvents="none" />
        <View style={styles.ring} pointerEvents="none">
          <Ionicons name="shield-checkmark" size={56} color={colors.brand.lavender} />
        </View>
      </View>

      <View style={styles.copySection}>
        <AppText variant="caption" style={styles.eyebrow}>
          ENTER VERIFICATION CODE
        </AppText>
        <AppText variant="display1" style={styles.headline}>
          Check your email
        </AppText>
        <AppText variant="body" color="secondary" style={styles.supportingText}>
          Enter the 6-digit code we sent to
        </AppText>
        <AppText variant="bodyLarge" style={styles.emailText}>
          {email}
        </AppText>
      </View>

      <View style={styles.otpSection}>
        <OtpInput
          length={OTP_LENGTH}
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleVerifyPress}
          error={!!errorMessage}
          accessibilityLabel="6-digit verification code"
        />
        {errorMessage && (
          <AppText variant="caption" color="error" style={styles.errorText}>
            {errorMessage}
          </AppText>
        )}
      </View>

      <View style={styles.resendSection}>
        {resendReady ? (
          <Pressable
            onPress={handleResendPress}
            style={styles.resendRow}
            accessibilityRole="button"
            accessibilityLabel="Resend Code">
            <AppText variant="body" color="secondary">
              Didn&apos;t receive it?{' '}
              <AppText variant="body" style={styles.resendLink}>
                Resend Code
              </AppText>
            </AppText>
          </Pressable>
        ) : (
          <AppText variant="body" color="secondary" style={styles.resendText}>
            Resend code in {formatCountdown(secondsRemaining)}
          </AppText>
        )}
      </View>

      <View style={styles.ctaSection}>
        <Button
          title="Verify Code"
          onPress={handleVerifyPress}
          variant="primary"
          fullWidth
          disabled={!isComplete}
          accessibilityLabel="Verify Code"
        />
        <Button
          title="Back to email"
          variant="ghost"
          fullWidth
          onPress={handleBackToEmail}
          accessibilityLabel="Back to email"
        />
      </View>

      {__DEV__ && (
        <View style={styles.devSection}>
          <AppText variant="caption" color="muted" style={styles.devLabel}>
            DEV ONLY — does not verify or create an account
          </AppText>
          <Button
            title="Preview Account Created UI"
            variant="ghost"
            fullWidth
            onPress={() => router.push('/account-created')}
            accessibilityLabel="Preview Account Created UI (development only)"
          />
        </View>
      )}
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
  },
  emailText: {
    textAlign: 'center',
    marginTop: spacing[4],
  },
  otpSection: {
    marginBottom: spacing[20],
  },
  errorText: {
    marginTop: spacing[12],
    textAlign: 'center',
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: spacing[32],
  },
  resendRow: {
    paddingVertical: spacing[8],
  },
  resendText: {
    textAlign: 'center',
  },
  resendLink: {
    color: colors.brand.lavender,
  },
  ctaSection: {
    marginTop: 'auto',
    gap: spacing[12],
    paddingTop: spacing[24],
  },
  devSection: {
    marginTop: spacing[24],
    paddingTop: spacing[16],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.neutral.border,
    gap: spacing[8],
  },
  devLabel: {
    textAlign: 'center',
    letterSpacing: 1,
  },
  fallbackContent: {
    flexGrow: 1,
    paddingTop: spacing[8],
  },
  fallbackBody: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing[16],
  },
  fallbackHeading: {
    textAlign: 'center',
  },
  fallbackText: {
    textAlign: 'center',
  },
});
