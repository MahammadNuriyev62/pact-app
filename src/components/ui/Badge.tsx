import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md';
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Badge({ label, color, textColor, size = 'sm', icon }: BadgeProps) {
  const { colors } = useTheme();
  const bg = color ?? colors.backgroundTertiary;
  const fg = textColor ?? colors.textPrimary;

  return (
    <View style={[styles.badge, { backgroundColor: bg }, size === 'md' && styles.md]}>
      {icon && <Ionicons name={icon} size={size === 'md' ? 14 : 11} color={fg} />}
      <Text style={[styles.text, { color: fg }, size === 'md' && styles.mdText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  md: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    ...typography.tiny,
  },
  mdText: {
    ...typography.caption,
  },
});
