import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Button, Card, IconButton, Screen } from '@/src/components/ui';
import { useOnboardingStore } from '@/src/stores/onboarding-store';
import { colors, glow, radius, spacing } from '@/src/theme';
import {
  MIN_ELIGIBLE_AGE,
  calculateAge,
  isFutureDate,
  parseDateOnlyString,
  toDateOnlyString,
} from '@/src/utils/age';

/**
 * A neutral default for the picker's initial position when no DOB has been
 * selected yet — deliberately not the 15-year eligibility boundary.
 */
function getDefaultPickerDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear() - 25, 0, 1);
}

export default function AgeGateScreen() {
  const dateOfBirth = useOnboardingStore((state) => state.dateOfBirth);
  const hasHydrated = useOnboardingStore((state) => state.hasHydrated);
  const setDateOfBirth = useOnboardingStore((state) => state.setDateOfBirth);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initializedFromStore, setInitializedFromStore] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Restore a previously-selected DOB once persisted state has hydrated, so
  // returning to this screen doesn't discard the user's prior selection.
  useEffect(() => {
    if (hasHydrated && !initializedFromStore) {
      if (dateOfBirth) {
        setSelectedDate(parseDateOnlyString(dateOfBirth));
      }
      setInitializedFromStore(true);
    }
  }, [hasHydrated, dateOfBirth, initializedFromStore]);

  if (!hasHydrated) {
    return (
      <Screen contentContainerStyle={styles.loadingContainer}>
        <ActivityIndicator color={colors.brand.lavender} />
      </Screen>
    );
  }

  const dobString = selectedDate ? toDateOnlyString(selectedDate) : null;
  const isFuture = dobString ? isFutureDate(dobString) : false;
  const age = dobString && !isFuture ? calculateAge(dobString) : null;
  const canContinue = Boolean(dobString) && !isFuture && age !== null && age >= MIN_ELIGIBLE_AGE;

  let inlineError: string | undefined;
  if (dobString && isFuture) {
    inlineError = 'Date of birth cannot be in the future.';
  } else if (dobString && age !== null && age < MIN_ELIGIBLE_AGE) {
    inlineError = 'MBD Essentials is currently available for users ages 15 and older.';
  }

  const displayValue = dobString ? dobString.replace(/-/g, ' / ') : 'YYYY / MM / DD';
  const accessibilityValue = selectedDate
    ? selectedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : 'not set';

  const handleBack = () => router.back();

  const handleOpenPicker = () => setShowPicker(true);

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (event.type === 'set' && date) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    if (!dobString || !canContinue) {
      return;
    }
    setDateOfBirth(dobString);
    router.push('/auth-intro');
  };

  const handleContactSupport = () => {
    Alert.alert('Coming Soon', 'Support contact will be available once it is implemented.');
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <IconButton icon="arrow-back" onPress={handleBack} accessibilityLabel="Back to Welcome" />
      </View>

      <View style={styles.shieldSection}>
        <View style={styles.shieldGlow} pointerEvents="none" />
        <View style={styles.shieldBox}>
          <Ionicons name="shield-outline" size={104} color={colors.brand.lavender} />
          <View style={styles.shieldTextOverlay} pointerEvents="none">
            <AppText variant="heading1" color="primary">
              15+
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.copySection}>
        <AppText variant="caption" color="secondary" style={styles.eyebrow}>
          LET&apos;S GET STARTED
        </AppText>
        <AppText variant="display1" style={styles.headline}>
          {"What's your\ndate of birth?"}
        </AppText>
        <AppText variant="body" color="secondary" style={styles.supportingText}>
          We need your date of birth to ensure you&apos;re 15 years or older to use MBD
          Essentials.
        </AppText>
      </View>

      <View style={styles.fieldSection}>
        <AppText variant="body" color="secondary" style={styles.fieldLabel}>
          DATE OF BIRTH
        </AppText>
        <Pressable
          onPress={handleOpenPicker}
          accessibilityRole="button"
          accessibilityLabel={`Date of birth, ${accessibilityValue}`}
          style={({ pressed }) => [
            styles.fieldRow,
            { borderColor: inlineError ? colors.semantic.error : colors.neutral.border },
            pressed && styles.fieldPressed,
          ]}>
          <AppText variant="bodyLarge" color={dobString ? 'primary' : 'muted'}>
            {displayValue}
          </AppText>
          <Ionicons name="calendar-outline" size={18} color={colors.neutral.textMuted} />
        </Pressable>
        {inlineError && (
          <AppText variant="caption" color="error" style={styles.errorText}>
            {inlineError}
          </AppText>
        )}
      </View>

      <Card variant="outlined" style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.brand.lavender}
            style={styles.infoIcon}
          />
          <AppText variant="body" color="secondary" style={styles.infoText}>
            Users under 15 cannot use MBD Essentials. Users ages 15–17 receive a
            teen-appropriate training experience.
          </AppText>
        </View>
      </Card>

      <View style={styles.ctaSection}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          fullWidth
          disabled={!canContinue}
          accessibilityLabel="Continue"
        />
        <Pressable
          onPress={handleContactSupport}
          style={styles.supportRow}
          accessibilityRole="button"
          accessibilityLabel="Need help? Contact support">
          <AppText variant="caption" color="muted">
            Need help?{' '}
            <AppText variant="caption" style={styles.supportLink}>
              Contact support
            </AppText>
          </AppText>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate ?? getDefaultPickerDate()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={handleChangeDate}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing[8],
    paddingBottom: spacing[16],
  },
  header: {
    alignItems: 'flex-start',
  },
  shieldSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginTop: spacing[4],
    marginBottom: spacing[8],
  },
  shieldGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: glow.lavenderStrong,
  },
  shieldBox: {
    width: 104,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing[8],
  },
  copySection: {
    alignItems: 'center',
    marginBottom: spacing[16],
  },
  eyebrow: {
    letterSpacing: 2,
    marginBottom: spacing[8],
    color: colors.brand.lavender,
    textAlign: 'center',
  },
  headline: {
    textAlign: 'center',
    marginBottom: spacing[8],
  },
  supportingText: {
    textAlign: 'center',
    maxWidth: 320,
  },
  fieldSection: {
    marginBottom: spacing[16],
  },
  fieldLabel: {
    marginBottom: spacing[8],
    letterSpacing: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
  },
  fieldPressed: {
    opacity: 0.85,
  },
  errorText: {
    marginTop: spacing[8],
  },
  infoCard: {
    marginBottom: spacing[16],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: spacing[8],
    marginTop: 2,
  },
  infoText: {
    flex: 1,
  },
  ctaSection: {
    gap: spacing[12],
  },
  supportRow: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  supportLink: {
    color: colors.brand.lavender,
  },
});
