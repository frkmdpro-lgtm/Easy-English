import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconButton from '@/components/IconButton';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, fontSizes, spacing } from '@/constants/theme';
import { lessons } from '@/constants/lessons';
import { useProgress } from '@/contexts/ProgressContext';
import { speak } from '@/lib/speech';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeLesson } = useProgress();

  const lessonIndex = lessons.findIndex((lesson) => lesson.id === id);
  const lesson = lessons[lessonIndex] ?? lessons[0];
  const hasNaturalVariant = lesson.naturalEnglish !== lesson.english;

  const handleNext = () => {
    completeLesson(lesson.id);
    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      router.replace(`/lesson/${nextLesson.id}`);
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topBar}>
            <Text style={styles.lessonLabel}>Lesson {lessonIndex + 1}</Text>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <View style={{ height: spacing.xl }} />
          <Text style={styles.romanUrdu}>{lesson.romanUrdu}</Text>

          <View style={{ height: spacing.xxl }} />
          <Text style={styles.caption}>Say it in English</Text>
          <View style={{ height: spacing.xs }} />
          <Text style={styles.englishLarge}>{lesson.english}</Text>

          {hasNaturalVariant && (
            <>
              <View style={{ height: spacing.md }} />
              <Text style={styles.naturalEnglish}>{lesson.naturalEnglish}</Text>
            </>
          )}
        </View>

        <View style={styles.bottom}>
          <IconButton icon="🔊" label="Listen" size="lg" onPress={() => speak(lesson.naturalEnglish)} />
          <View style={{ height: spacing.xl }} />
          <PrimaryButton label="Next" onPress={handleNext} />
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
  top: {},
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
  caption: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
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
  bottom: {
    alignItems: 'center',
  },
});
