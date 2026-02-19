import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import TabBar from '@/components/shared/TabBar';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="new-pact" />
      <Tabs.Screen name="streaks" />
      <Tabs.Screen name="camera" />
    </Tabs>
  );
}
