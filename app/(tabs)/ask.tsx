import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { translateToEnglish, type AskAIResponse } from '@/lib/mockAI';
import { speak } from '@/lib/speech';

export default function AskAIScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AskAIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const response = await translateToEnglish(input);
    setResult(response);
    setIsLoading(false);
  };

  const handlePractice = () => {
    if (!result) return;
    router.push({
      pathname: '/practice',
      params: { romanUrdu: input, expected: result.naturalEnglish },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>How would I say this?</Text>
          <Text style={styles.subtitle}>Type it in Roman Urdu</Text>

          <View style={{ height: spacing.lg }} />
          <TextInput
            style={styles.input}
            multiline
            placeholder="Mereku boss ko bolna hai ke main late hounga"
            placeholderTextColor={colors.textMuted}
            value={input}
            onChangeText={setInput}
          />

          <View style={{ height: spacing.md }} />
          <PrimaryButton
            label={isLoading ? 'Translating…' : 'Translate'}
            onPress={handleTranslate}
          />

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.caption}>English</Text>
              <Text style={styles.englishText}>{result.english}</Text>

              <View style={{ height: spacing.md }} />
              <Text style={styles.caption}>More natural</Text>
              <Text style={styles.naturalText}>{result.naturalEnglish}</Text>

              <View style={{ height: spacing.md }} />
              <Text style={styles.caption}>Roman Urdu explanation</Text>
              <Text style={styles.explanationText}>{result.explanation}</Text>

              <View style={{ height: spacing.lg }} />
              <View style={styles.resultButtons}>
                <Pressable
                  style={styles.smallButton}
                  onPress={() => speak(result.naturalEnglish)}
                >
                  <Text style={styles.smallButtonText}>🔊 Listen</Text>
                </Pressable>
                <Pressable style={styles.smallButton} onPress={handlePractice}>
                  <Text style={styles.smallButtonText}>🎤 Practice</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    fontSize: fontSizes.md,
    color: colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  resultCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  caption: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  englishText: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  naturalText: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  explanationText: {
    fontSize: fontSizes.md,
    color: colors.text,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  smallButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
});
