import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '@/constants/theme';

type Props = {
  icon: string;
  label: string;
  onPress: () => void;
  size?: 'md' | 'lg';
  disabled?: boolean;
};

export default function IconButton({ icon, label, onPress, size = 'md', disabled }: Props) {
  const diameter = size === 'lg' ? 96 : 72;

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.circle,
          { width: diameter, height: diameter, borderRadius: diameter / 2 },
          disabled && styles.circleDisabled,
          pressed && !disabled && styles.circlePressed,
        ]}
      >
        <Text style={[styles.icon, { fontSize: size === 'lg' ? 34 : 26 }]}>{icon}</Text>
      </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  circle: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlePressed: {
    opacity: 0.85,
  },
  circleDisabled: {
    opacity: 0.5,
  },
  icon: {
    color: colors.primaryText,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
