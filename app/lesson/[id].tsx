import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { lessons } from '@/constants/lessons';
import { useProgress } from '@/contexts/ProgressContext';
import { speak } from '@/lib/speech';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeLesson } = useProgress();

  const lessonIndex = lessons.findIndex((lesson) => lesson.id === id);
  const lesson = lessons[lessonIndex] ?? lessons[0];

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
        <View>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
          <Text style={styles.lessonLabel}>Lesson {lessonIndex + 1}</Text>

          <Text style={styles.caption}>Roman Urdu</Text>
          <Text style={styles.romanUrdu}>{lesson.romanUrdu}</Text>

          <View style={{ height: spacing.xl }} />
          <Text style={styles.englishLarge}>{lesson.english}</Text>

          <View style={{ height: spacing.lg }} />
          <Text style={styles.caption}>Natural English</Text>
          <Text style={styles.naturalEnglish}>{lesson.naturalEnglish}</Text>
        </View>

        <View>
          <Pressable style={styles.speakerButton} onPress={() => speak(lesson.naturalEnglish)}>
            <Text style={styles.speakerText}>🔊 Listen</Text>
          </Pressable>

          <View style={{ height: spacing.md }} />
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
  close: {
    fontSize: fontSizes.lg,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  lessonLabel: {
    fontSize: fontSizes.sm,
    color: colors.accent,
    fontWeight: '700',
    marginBottom: spacing.xl,
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
  englishLarge: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  naturalEnglish: {
    fontSize: fontSizes.lg,
    color: colors.primary,
    fontWeight: '600',
  },
  speakerButton: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  speakerText: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
  },
});
