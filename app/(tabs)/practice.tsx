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

          <View style={{ height: spacing.xl }} />
          <Text style={styles.caption}>Roman Urdu</Text>
          <Text style={styles.romanUrdu}>{romanUrdu}</Text>

          <View style={{ height: spacing.lg }} />
          <Text style={styles.caption}>Expected English</Text>
          <Text style={styles.expected}>{expected}</Text>
        </View>

        <View style={styles.bottom}>
          {feedback && (
            <Text style={[styles.feedback, feedback === 'retry' && styles.feedbackRetry]}>
              {feedback === 'correct' ? 'Great! 👏' : 'Almost! Try again.'}
            </Text>
          )}

          <Pressable
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={handleSpeak}
            disabled={isListening}
          >
            <Text style={styles.micText}>
              {isListening ? 'Listening…' : '🎤 Tap to Speak'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  caption: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  romanUrdu: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontStyle: 'italic',
  },
  expected: {
    fontSize: fontSizes.xl,
    color: colors.primary,
    fontWeight: '700',
  },
  bottom: {
    alignItems: 'center',
  },
  feedback: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  feedbackRetry: {
    color: colors.accent,
  },
  micButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  micButtonActive: {
    opacity: 0.7,
  },
  micText: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.primaryText,
  },
});
