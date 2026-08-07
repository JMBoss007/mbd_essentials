import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppText, Button, Screen } from '@/src/components/ui';
import { colors, glow, gradients, radius, spacing } from '@/src/theme';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // TEMPORARY: the real age-gate screen doesn't exist yet — this just
    // validates navigation. Replace with the real destination once the
    // age-gate task is built.
    router.push('/age-gate');
  };

  const handleSignIn = () => {
    // TEMPORARY: no authentication exists yet. Replace with real sign-in
    // navigation once the authentication task is implemented.
    Alert.alert('Coming Soon', 'Sign in will be available once authentication is implemented.');
  };

  return (
    <Screen scroll padded={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <LinearGradient
            colors={[colors.neutral.background, colors.brand.deepBrown, colors.neutral.background]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.glowPlum} />
          <View style={styles.glowLavender} />
        </View>

        <View style={styles.content}>
          <View style={styles.brandSection}>
            <Image
              source={require('@/assets/images/mbd-logo.jpg')}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="MBD Essentials logo"
            />
          </View>

          <View style={styles.copySection}>
            <AppText variant="caption" color="secondary" style={styles.eyebrow}>
              WELCOME TO
            </AppText>
            <AppText variant="display1" style={styles.headline}>
              {'Train with\nMind. Body.\n'}
              <Text style={{ color: colors.brand.lavender }}>Discipline.</Text>
            </AppText>
            <LinearGradient
              colors={gradients.accent}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.divider}
            />
            <AppText variant="body" color="secondary" style={styles.supportingText}>
              Personalized fitness plans that adapt to your goals, schedule, equipment, and
              progress.
            </AppText>
          </View>

          <View style={styles.ctaSection}>
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              variant="primary"
              fullWidth
              rightIcon="arrow-forward"
              accessibilityLabel="Get Started"
            />
            <Button
              title="I already have an account"
              onPress={handleSignIn}
              variant="secondary"
              fullWidth
              leftIcon="person-outline"
              rightIcon="chevron-forward"
              accessibilityLabel="I already have an account"
            />
            <View style={styles.ageRow} accessible accessibilityLabel="Ages 15 and up">
              <Ionicons name="shield-checkmark-outline" size={14} color={colors.neutral.textMuted} />
              <AppText variant="caption" color="muted" style={styles.ageText}>
                Ages 15+
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  glowPlum: {
    position: 'absolute',
    top: -80,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: glow.plum,
  },
  glowLavender: {
    position: 'absolute',
    top: 60,
    right: -120,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: glow.lavenderStrong,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[20],
    paddingTop: spacing[32],
    paddingBottom: spacing[24],
    justifyContent: 'space-between',
  },
  brandSection: {
    alignItems: 'flex-start',
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: radius.lg,
  },
  copySection: {
    marginVertical: spacing[24],
  },
  eyebrow: {
    letterSpacing: 2,
    marginBottom: spacing[8],
  },
  headline: {
    marginBottom: spacing[16],
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: radius.full,
    marginBottom: spacing[16],
  },
  supportingText: {
    maxWidth: 320,
  },
  ctaSection: {
    gap: spacing[12],
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  ageText: {
    marginLeft: spacing[4],
  },
});
