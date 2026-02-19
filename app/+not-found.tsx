import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { typography, spacing } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Oops!</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={[styles.linkText, { color: colors.primary }]}>Go home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.xxl,
  },
  link: {
    paddingVertical: spacing.md,
  },
  linkText: {
    ...typography.bodyBold,
  },
});
