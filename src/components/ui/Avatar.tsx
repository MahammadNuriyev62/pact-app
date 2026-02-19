import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { avatarColors, withAlpha, typography } from '@/constants/theme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  showBorder?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ uri, name = '', size = 40, showBorder }: AvatarProps) {
  const { colors } = useTheme();
  const [failed, setFailed] = useState(false);
  const colorIndex = name.length % avatarColors.palette.length;
  const bgColor = avatarColors.palette[colorIndex];
  const textColor = avatarColors.textPalette[colorIndex];

  if (!uri || failed) {
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: withAlpha(bgColor, 0.19),
          },
          showBorder && { borderWidth: 2, borderColor: bgColor },
        ]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.38, color: textColor }]}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        showBorder && { borderWidth: 2, borderColor: colors.primary },
      ]}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: typography.h1.fontWeight,
  },
});
