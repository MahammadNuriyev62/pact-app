import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary && { backgroundColor: colors.primary },
        isSecondary && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && { opacity: 0.8 },
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? colors.onPrimary : colors.primary}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <Text
          style={[
            styles.text,
            isPrimary && { color: colors.onPrimary },
            isSecondary && { color: colors.primary },
            variant === 'ghost' && { color: colors.primary },
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.bodyBold,
  },
});
