import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, Card, IconButton, Screen } from '@/src/components/ui';
import { colors, glow, radius, spacing } from '@/src/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface Benefit {
  icon: IconName;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: 'person-outline',
    title: 'Your plans, saved and always accessible',
    description: 'Access your training anywhere, anytime.',
  },
  {
    icon: 'barbell-outline',
    title: 'Track progress across all your devices',
    description: 'See your improvements and stay on track.',
  },
  {
    icon: 'sparkles-outline',
    title: 'Personalized coaching and recommendations',
    description: 'Plans that adapt to you and your goals.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Secure, private, and in your control',
    description: 'Your account helps keep your training data organized and protected.',
  },
  {
    icon: 'trending-up-outline',
    title: 'Built for consistency and long-term results',
    description: 'Stay disciplined. See real, lasting change.',
  },
];

function BenefitCard({ icon, title, description }: Benefit) {
  return (
    <Card variant="surface" style={styles.benefitCard}>
      <View style={styles.benefitRow} accessible accessibilityLabel={`${title}. ${description}`}>
        <View style={styles.iconCircle} importantForAccessibility="no-hide-descendants">
          <Ionicons name={icon} size={20} color={colors.brand.lavender} />
        </View>
        <View style={styles.benefitText}>
          <AppText variant="heading2" style={styles.benefitTitle}>
            {title}
          </AppText>
          <AppText variant="body" color="secondary">
            {description}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

export default function AuthIntroScreen() {
  const handleBack = () => router.back();
  const handleCreateAccount = () => router.push('/sign-up');
  const handleSignIn = () => router.push('/sign-in');

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton icon="arrow-back" onPress={handleBack} accessibilityLabel="Back to Age Gate" />
      </View>

      <View style={styles.illustrationSection}>
        <View style={styles.glowOuter} pointerEvents="none" />
        <View style={styles.glowInner} pointerEvents="none" />
        <View style={styles.lockWrap}>
          <Ionicons name="lock-closed" size={88} color={colors.brand.lavender} />
        </View>
      </View>

      <View style={styles.copySection}>
        <AppText variant="caption" style={styles.eyebrow}>
          ONE ACCOUNT. EVERYTHING UNLOCKED.
        </AppText>
        <AppText variant="display1" style={styles.headline}>
          {'Create your account\nto unlock your potential.'}
        </AppText>
        <AppText variant="body" color="secondary" style={styles.supportingText}>
          Save your progress, get personalized plans, and train smarter with MBD Essentials.
        </AppText>
      </View>

      <View style={styles.benefitsSection}>
        {BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Button
          title="Create Account"
          onPress={handleCreateAccount}
          variant="primary"
          fullWidth
          accessibilityLabel="Create Account"
        />
        <Button
          title="I already have an account"
          onPress={handleSignIn}
          variant="ghost"
          fullWidth
          accessibilityLabel="I already have an account"
        />
        <View style={styles.privacyRow} accessible accessibilityLabel="We take your privacy seriously.">
          <Ionicons name="lock-closed-outline" size={14} color={colors.neutral.textMuted} />
          <AppText variant="caption" color="muted" style={styles.privacyText}>
            We take your privacy seriously.
          </AppText>
        </View>
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
    height: 180,
    marginTop: spacing[8],
    marginBottom: 0,
  },
  glowOuter: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: radius.full,
    backgroundColor: glow.lavender,
  },
  glowInner: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: radius.full,
    backgroundColor: glow.lavenderStrong,
  },
  lockWrap: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copySection: {
    alignItems: 'center',
    marginBottom: spacing[24],
  },
  eyebrow: {
    letterSpacing: 2,
    marginTop: spacing[32],
    marginBottom: spacing[20],
    color: colors.brand.lavender,
    textAlign: 'center',
  },
  headline: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: spacing[12],
  },
  supportingText: {
    textAlign: 'center',
    maxWidth: 320,
  },
  benefitsSection: {
    gap: spacing[12],
    marginBottom: spacing[24],
  },
  benefitCard: {
    paddingVertical: spacing[12],
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(178, 140, 255, 0.15)',
    marginRight: spacing[12],
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    marginBottom: spacing[4],
  },
  ctaSection: {
    gap: spacing[12],
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
    gap: spacing[4],
  },
  privacyText: {
    textAlign: 'center',
  },
});
