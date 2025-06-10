
import { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from '@/components/ListItem';
import { AddButton } from './AddButton';

type Item = {
  id: number;
  text: string;
};

export default function ListView() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Do laundry' },
    { id: 3, text: 'Read a book' },
  ]);

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const flatListRef = useRef<FlatList<Item>>(null);
  function toggleItem(id: number) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }

  function addItem() {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems((prev) => {
      const newItems = [...prev, { id: newId, text: `New item ${newId}` }];

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });

      return newItems;
    });
  }

  return (
    <View style={{ borderWidth: 5, width: '100%', maxHeight: '100%', flex: 1, padding: 16 }}>

      <View style={{ maxHeight: '90%' }}>
        <FlatList
          ref={flatListRef}
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
      <AddButton onPress={addItem} />
    </View>

  );
}
