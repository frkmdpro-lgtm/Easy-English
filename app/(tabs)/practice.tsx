import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { lessons } from '@/constants/lessons';
import { isApproximateMatch, recognizeSpeech } from '@/lib/speech';

type Feedback = 'correct' | 'retry' | null;

export default function PracticeScreen() {
  const params = useLocalSearchParams<{ romanUrdu?: string; expected?: string }>();

  const randomLesson = useMemo(() => lessons[Math.floor(Math.random() * lessons.length)], []);
  const romanUrdu = params.romanUrdu ?? randomLesson.romanUrdu;
  const expected = params.expected ?? randomLesson.naturalEnglish;

  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleSpeak = async () => {
    setFeedback(null);
    setIsListening(true);
    const transcript = await recognizeSpeech(expected);
    setIsListening(false);
    setFeedback(isApproximateMatch(transcript, expected) ? 'correct' : 'retry');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Say this in English</Text>

          <View style={{ height: spacing.xxl }} />
          <Text style={styles.romanUrdu}>{romanUrdu}</Text>

          <View style={{ height: spacing.lg }} />
          <Text style={styles.expected}>{expected}</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.feedbackArea}>
            {feedback && (
              <Text style={[styles.feedback, feedback === 'retry' && styles.feedbackRetry]}>
                {feedback === 'correct' ? 'Great! 👏' : 'Almost! Try again.'}
              </Text>
            )}
          </View>

          <Pressable
            onPress={handleSpeak}
            disabled={isListening}
            style={({ pressed }) => [
              styles.micButton,
              isListening && styles.micButtonActive,
              pressed && !isListening && styles.micButtonPressed,
            ]}
          >
            <Text style={styles.micIcon}>🎤</Text>
          </Pressable>
          <View style={{ height: spacing.md }} />
          <Text style={styles.micLabel}>{isListening ? 'Listening…' : 'Tap to Speak'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const MIC_SIZE = 128;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  romanUrdu: {
    fontSize: fontSizes.xl,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  expected: {
    fontSize: fontSizes.hero,
    color: colors.text,
    fontWeight: '700',
    lineHeight: fontSizes.hero * 1.15,
  },
  bottom: {
    alignItems: 'center',
  },
  feedbackArea: {
    minHeight: 40,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  feedback: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  feedbackRetry: {
    color: colors.accent,
  },
  micButton: {
    width: MIC_SIZE,
    height: MIC_SIZE,
    borderRadius: MIC_SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonPressed: {
    opacity: 0.85,
  },
  micButtonActive: {
    backgroundColor: colors.accent,
  },
  micIcon: {
    fontSize: 48,
  },
  micLabel: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
});
