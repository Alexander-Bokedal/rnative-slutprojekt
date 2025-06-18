
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ListItemType, RecipeType } from '@/constants/Types';
import uuid from 'react-native-uuid';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ListItem } from './ListItem';
type Props = {
  visible: boolean;
  recipe?: RecipeType;
  onSave: (recipe: RecipeType) => void;
  onClose: () => void;
};

export function RecipeModal({ visible, recipe, onSave, onClose }: Props) {
  const isEditing = Boolean(recipe);

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<ListItemType[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newQty, setNewQty] = useState('1');

  useEffect(() => {
    if (visible && recipe) {
      setName(recipe.name);
      setIngredients([...recipe.ingredients]);
    } else if (!visible) {
      setName('');
      setIngredients([]);
    }
  }, [visible, recipe]);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleClose = () => {
    setName('')
    setIngredients([])
    setNewItem('')
    setNewQty('1')
    onClose()
  }
  function addIngredient() {
    if (!newItem.trim()) return;
    setIngredients((prev) => [
      ...prev,
      { id: uuid.v4() as string, item: newItem.trim(), quantity: +newQty },
    ]);
    setNewItem('');
    setNewQty('1');
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  }

  function handleSave() {
    if (!name.trim()) return;
    onSave({ name: name.trim(), ingredients });
    handleClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.label, { color: colors.text }]}>
            Recipe Name
          </Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter recipe name"
            placeholderTextColor={colors.icon}
          />

          <Text style={[styles.label, { color: colors.text }]}>Ingredients</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex2, { color: colors.text, borderColor: colors.border }]}
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Item"
              placeholderTextColor={colors.icon}
            />
            <TextInput
              style={[styles.input, styles.qty, { color: colors.text, borderColor: colors.border }]}
              value={newQty}
              onChangeText={setNewQty}
              keyboardType="numeric"
            />
            <Button title="Add" onPress={addIngredient} />
          </View>

          <FlatList
            data={ingredients}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.ingRow}>
                <ListItem quantity={item.quantity} text={item.item} onDelete={() => removeIngredient(item.id)} />
              </View>
            )}
            style={styles.list}
          />

          <Button title={isEditing ? 'Save Recipe' : 'Create Recipe'} onPress={handleSave} />
          <Button title="Cancel" color="#888" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flex2: {
    flex: 2,
    marginRight: 8,
  },
  qty: {
    width: 60,
    marginRight: 8,
  },
  ingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  list: {
    maxHeight: 200,
    marginBottom: 12,
  },
});
