import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { borderRadius, spacing, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import Avatar from './Avatar';

interface AvatarGroupProps {
  users: { avatar?: string; name: string }[];
  max?: number;
  size?: number;
}

export default function AvatarGroup({ users, max = 3, size = 28 }: AvatarGroupProps) {
  const { colors } = useTheme();
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <View style={styles.container}>
      {visible.map((user, i) => (
        <View
          key={i}
          style={[
            styles.avatarWrapper,
            { borderColor: colors.backgroundSecondary },
            i > 0 && { marginLeft: -spacing.sm },
            { zIndex: visible.length - i, borderRadius: (size + 4) / 2 },
          ]}
        >
          <Avatar uri={user.avatar} name={user.name} size={size} />
        </View>
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.overflowBadge,
            { marginLeft: -spacing.sm, width: size, height: size, borderRadius: size / 2, backgroundColor: colors.backgroundTertiary, borderColor: colors.backgroundSecondary },
          ]}
        >
          <Text style={[styles.overflowText, { fontSize: size * 0.38, color: colors.textSecondary }]}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
  },
  overflowBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  overflowText: {
    fontWeight: typography.h1.fontWeight,
  },
});
