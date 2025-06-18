import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ListItemProps = {
  quantity: number;
  number: number;
  text: string;
  onPress: () => void;
};

export function RecipeListItem({ text, onPress }: ListItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
});
