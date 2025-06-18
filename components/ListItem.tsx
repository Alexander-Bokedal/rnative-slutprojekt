import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ListItemProps = {
  quantity: number,
  text: string;
  checked?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
};

export function ListItem({ quantity, onDelete, text, checked, onPress }: ListItemProps) {
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

      <View>
        <Text
          style={[
            styles.text,
            { color: colors.text, textDecorationLine: checked ? 'line-through' : 'none' },
          ]}
        >
          {quantity}
          st
          {' '}
          {text}
        </Text>
      </View>
      <Pressable onPress={onDelete} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
        <Text style={{ alignSelf: 'flex-end', color: 'red', fontSize: 18 }}>×</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
