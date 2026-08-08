import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/src/components/ui';
import { colors, radius, spacing } from '@/src/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface SuccessFeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
}

export function SuccessFeatureCard({ icon, title, description }: SuccessFeatureCardProps) {
  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.iconBadge} importantForAccessibility="no-hide-descendants">
        <Ionicons name={icon} size={22} color={colors.brand.lavender} />
      </View>
      <View style={styles.textGroup}>
        <AppText variant="bodyLarge">{title}</AppText>
        <AppText variant="body" color="secondary">
          {description}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[16],
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.neutral.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    flex: 1,
    gap: spacing[4],
  },
});
