/**
 * Account Created / Success screen (Screen 4.3).
 *
 * This is the intended UI destination once Clerk is wired up:
 * /verify-email -> real Clerk verification succeeds -> here -> Continue ->
 * /fitness-assessment. Clerk is NOT connected yet, so nothing on this route
 * creates, checks, or persists any auth/session/plan state — it only renders
 * the success UI and forward navigation. The only current way to reach it is
 * the __DEV__ preview link on /verify-email (see app/verify-email.tsx).
 *
 * Forward-only milestone: intentionally no back button and no "Return to
 * Sign In" action.
 */
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Screen } from '@/src/components/ui';
import { SuccessFeatureCard } from '@/src/features/auth/components/SuccessFeatureCard';
import { colors, glow, gradients, radius, spacing } from '@/src/theme';

export default function AccountCreatedScreen() {
  const handleContinue = () => {
    router.push('/fitness-assessment');
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.illustrationSection} importantForAccessibility="no-hide-descendants">
        <View style={styles.glowOuter} pointerEvents="none" />
        <Ionicons
          name="sparkles"
          size={16}
          color={colors.semantic.success}
          style={styles.sparkleTopLeft}
        />
        <Ionicons
          name="sparkles"
          size={14}
          color={colors.brand.lavender}
          style={styles.sparkleBottomRight}
        />
        <LinearGradient
          colors={gradients.accent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ring}>
          <View style={styles.ringInner}>
            <Ionicons name="checkmark" size={56} color={colors.neutral.textPrimary} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.copySection}>
        <AppText variant="caption" style={styles.eyebrow}>
          ACCOUNT CREATED
        </AppText>
        <AppText variant="display1" style={styles.headline}>
          You&apos;re all set!
        </AppText>
        <AppText variant="body" color="secondary" style={styles.supportingText}>
          {'Welcome to MBD Essentials.\nLet’s build your best self.'}
        </AppText>
      </View>

      <View style={styles.cardsSection}>
        <SuccessFeatureCard
          icon="person-circle-outline"
          title="Your plan is saved"
          description="Always accessible, anytime."
        />
        <SuccessFeatureCard
          icon="barbell-outline"
          title="Track your progress"
          description="See real results and stay on track."
        />
        <SuccessFeatureCard
          icon="star-outline"
          title="Personalized coaching"
          description="Plans and insights built for you."
        />
      </View>

      <View style={styles.ctaSection}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          fullWidth
          accessibilityLabel="Continue"
        />
        <View style={styles.footerRow}>
          <Ionicons name="lock-closed" size={14} color={colors.neutral.textMuted} />
          <AppText variant="caption" color="muted">
            Your account is secure and ready.
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing[32],
    paddingBottom: spacing[24],
  },
  illustrationSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  glowOuter: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: radius.full,
    backgroundColor: glow.lavender,
  },
  sparkleTopLeft: {
    position: 'absolute',
    top: 12,
    left: '22%',
    opacity: 0.8,
  },
  sparkleBottomRight: {
    position: 'absolute',
    bottom: 16,
    right: '20%',
    opacity: 0.7,
  },
  ring: {
    width: 132,
    height: 132,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 116,
    height: 116,
    borderRadius: radius.full,
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
  cardsSection: {
    gap: spacing[12],
    marginBottom: spacing[32],
  },
  ctaSection: {
    marginTop: 'auto',
    gap: spacing[16],
    paddingTop: spacing[24],
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[8],
  },
});
