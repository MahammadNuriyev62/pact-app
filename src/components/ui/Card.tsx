import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { spacing, borderRadius } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Card({ children, style, onPress }: CardProps) {
  const { colors } = useTheme();
  const cardStyle = [styles.card, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }, style];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && { opacity: 0.85 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
});
