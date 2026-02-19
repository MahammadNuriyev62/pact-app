import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { spacing, borderRadius, typography, withAlpha } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  color?: string;
}

export default function Chip({ label, selected, onPress, color }: ChipProps) {
  const { colors } = useTheme();
  const chipColor = color ?? colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: withAlpha(chipColor, 0.125), borderColor: chipColor }
          : { backgroundColor: 'transparent', borderColor: colors.border },
      ]}
    >
      <Text style={[styles.text, { color: selected ? chipColor : colors.textTertiary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
  },
  text: {
    ...typography.captionBold,
  },
});
