
import { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from '@/components/ListItem';
import { AddButton } from './AddButton';
import mergeItems from '@/utils/mergeItems';
import { ListItemType } from '@/constants/Types';

export default function ListView() {
  const [items, setItems] = useState<ListItemType[]>([
    { id: 1, item: 'Buy groceries', quantity: 3 },
    { id: 2, item: 'Do laundry', quantity: 2 },
    { id: 3, item: 'Read a book', quantity: 1 },
  ]);

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const flatListRef = useRef<FlatList<ListItemType>>(null);
  function toggleItem(id: number) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }

  function addItem() {
    const newId = Date.now()
    setItems((prev) => {
      const newItems = [...prev, { id: newId, item: `New item ${newId}`, quantity: 3 }];

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });

      return mergeItems(newItems);
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
              text={item.item}
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
