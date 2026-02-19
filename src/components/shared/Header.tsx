import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export default function Header({ title, subtitle, rightAction }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      {rightAction}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
