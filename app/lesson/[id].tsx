import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconButton from '@/components/IconButton';
import PrimaryButton from '@/components/PrimaryButton';
import ProgressBar from '@/components/ProgressBar';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { lessons, type Lesson, type LessonExample } from '@/constants/lessons';
import { useProgress } from '@/contexts/ProgressContext';
import { isApproximateMatch, recognizeSpeech, speak } from '@/lib/speech';

type Step =
  | 'intro'
  | 'understand'
  | 'use'
  | 'structure'
  | 'positive'
  | 'negative'
  | 'questions'
  | 'mistakes'
  | 'comparison'
  | 'examples'
  | 'practice'
  | 'speak';

function getSteps(lesson: Lesson): Step[] {
  const steps: Step[] = ['intro', 'understand'];
  if (lesson.uses?.length) steps.push('use');
  if (lesson.structures?.length) steps.push('structure');
  if (lesson.positiveExamples?.length) steps.push('positive');
  if (lesson.negativeExamples?.length) steps.push('negative');
  if (lesson.questionExamples?.length) steps.push('questions');
  if (lesson.commonMistakes?.length) steps.push('mistakes');
  if (lesson.comparison) steps.push('comparison');
  if (lesson.examples?.length) steps.push('examples');
  if (lesson.practiceQuestions?.length) steps.push('practice');
  if (lesson.speakingPrompt) steps.push('speak');
  return steps;
}

function ExampleList({ items }: { items: LessonExample[] }) {
  return (
    <>
      {items.map((example, index) => (
        <View key={`${example.romanUrdu}-${index}`}>
          {index > 0 && <View style={styles.divider} />}
          <Text style={styles.exampleRoman}>{example.romanUrdu}</Text>
          <View style={{ height: spacing.xs }} />
          <Text style={styles.exampleEnglish}>{example.english}</Text>
          {example.note && (
            <>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.exampleNote}>{example.note}</Text>
            </>
          )}
        </View>
      ))}
    </>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeLesson } = useProgress();

  const lessonIndex = lessons.findIndex((l) => l.id === id);
  const lesson = lessons[lessonIndex] ?? lessons[0];
  const steps = useMemo(() => getSteps(lesson), [lesson]);
  const hasNaturalVariant = lesson.naturalEnglish !== lesson.english;
  const question = lesson.practiceQuestions?.[0];

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakFeedback, setSpeakFeedback] = useState<'correct' | 'retry' | null>(null);

  useEffect(() => {
    setStepIndex(0);
    setSelectedOption(null);
    setIsListening(false);
    setSpeakFeedback(null);
  }, [lesson.id]);

  const step = steps[stepIndex];

  const goToNextLesson = () => {
    completeLesson(lesson.id);
    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      router.replace(`/lesson/${nextLesson.id}`);
    } else {
      router.replace('/');
    }
  };

  const handleContinue = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      goToNextLesson();
    }
  };

  const handleSpeak = async () => {
    setSpeakFeedback(null);
    setIsListening(true);
    const transcript = await recognizeSpeech(lesson.naturalEnglish);
    setIsListening(false);
    setSpeakFeedback(isApproximateMatch(transcript, lesson.naturalEnglish) ? 'correct' : 'retry');
  };

  const canContinue = step !== 'practice' || selectedOption !== null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <View style={styles.topBar}>
            <Text style={styles.lessonLabel}>Lesson {lessonIndex + 1}</Text>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <View style={{ height: spacing.sm }} />
          <Text style={styles.category}>{lesson.category}</Text>
          <Text style={styles.topic}>{lesson.topic}</Text>

          <View style={{ height: spacing.lg }} />
          <ProgressBar progress={(stepIndex + 1) / steps.length} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {step === 'intro' && (
            <View>
              <Text style={styles.romanUrdu}>{lesson.romanUrdu}</Text>
              <View style={{ height: spacing.lg }} />
              <Text style={styles.englishLarge}>{lesson.english}</Text>

              {hasNaturalVariant && (
                <>
                  <View style={{ height: spacing.lg }} />
                  <Text style={styles.caption}>More Natural</Text>
                  <View style={{ height: spacing.xs }} />
                  <Text style={styles.naturalEnglish}>{lesson.naturalEnglish}</Text>
                </>
              )}

              <View style={{ height: spacing.xl }} />
              <IconButton icon="🔊" label="Listen" onPress={() => speak(lesson.naturalEnglish)} />
            </View>
          )}

          {step === 'understand' && (
            <View>
              <Text style={styles.caption}>What it means</Text>
              <View style={{ height: spacing.sm }} />
              {lesson.grammarPoint && (
                <>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{lesson.grammarPoint}</Text>
                  </View>
                  <View style={{ height: spacing.md }} />
                </>
              )}
              <Text style={styles.explanation}>{lesson.explanation}</Text>
            </View>
          )}

          {step === 'use' && (
            <View>
              <Text style={styles.caption}>When do we use it?</Text>
              <View style={{ height: spacing.md }} />
              {lesson.uses?.map((use, index) => (
                <View key={`${lesson.id}-use-${index}`} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{use}</Text>
                </View>
              ))}
            </View>
          )}

          {step === 'structure' && (
            <View>
              <Text style={styles.caption}>Sentence Structure</Text>
              <View style={{ height: spacing.md }} />
              {lesson.structures?.map((item, index) => (
                <View key={`${lesson.id}-structure-${index}`}>
                  {index > 0 && <View style={styles.divider} />}
                  <Text style={styles.structureLabel}>{item.label}</Text>
                  <View style={{ height: spacing.xs }} />
                  <Text style={styles.structurePattern}>{item.pattern}</Text>
                </View>
              ))}
            </View>
          )}

          {step === 'positive' && (
            <View>
              <Text style={styles.caption}>Positive Sentences</Text>
              <View style={{ height: spacing.md }} />
              <ExampleList items={lesson.positiveExamples ?? []} />
            </View>
          )}

          {step === 'negative' && (
            <View>
              <Text style={styles.caption}>Negative Sentences</Text>
              <View style={{ height: spacing.md }} />
              <ExampleList items={lesson.negativeExamples ?? []} />
            </View>
          )}

          {step === 'questions' && (
            <View>
              <Text style={styles.caption}>Questions</Text>
              <View style={{ height: spacing.md }} />
              <ExampleList items={lesson.questionExamples ?? []} />
            </View>
          )}

          {step === 'mistakes' && (
            <View>
              <Text style={styles.caption}>Common Mistakes</Text>
              <View style={{ height: spacing.md }} />
              {lesson.commonMistakes?.map((mistake, index) => (
                <View key={`${lesson.id}-mistake-${index}`}>
                  {index > 0 && <View style={styles.divider} />}
                  <Text style={styles.mistakeWrong}>❌ {mistake.wrong}</Text>
                  <View style={{ height: spacing.xs }} />
                  <Text style={styles.mistakeCorrect}>✅ {mistake.correct}</Text>
                  <View style={{ height: spacing.xs }} />
                  <Text style={styles.exampleNote}>{mistake.explanation}</Text>
                </View>
              ))}
            </View>
          )}

          {step === 'comparison' && lesson.comparison && (
            <View>
              <Text style={styles.caption}>{lesson.comparison.title}</Text>
              <View style={{ height: spacing.lg }} />

              <Text style={styles.structureLabel}>{lesson.comparison.firstExample.label}</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.exampleRoman}>{lesson.comparison.firstExample.romanUrdu}</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.exampleEnglish}>{lesson.comparison.firstExample.english}</Text>

              <View style={{ height: spacing.lg }} />
              <Text style={styles.vsText}>VS</Text>
              <View style={{ height: spacing.lg }} />

              <Text style={styles.structureLabel}>{lesson.comparison.secondExample.label}</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.exampleRoman}>{lesson.comparison.secondExample.romanUrdu}</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.exampleEnglish}>{lesson.comparison.secondExample.english}</Text>

              <View style={styles.divider} />

              <Text style={styles.caption}>When to use which?</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.explanation}>{lesson.comparison.explanation}</Text>
            </View>
          )}

          {step === 'examples' && (
            <View>
              <Text style={styles.caption}>Examples</Text>
              <View style={{ height: spacing.md }} />
              <ExampleList items={lesson.examples ?? []} />
            </View>
          )}

          {step === 'practice' && question && (
            <View>
              <Text style={styles.caption}>{question.prompt}</Text>
              <View style={{ height: spacing.lg }} />
              {question.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrectOption = index === question.correctIndex;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelectedOption(index)}
                    style={[
                      styles.option,
                      isSelected && isCorrectOption && styles.optionCorrect,
                      isSelected && !isCorrectOption && styles.optionIncorrect,
                    ]}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </Pressable>
                );
              })}

              {selectedOption !== null && (
                <>
                  <View style={{ height: spacing.md }} />
                  <Text
                    style={[
                      styles.feedback,
                      selectedOption !== question.correctIndex && styles.feedbackRetry,
                    ]}
                  >
                    {selectedOption === question.correctIndex
                      ? 'Correct ✓'
                      : 'Not quite. Try again.'}
                  </Text>
                </>
              )}
            </View>
          )}

          {step === 'speak' && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.captionSelf}>Now say it</Text>
              <View style={{ height: spacing.xs }} />
              <Text style={styles.explanationSelf}>{lesson.speakingPrompt}</Text>

              <View style={{ height: spacing.lg }} />
              <Text style={styles.speakTarget}>{lesson.naturalEnglish}</Text>

              <View style={{ height: spacing.xl }} />
              <IconButton
                icon="🎤"
                label={isListening ? 'Listening…' : 'Speak'}
                size="lg"
                onPress={handleSpeak}
                disabled={isListening}
              />

              {speakFeedback && (
                <>
                  <View style={{ height: spacing.md }} />
                  <Text
                    style={[styles.feedback, speakFeedback === 'retry' && styles.feedbackRetry]}
                  >
                    {speakFeedback === 'correct' ? 'Great! 👏' : 'Almost! Try again.'}
                  </Text>
                </>
              )}
            </View>
          )}
        </ScrollView>

        <View style={styles.bottom}>
          <PrimaryButton label="Continue" onPress={handleContinue} disabled={!canContinue} />
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
    padding: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    fontSize: fontSizes.lg,
    color: colors.textMuted,
  },
  lessonLabel: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  category: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topic: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  scroll: {
    flex: 1,
    marginTop: spacing.xl,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  caption: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
  captionSelf: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  romanUrdu: {
    fontSize: fontSizes.xl,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  englishLarge: {
    fontSize: fontSizes.hero,
    fontWeight: '700',
    color: colors.text,
    lineHeight: fontSizes.hero * 1.15,
  },
  naturalEnglish: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: '600',
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
  explanation: {
    fontSize: fontSizes.lg,
    color: colors.text,
    lineHeight: fontSizes.lg * 1.4,
  },
  explanationSelf: {
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: fontSizes.md * 1.4,
    alignSelf: 'flex-start',
  },
  exampleRoman: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  exampleEnglish: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '600',
  },
  exampleNote: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  bulletDot: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    marginRight: spacing.sm,
    lineHeight: fontSizes.lg * 1.3,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.lg,
    color: colors.text,
    lineHeight: fontSizes.lg * 1.3,
  },
  structureLabel: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  structurePattern: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '600',
  },
  mistakeWrong: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontWeight: '600',
  },
  mistakeCorrect: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '700',
  },
  vsText: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  optionCorrect: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionIncorrect: {
    backgroundColor: colors.surfaceMuted,
  },
  optionText: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
  },
  feedback: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.primary,
  },
  feedbackRetry: {
    color: colors.textMuted,
  },
  speakTarget: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  bottom: {
    paddingTop: spacing.md,
  },
});
