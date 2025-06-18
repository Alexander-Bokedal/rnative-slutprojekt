import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import useRecipeStore from '@/stores/recipeStore';
import { AddButton } from '@/components/AddButton';
import { RecipeModal } from '@/components/RecipeModal';
import { RecipeType } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
export default function TabTwoScreen() {

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const recipes = useRecipeStore((s) => s.recipes);
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  const [modalOpen, setModalOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState<RecipeType | undefined>();

  function openNew() {
    setEditRecipe(undefined);
    console.log(' i clicked here')
    console.log(editRecipe, 'This is the recipe')
    setModalOpen(true);

  }

  const onClose = () => {
    setModalOpen(false)
    setEditRecipe(undefined);
  }
  function openEdit(recipe: RecipeType) {
    setEditRecipe(recipe);
    setModalOpen(true);
  }
  useEffect(() => {
    console.log(editRecipe);
  }, [editRecipe])
  function onSave(recipe: RecipeType) {
    if (editRecipe) updateRecipe(editRecipe.name, recipe);
    else addRecipe(recipe.name, recipe.ingredients);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={r => r.name}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            <Pressable onPress={() => openEdit(item)} style={styles.rowPressable}>
              <Text style={[styles.recipeName, { color: colors.text }]}>{item.name}</Text>
              <Pressable
                onPress={() => deleteRecipe(item.name)}
                style={({ pressed }) => [
                  styles.deleteBtn,
                  { opacity: pressed ? 0.5 : 1 },
                ]}>
                <Text style={styles.deleteText}>×</Text>
              </Pressable>
            </Pressable>
          </View>
        )}
      />
      <AddButton onPress={openNew} />
      <RecipeModal
        visible={modalOpen}
        recipe={editRecipe}
        onSave={onSave}
        onClose={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  recipeRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#888',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeName: {
    flex: 1,
    fontSize: 18,
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 'auto',
  },
  deleteText: {
    color: 'red',
    fontSize: 18,
  },
});
