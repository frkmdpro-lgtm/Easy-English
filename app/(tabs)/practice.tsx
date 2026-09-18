import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing } from '@/constants/theme';

type PracticeOption = {
  label: string;
  comingSoon: boolean;
};

const OPTIONS: PracticeOption[] = [
  { label: 'Tenses', comingSoon: true },
  { label: 'Grammar', comingSoon: true },
  { label: 'Vocabulary', comingSoon: true },
  { label: 'Speaking', comingSoon: false },
];

export default function PracticeScreen() {
  const [comingSoonLabel, setComingSoonLabel] = useState<string | null>(null);

  const handleSelect = (option: PracticeOption) => {
    if (option.comingSoon) {
      setComingSoonLabel(option.label);
      return;
    }
    setComingSoonLabel(null);
    router.push('/practice-drill');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.subtitle}>What do you want to practice?</Text>

        <View style={{ height: spacing.xl }} />
        {OPTIONS.map((option, index) => (
          <View key={option.label}>
            {index > 0 && <View style={styles.divider} />}
            <Pressable style={styles.row} onPress={() => handleSelect(option)}>
              <Text style={styles.rowLabel}>{option.label}</Text>
              <Text style={styles.rowChevron}>›</Text>
            </Pressable>
          </View>
        ))}

        {comingSoonLabel && (
          <>
            <View style={{ height: spacing.lg }} />
            <Text style={styles.comingSoonText}>{comingSoonLabel} practice is coming next.</Text>
          </>
        )}
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
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  rowLabel: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '600',
  },
  rowChevron: {
    fontSize: fontSizes.lg,
    color: colors.textTertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  comingSoonText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
