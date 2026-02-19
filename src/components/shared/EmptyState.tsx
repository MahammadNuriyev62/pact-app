import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.textTertiary} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      {actionLabel && onAction && (
        <View style={styles.action}>
          <Button title={actionLabel} onPress={onAction} variant="primary" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  title: {
    ...typography.h3,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.xxl,
  },
});
