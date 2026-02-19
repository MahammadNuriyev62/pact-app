import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography, withAlpha } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface DeadlineWarningProps {
  pactTitle: string;
  hoursLeft: number;
  onDismiss: () => void;
}

export default function DeadlineWarning({ pactTitle, hoursLeft, onDismiss }: DeadlineWarningProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.banner, { backgroundColor: withAlpha(colors.warning, 0.08), borderColor: withAlpha(colors.warning, 0.25) }]}>
      <Ionicons name="warning" size={20} color={colors.warningText} />
      <Text style={[styles.text, { color: colors.warningText }]} numberOfLines={2}>
        <Text style={styles.bold}>{hoursLeft}h left</Text> to submit for {pactTitle}!
      </Text>
      <Pressable onPress={onDismiss} hitSlop={12}>
        <Ionicons name="close" size={18} color={colors.warningText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  text: {
    ...typography.caption,
    flex: 1,
  },
  bold: {
    fontWeight: '700',
  },
});
