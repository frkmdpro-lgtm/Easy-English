import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/PrimaryButton';
import ProgressBar from '@/components/ProgressBar';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
import { lessons } from '@/constants/lessons';
import { useProgress } from '@/contexts/ProgressContext';

const DAILY_GOAL = 5;

export default function HomeScreen() {
  const { lessonsCompleted, completedLessonIds } = useProgress();

  const continueLesson =
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? lessons[0];

  const todayCount = Math.min(lessonsCompleted, DAILY_GOAL);

  const goToLesson = () => router.push(`/lesson/${continueLesson.id}`);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Assalamualaikum 👋</Text>
        <Text style={styles.subheading}>Ready to learn English?</Text>

        <View style={{ height: spacing.xl }} />
        <PrimaryButton label="Start Today's Lesson" onPress={goToLesson} />

        <View style={{ height: spacing.xxl }} />
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={{ height: spacing.sm }} />
        <Text style={styles.progressCount}>
          {todayCount} / {DAILY_GOAL} lessons
        </Text>
        <View style={{ height: spacing.sm }} />
        <ProgressBar progress={todayCount / DAILY_GOAL} />

        <View style={{ height: spacing.xxl }} />
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <View style={{ height: spacing.sm }} />
        <View style={styles.card}>
          <Text style={styles.cardCategory}>{continueLesson.category}</Text>
          <Text style={styles.cardPhrase}>{continueLesson.romanUrdu}</Text>
          <View style={{ height: spacing.lg }} />
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
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressCount: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCategory: {
    fontSize: fontSizes.xs,
    color: colors.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  cardPhrase: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '600',
  },
});
