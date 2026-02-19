import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, borderRadius, typography, withAlpha } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Submission, User, Pact } from '@/data/types';
import Avatar from '@/components/ui/Avatar';

interface ActivityWidgetProps {
  submission: Submission & { user: User; pact: Pact };
  onPress?: () => void;
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityWidget({ submission, onPress }: ActivityWidgetProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}>
      <Image source={{ uri: submission.photoUri }} style={styles.photo} />
      <LinearGradient
        colors={['transparent', colors.overlayHeavy]}
        style={styles.gradient}
      >
        <View style={styles.overlay}>
          <View style={styles.userRow}>
            <Avatar uri={submission.user.avatar} name={submission.user.name} size={24} />
            <View style={styles.textCol}>
              <Text style={[styles.userName, { color: colors.overlayTextPrimary }]} numberOfLines={1}>
                {submission.user.name}
              </Text>
              <Text style={[styles.pactName, { color: colors.overlayTextSecondary }]} numberOfLines={1}>
                {submission.pact.title}
              </Text>
            </View>
          </View>
          <Text style={[styles.time, { color: colors.overlayTextTertiary }]}>{timeAgo(submission.timestamp)}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  textCol: {
    flex: 1,
  },
  userName: {
    ...typography.captionBold,
  },
  pactName: {
    ...typography.micro,
  },
  time: {
    ...typography.micro,
  },
});
