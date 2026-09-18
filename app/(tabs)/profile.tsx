import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, radius, spacing } from '@/constants/theme';
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

        <View style={{ height: spacing.lg }} />
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.emoji}>{stat.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
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
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  emoji: {
    fontSize: 32,
  },
  statLabel: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
  statValue: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '700',
  },
});
