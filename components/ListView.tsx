
import React from 'react';
import { View, Button, FlatList } from 'react-native';
import { ListItem } from '@/components/ListItem';

type Item = {
  id: number;
  text: string;
};

export default function ListView() {
  const [items, setItems] = React.useState<Item[]>([
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Do laundry' },
    { id: 3, text: 'Read a book' },
  ]);

  const [checkedItems, setCheckedItems] = React.useState<number[]>([]);

  function toggleItem(id: number) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }

  function addItem() {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems((prev) => [...prev, { id: newId, text: `New item ${newId}` }]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            number={index + 1}
            text={item.text}
            checked={checkedItems.includes(item.id)}
            onPress={() => toggleItem(item.id)}
          />
        )}
      />
    </View>
  );
}
