import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/PrimaryButton';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { lessons } from '@/constants/lessons';
import { useProgress } from '@/contexts/ProgressContext';

export default function HomeScreen() {
  const { streakDays, lessonsCompleted, completedLessonIds } = useProgress();

  const continueLesson =
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? lessons[0];

  const goToLesson = () => router.push(`/lesson/${continueLesson.id}`);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Assalamualaikum 👋</Text>
        <Text style={styles.subheading}>Ready to learn English?</Text>

        <View style={{ height: spacing.lg }} />
        <PrimaryButton label="Start Today's Lesson" onPress={goToLesson} />

        <View style={{ height: spacing.xl }} />
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>🔥 {streakDays} day streak</Text>
          <Text style={styles.progressText}>{lessonsCompleted} lessons completed</Text>
        </View>

        <View style={{ height: spacing.xl }} />
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <View style={styles.card}>
          <Text style={styles.cardCategory}>{continueLesson.category} English</Text>
          <Text style={styles.cardPhrase}>{continueLesson.romanUrdu}</Text>
          <View style={{ height: spacing.md }} />
          <PrimaryButton label="Continue" onPress={goToLesson} variant="secondary" />
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  subheading: {
    fontSize: fontSizes.lg,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCategory: {
    fontSize: fontSizes.sm,
    color: colors.accent,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  cardPhrase: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '600',
  },
});
