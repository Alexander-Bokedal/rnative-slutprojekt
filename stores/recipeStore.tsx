import { create } from 'zustand';
import { ListItemType, RecipeType } from '@/constants/Types';
import uuid from 'react-native-uuid';

type RecipeState = {
	recipes: RecipeType[];
	addRecipe: (name: string, items: ListItemType[]) => void;
	updateRecipe: (oldName: string, data: RecipeType) => void;
	deleteRecipe: (name: string) => void;
};

const useRecipeStore = create<RecipeState>((set) => ({
	recipes: [
		{
			name: 'Lasagna',
			ingredients: [
				{ id: uuid.v4() as string, item: 'cheese', quantity: 10 },
				{ id: uuid.v4() as string, item: 'meat', quantity: 500 },
			],
		},
	],
	addRecipe: (name, items) =>
		set((state) => ({
			recipes: [
				...state.recipes,
				{ name, ingredients: items },
			],
		})),
	updateRecipe: (oldName, updated) =>
		set((state) => ({
			recipes: state.recipes.map((r) =>
				r.name === oldName ? updated : r
			),
		})),
	deleteRecipe: (name) =>
		set((state) => ({
			recipes: state.recipes.filter((r) => r.name !== name),
		})),
}));

export default useRecipeStore;
