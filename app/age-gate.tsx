/**
 * TEMPORARY PLACEHOLDER — NOT THE REAL AGE GATE.
 *
 * This route exists only so the Welcome screen's "Get Started" button has
 * somewhere safe to navigate to while validating navigation. The actual
 * age-confirmation UI is a separate, not-yet-started task. Replace this
 * entire file when that task begins.
 */
import { router } from 'expo-router';

import { Button, Screen, AppText } from '@/src/components/ui';
import { spacing } from '@/src/theme';

export default function AgeGatePlaceholderScreen() {
  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', gap: spacing[16] }}>
      <AppText variant="heading1">Age Gate — Coming Soon</AppText>
      <AppText variant="body" color="secondary">
        This is a temporary placeholder screen used to validate navigation from
        the Welcome screen. The real age-confirmation experience has not been
        built yet.
      </AppText>
      <Button title="Back to Welcome" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
