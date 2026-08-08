/**
 * TEMPORARY PLACEHOLDER — NOT REAL ACCOUNT CREATION.
 *
 * This route exists only so the Authentication Introduction screen has
 * somewhere to navigate to. Account creation is a separate, not-yet-started
 * task. Replace this entire file when that task begins.
 */
import { router } from 'expo-router';

import { AppText, Button, Screen } from '@/src/components/ui';
import { spacing } from '@/src/theme';

export default function SignUpPlaceholderScreen() {
  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', gap: spacing[16] }}>
      <AppText variant="heading1">Create Account setup is next.</AppText>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => router.back()}
        accessibilityLabel="Back"
      />
    </Screen>
  );
}
