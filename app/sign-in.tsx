/**
 * TEMPORARY PLACEHOLDER — NOT REAL SIGN-IN.
 *
 * This route exists only so the Authentication Introduction and Welcome
 * screens have somewhere to navigate to. Sign-in is a separate,
 * not-yet-started task. Replace this entire file when that task begins.
 */
import { router } from 'expo-router';

import { AppText, Button, Screen } from '@/src/components/ui';
import { spacing } from '@/src/theme';

export default function SignInPlaceholderScreen() {
  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', gap: spacing[16] }}>
      <AppText variant="heading1">Sign In setup is next.</AppText>
      <Button
        title="Back"
        variant="secondary"
        onPress={() => router.back()}
        accessibilityLabel="Back"
      />
    </Screen>
  );
}
