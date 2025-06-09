import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ListItemProps = {
  number: number;
  text: string;
  checked: boolean;
  onPress: () => void;
};

export function ListItem({ number, text, checked, onPress }: ListItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: checked ? colors.tint : colors.border,
          opacity: pressed ? 0.5 : checked ? 0.6 : 1,
        },
      ]}
    >
      <Text style={[styles.number, { color: colors.text }]}>{number}.</Text>
      <Text
        style={[
          styles.text,
          { color: colors.text, textDecorationLine: checked ? 'line-through' : 'none' },
        ]}
      >
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
    borderWidth: 1,
    marginBottom: 8,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
});
