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
import { askEnglishTeacher, type AskEnglishTeacherResponse } from '@/lib/claude';
import { speak } from '@/lib/speech';

export default function AskAIScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AskEnglishTeacherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAsk = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setError(false);
    try {
      const response = await askEnglishTeacher(input);
      setResult(response);
    } catch (err) {
      console.error('askEnglishTeacher failed:', err);
      setResult(null);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePractice = () => {
    if (!result) return;
    router.push({
      pathname: '/practice',
      params: { romanUrdu: input, expected: result.moreNatural },
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
            label={isLoading ? 'Thinking…' : 'Teach Me'}
            onPress={handleAsk}
            disabled={isLoading}
          />

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Something went wrong. Try again.</Text>
              <View style={{ height: spacing.md }} />
              <PrimaryButton label="Try Again" onPress={handleAsk} variant="secondary" />
            </View>
          )}

          {result && (
            <View style={styles.result}>
              <Text style={styles.sectionLabel}>English</Text>
              <Text style={styles.englishText}>{result.english}</Text>

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>More Natural</Text>
              <Text style={styles.naturalText}>{result.moreNatural}</Text>

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>Why?</Text>
              <Text style={styles.explanationText}>{result.why}</Text>

              {result.grammarPoint.length > 0 && (
                <>
                  <View style={{ height: spacing.md }} />
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{result.grammarPoint}</Text>
                  </View>
                </>
              )}

              {result.examples.length > 0 && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.sectionLabel}>Examples</Text>
                  <View style={{ height: spacing.xs }} />
                  {result.examples.map((example, index) => (
                    <Text key={index} style={styles.exampleText}>
                      {example}
                    </Text>
                  ))}
                </>
              )}

              <View style={{ height: spacing.lg }} />
              <View style={styles.resultButtons}>
                <Pressable style={styles.smallButton} onPress={() => speak(result.moreNatural)}>
                  <Text style={styles.smallButtonText}>Listen</Text>
                </Pressable>
                <Pressable style={styles.smallButton} onPress={handlePractice}>
                  <Text style={styles.smallButtonText}>Practice</Text>
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
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    fontSize: fontSizes.md,
    color: colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorBox: {
    marginTop: spacing.xl,
  },
  errorText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontWeight: '600',
  },
  result: {
    marginTop: spacing.xl,
  },
  sectionLabel: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  englishText: {
    fontSize: fontSizes.xxl,
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
    color: colors.textMuted,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  tagText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: '700',
  },
  exampleText: {
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  smallButton: {
    flex: 1,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.primary,
  },
});
