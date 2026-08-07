import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppInput,
  AppText,
  Badge,
  Button,
  Card,
  IconButton,
  ProgressBar,
  Screen,
} from '@/src/components/ui';
import { colors, gradients, radius, spacing } from '@/src/theme';

const COLOR_SWATCHES: { label: string; hex: string }[] = [
  { label: 'Deep Brown', hex: colors.brand.deepBrown },
  { label: 'Dark Plum', hex: colors.brand.darkPlum },
  { label: 'Royal Purple', hex: colors.brand.royalPurple },
  { label: 'Lavender', hex: colors.brand.lavender },
  { label: 'Charcoal', hex: colors.neutral.charcoal },
  { label: 'Dark Surface', hex: colors.neutral.darkSurface },
  { label: 'Surface', hex: colors.neutral.surface },
  { label: 'Surface Elevated', hex: colors.neutral.surfaceElevated },
  { label: 'Border', hex: colors.neutral.border },
  { label: 'Border Strong', hex: colors.neutral.borderStrong },
  { label: 'Success', hex: colors.semantic.success },
  { label: 'Warning', hex: colors.semantic.warning },
  { label: 'Error', hex: colors.semantic.error },
  { label: 'Info', hex: colors.semantic.info },
];

const GRADIENT_SWATCHES: { label: string; colors: readonly [string, string] }[] = [
  { label: 'Primary CTA', colors: gradients.primaryCta },
  { label: 'Performance', colors: gradients.performance },
  { label: 'Accent', colors: gradients.accent },
  { label: 'Dark Surface', colors: gradients.darkSurface },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="heading1" style={styles.sectionTitle}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

export default function DesignSystemScreen() {
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('you@example.com');
  const [iconSelected, setIconSelected] = useState(false);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <AppText variant="display1" style={styles.header}>
        MBD Essentials
      </AppText>
      <AppText variant="body" color="secondary" style={styles.headerSubtitle}>
        Design system component preview — internal reference only.
      </AppText>

      <Section title="Colors">
        <View style={styles.swatchGrid}>
          {COLOR_SWATCHES.map((swatch) => (
            <View key={swatch.label} style={styles.swatchItem}>
              <View style={[styles.swatch, { backgroundColor: swatch.hex }]} />
              <AppText variant="caption" color="secondary">
                {swatch.label}
              </AppText>
              <AppText variant="caption" color="muted">
                {swatch.hex}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Gradients">
        {GRADIENT_SWATCHES.map((g) => (
          <View key={g.label} style={styles.gradientRow}>
            <LinearGradient colors={g.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientBar} />
            <AppText variant="body" color="secondary">
              {g.label}
            </AppText>
          </View>
        ))}
      </Section>

      <Section title="Typography">
        <AppText variant="display1">Display 1</AppText>
        <AppText variant="display2">Display 2</AppText>
        <AppText variant="heading1">Heading 1</AppText>
        <AppText variant="heading2">Heading 2</AppText>
        <AppText variant="bodyLarge">Body Large</AppText>
        <AppText variant="body">Body</AppText>
        <AppText variant="caption">Caption</AppText>
      </Section>

      <Section title="Semantic Text">
        <AppText variant="body" color="success">
          Success message text
        </AppText>
        <AppText variant="body" color="warning">
          Warning message text
        </AppText>
        <AppText variant="body" color="error">
          Error message text
        </AppText>
        <AppText variant="body" color="muted">
          Muted supporting text
        </AppText>
      </Section>

      <Section title="Buttons">
        <View style={styles.stackGap}>
          <Button title="Get Started" onPress={() => {}} variant="primary" rightIcon="arrow-forward" />
          <Button title="View Plan" onPress={() => {}} variant="secondary" rightIcon="chevron-forward" />
          <Button title="Learn More" onPress={() => {}} variant="ghost" />
          <Button title="Loading" onPress={() => {}} variant="primary" loading />
          <Button title="Disabled" onPress={() => {}} variant="secondary" disabled />
          <Button title="Full Width" onPress={() => {}} variant="primary" fullWidth />
        </View>
      </Section>

      <Section title="Inputs">
        <View style={styles.stackGap}>
          <AppInput
            label="Default"
            placeholder="Type something..."
            value={inputValue}
            onChangeText={setInputValue}
            leftIcon="person-outline"
          />
          <AppInput
            label="With icon"
            placeholder="Email address"
            value={emailValue}
            onChangeText={setEmailValue}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppInput
            label="Error state"
            placeholder="Type something..."
            value=""
            onChangeText={() => {}}
            leftIcon="lock-closed-outline"
            error="This field is required"
          />
        </View>
      </Section>

      <Section title="Cards">
        <View style={styles.stackGap}>
          <Card variant="surface">
            <AppText variant="heading2">Surface Card</AppText>
            <AppText variant="body" color="secondary">
              Default card surface for general content grouping.
            </AppText>
          </Card>
          <Card variant="elevated">
            <AppText variant="heading2">Elevated Card</AppText>
            <AppText variant="body" color="secondary">
              Used when a card needs to stand above the background.
            </AppText>
          </Card>
          <Card variant="outlined">
            <AppText variant="heading2">Outlined Card</AppText>
            <AppText variant="body" color="secondary">
              A lighter-weight bordered container.
            </AppText>
          </Card>
        </View>
      </Section>

      <Section title="Badges">
        <View style={styles.badgeRow}>
          <Badge label="Default" status="default" />
          <Badge label="Selected" status="selected" />
          <Badge label="Success" status="success" />
          <Badge label="Warning" status="warning" />
          <Badge label="Error" status="error" />
        </View>
      </Section>

      <Section title="Progress">
        <View style={styles.stackGap}>
          <ProgressBar value={0.33} accessibilityLabel="33 percent complete" />
          <ProgressBar value={0.72} gradient={false} accessibilityLabel="72 percent complete" />
        </View>
      </Section>

      <Section title="Icon Buttons">
        <View style={styles.iconRow}>
          <IconButton icon="add" onPress={() => {}} accessibilityLabel="Add" />
          <IconButton
            icon="heart"
            onPress={() => setIconSelected((v) => !v)}
            selected={iconSelected}
            accessibilityLabel="Favorite"
          />
          <IconButton icon="settings-outline" onPress={() => {}} accessibilityLabel="Settings" />
          <IconButton icon="trash-outline" onPress={() => {}} disabled accessibilityLabel="Delete (disabled)" />
        </View>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing[24],
    paddingBottom: spacing[64],
  },
  header: {
    marginBottom: spacing[4],
  },
  headerSubtitle: {
    marginBottom: spacing[32],
  },
  section: {
    marginBottom: spacing[32],
  },
  sectionTitle: {
    marginBottom: spacing[16],
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[16],
  },
  swatchItem: {
    width: 88,
  },
  swatch: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    marginBottom: spacing[8],
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  gradientRow: {
    marginBottom: spacing[12],
  },
  gradientBar: {
    height: 48,
    borderRadius: radius.md,
    marginBottom: spacing[8],
  },
  stackGap: {
    gap: spacing[16],
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  iconRow: {
    flexDirection: 'row',
    gap: spacing[16],
  },
});
