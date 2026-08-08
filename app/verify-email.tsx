/**
 * TEMPORARY PLACEHOLDER — NOT REAL EMAIL VERIFICATION.
 *
 * Displays the mode/email handed off from /sign-up so the flow reads as
 * complete. Real 6-digit OTP entry, Clerk code delivery, and verification
 * are a separate, not-yet-started task. Replace this entire file when that
 * task begins.
 */
import { router, useLocalSearchParams } from 'expo-router';

import { AppText, Button, Screen } from '@/src/components/ui';
import { spacing } from '@/src/theme';

export default function VerifyEmailPlaceholderScreen() {
  const { email } = useLocalSearchParams<{ mode?: string; email?: string }>();

  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', gap: spacing[16] }}>
      <AppText variant="heading1">Check your email</AppText>
      <AppText variant="body" color="secondary">
        {email
          ? `We'll send a 6-digit verification code to:\n${email}`
          : "We'll send a 6-digit verification code to your email address."}
      </AppText>
      <AppText variant="caption" color="muted">
        Development note: real code delivery and verification will be connected in the next
        task.
      </AppText>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => router.back()}
        accessibilityLabel="Back"
      />
    </Screen>
  );
}
