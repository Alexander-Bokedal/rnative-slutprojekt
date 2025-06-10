import { ListItemType } from "@/constants/Types";

function mergeItems(items: ListItemType[]): ListItemType[] {
  const map = items.reduce<Record<string, ListItemType>>((acc, current) => {
    const { item, quantity, id } = current;

    if (!acc[item]) {
      acc[item] = { item, quantity: 0, id };
    }

    acc[item].quantity += quantity;
    return acc;
  }, {});

  return Object.values(map);
}

export default mergeItems;
