import React, { useState, useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { spacing, borderRadius, typography, withAlpha } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface NudgeButtonProps {
  onPress: () => void;
  userName: string;
}

export default function NudgeButton({ onPress, userName }: NudgeButtonProps) {
  const { colors } = useTheme();
  const [nudged, setNudged] = useState(false);
  const shakeX = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setNudged(true);
    onPress();
    setTimeout(() => setNudged(false), 2000);
  };

  return (
    <Animated.View style={{ transform: [{ translateX: shakeX }] }}>
      <Pressable
        onPress={handlePress}
        style={[styles.button, { backgroundColor: withAlpha(colors.primary, 0.09), borderColor: withAlpha(colors.primary, 0.25) }]}
      >
        <View style={styles.content}>
          <Ionicons name="hand-left-outline" size={14} color={colors.primary} />
          <Text style={[styles.text, { color: colors.primary }]}>{nudged ? 'Sent!' : 'Nudge'}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  text: {
    ...typography.tiny,
    fontWeight: '600',
  },
});
