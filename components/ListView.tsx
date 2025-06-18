
import { useRef, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from '@/components/ListItem';
import { AddButton } from './AddButton';
import mergeItems from '@/utils/mergeItems';
import { AddItemModal } from './AddItemModal';
import { ListItemType } from '@/constants/Types';
import uuid from 'react-native-uuid'
import { RemoveButton } from './ClearButton';
import useRecipeStore from '@/stores/recipeStore';
import { RecipeListItem } from './RecipeListItem';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
export default function ListView() {

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [items, setItems] = useState<ListItemType[]>([
  ]);
  const recipes = useRecipeStore((state) => state.recipes)
  const [modalVisible, setModalVisible] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const flatListRef = useRef<FlatList<ListItemType>>(null);
  function toggleItem(id: string) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setCheckedItems(prev => prev.filter(cid => cid !== id));
  };

  return (
    <View style={{ width: '100%', maxHeight: '100%', flex: 1, padding: 1 }}>

      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={{ maxHeight: '90%', flex: 2, borderRightWidth: 2, borderColor: colors.tint, padding: 16, }}>

          <Text style={{ borderBottomWidth: 2, marginBottom: 10, color: colors.text, fontSize: 18, textAlign: 'center', padding: 6 }}> Shopping List </Text>
          <FlatList
            ref={flatListRef}
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                quantity={item.quantity}
                text={item.item}
                checked={checkedItems.includes(item.id)}
                onPress={() => toggleItem(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            )}
          />
        </View>
        <View style={{ maxHeight: '90%', flex: 1, borderRightWidth: 2, padding: 16, }}>
          <Text style={{ borderBottomWidth: 2, marginBottom: 10, color: colors.text, fontSize: 18, textAlign: 'center', padding: 6 }}> Recipes </Text>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.name}
            renderItem={(item) => (
              <RecipeListItem text={item.item.name} onPress={() => {
                const newItem = item.item.ingredients
                setItems((prev) => mergeItems([...prev, ...newItem]));
              }} />


            )} />

        </View>
      </View>

      <AddButton onPress={() => setModalVisible(true)} />
      <RemoveButton onPress={() => { setItems([]) }} />
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(item, quantity) => {
          const newId = uuid.v4()
          const newItem = { id: newId, item, quantity };
          setItems((prev) => mergeItems([...prev, newItem]));

          requestAnimationFrame(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          });
        }}
      />
    </View>

  );
}
