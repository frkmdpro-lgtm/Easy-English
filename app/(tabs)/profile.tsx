import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/constants/theme';
import { useProgress } from '@/contexts/ProgressContext';

export default function ProfileScreen() {
  const { streakDays, lessonsCompleted, phrasesLearned } = useProgress();

  const stats = [
    { emoji: '🔥', label: 'Streak', value: `${streakDays} days` },
    { emoji: '📚', label: 'Lessons', value: `${lessonsCompleted} completed` },
    { emoji: '🗣', label: 'Phrases', value: `${phrasesLearned} learned` },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Progress</Text>

        <View style={{ height: spacing.xl }} />
        {stats.map((stat, index) => (
          <View key={stat.label}>
            <View style={styles.statRow}>
              <Text style={styles.emoji}>{stat.emoji}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
            {index < stats.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
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
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  emoji: {
    fontSize: 22,
    width: 32,
  },
  statLabel: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
  },
  statValue: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
