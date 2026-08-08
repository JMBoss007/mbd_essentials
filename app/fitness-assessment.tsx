/**
 * TEMPORARY PLACEHOLDER — NOT THE REAL FITNESS ASSESSMENT.
 *
 * The real, multi-screen fitness assessment flow (see docs/PRODUCT.md) will
 * be designed and implemented screen-by-screen later. This route exists only
 * so /account-created has a real forward destination to verify route
 * continuity against. Replace this entire file when that task begins.
 */
import { AppText, Screen } from '@/src/components/ui';
import { spacing } from '@/src/theme';

export default function FitnessAssessmentPlaceholderScreen() {
  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', gap: spacing[16] }}>
      <AppText variant="caption" color="muted" style={{ textAlign: 'center', letterSpacing: 1 }}>
        TEMPORARY PLACEHOLDER
      </AppText>
      <AppText variant="heading1" style={{ textAlign: 'center' }}>
        Fitness Assessment is next.
      </AppText>
    </Screen>
  );
}
