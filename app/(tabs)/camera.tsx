import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { spacing, borderRadius, typography, layout, withAlpha } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { pacts } from '@/data/mock';
import IconBadge from '@/components/ui/IconBadge';
import ShutterButton from '@/components/camera/ShutterButton';
import PhotoPreview from '@/components/camera/PhotoPreview';
import AIAnalyzing from '@/components/camera/AIAnalyzing';
import VerificationResult from '@/components/camera/VerificationResult';

type CameraState = 'ready' | 'preview' | 'analyzing' | 'result';

export default function CameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [state, setState] = useState<CameraState>('ready');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [matched, setMatched] = useState(false);
  const [matchedPactId, setMatchedPactId] = useState<string | undefined>();
  const [selectedPactId, setSelectedPactId] = useState<string>(pacts[0]?.id || '');

  const handleCapture = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
      setState('preview');
    }
  };

  const handleVerify = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setState('analyzing');
  };

  const handleAnalysisComplete = (isMatch: boolean, pactId?: string) => {
    setMatched(isMatch);
    setMatchedPactId(isMatch ? selectedPactId : pactId);
    setState('result');
    if (isMatch) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  const handleSend = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    resetCamera();
  };

  const resetCamera = () => {
    setState('ready');
    setPhotoUri(null);
    setMatched(false);
    setMatchedPactId(undefined);
  };

  const matchedPact = matchedPactId ? pacts.find((p) => p.id === matchedPactId) : undefined;

  if (state === 'ready') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
        <View style={styles.cameraPlaceholder}>
          <View style={[styles.cameraBg, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <Ionicons name="camera" size={64} color={colors.textTertiary} />
            <Text style={[styles.cameraHint, { color: colors.textSecondary }]}>Take a photo to verify your pact</Text>
            <Text style={[styles.cameraSubHint, { color: colors.textTertiary }]}>
              Snap a pic of your activity and we'll match it
            </Text>
          </View>

          <View style={[styles.corner, styles.cornerTL, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.cornerTR, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.cornerBL, { borderColor: colors.primary }]} />
          <View style={[styles.corner, styles.cornerBR, { borderColor: colors.primary }]} />
        </View>

        {/* Pact Selector */}
        <View style={styles.pactSelectorContainer}>
          <Text style={[styles.pactSelectorLabel, { color: colors.textTertiary }]}>Verifying for</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pactSelectorScroll}>
            {pacts.map((pact) => {
              const isSelected = pact.id === selectedPactId;
              return (
                <Pressable
                  key={pact.id}
                  onPress={() => setSelectedPactId(pact.id)}
                  style={[
                    styles.pactSelectorItem,
                    { borderColor: isSelected ? pact.color : colors.border, backgroundColor: isSelected ? withAlpha(pact.color, 0.1) : colors.backgroundSecondary },
                  ]}
                >
                  <IconBadge icon={pact.icon} color={pact.color} size={32} />
                  <Text style={[styles.pactSelectorTitle, { color: isSelected ? colors.textPrimary : colors.textSecondary }]} numberOfLines={1}>{pact.title}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.controls}>
          <View style={styles.controlSpacer} />
          <ShutterButton onPress={handleCapture} />
          <View style={styles.controlSpacer}>
            <Pressable onPress={handleCapture} style={[styles.iconButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
              <Ionicons name="images-outline" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (state === 'preview' && photoUri) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
        <PhotoPreview photoUri={photoUri} onRetake={resetCamera} onVerify={handleVerify} />
      </View>
    );
  }

  if (state === 'analyzing' && photoUri) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AIAnalyzing photoUri={photoUri} onComplete={handleAnalysisComplete} />
      </View>
    );
  }

  if (state === 'result') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <VerificationResult
          matched={matched}
          pact={matchedPact}
          onSend={handleSend}
          onRetry={resetCamera}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    margin: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    position: 'relative',
  },
  cameraBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xxl,
    borderWidth: 1,
  },
  cameraHint: {
    ...typography.h3,
    marginTop: spacing.xl,
  },
  cameraSubHint: {
    ...typography.caption,
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
  cornerTL: {
    top: 16,
    left: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 16,
    right: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 16,
    left: 16,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 16,
    right: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: layout.tabBarClearance,
    paddingHorizontal: spacing.xxxl,
  },
  controlSpacer: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    width: layout.iconButtonMd,
    height: layout.iconButtonMd,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pactSelectorContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  pactSelectorLabel: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  pactSelectorScroll: {
    gap: spacing.sm,
  },
  pactSelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
  },
  pactSelectorTitle: {
    ...typography.caption,
    fontWeight: '600',
    maxWidth: 80,
  },
});
