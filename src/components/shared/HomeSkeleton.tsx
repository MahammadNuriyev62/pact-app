import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import Skeleton from '@/components/ui/Skeleton';

function ActivitySkeleton() {
  return (
    <View style={skStyles.activityRow}>
      <Skeleton width={200} height={150} radius={borderRadius.lg} />
      <Skeleton width={200} height={150} radius={borderRadius.lg} />
    </View>
  );
}

function PactCardSkeleton() {
  const { colors } = useTheme();
  return (
    <View style={[skStyles.card, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
      <View style={skStyles.cardRow}>
        <Skeleton width={48} height={48} radius={borderRadius.lg} />
        <View style={skStyles.cardText}>
          <Skeleton width={140} height={18} />
          <Skeleton width={80} height={14} style={{ marginTop: spacing.xs }} />
        </View>
        <View style={skStyles.cardRight}>
          <Skeleton width={40} height={18} />
          <Skeleton width={60} height={24} radius={12} style={{ marginTop: spacing.sm }} />
        </View>
      </View>
    </View>
  );
}

export default function HomeSkeleton() {
  return (
    <View>
      {/* Activity section */}
      <Skeleton width={140} height={20} style={{ marginBottom: spacing.md }} />
      <ActivitySkeleton />

      {/* Section header */}
      <View style={skStyles.sectionHeader}>
        <Skeleton width={120} height={22} />
        <Skeleton width={60} height={14} />
      </View>

      {/* Pact cards */}
      <PactCardSkeleton />
      <PactCardSkeleton />
      <PactCardSkeleton />
    </View>
  );
}

const skStyles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
});
