export function getCyclicItem<Item>(items: readonly Item[], index: number): Item {
  return items[index % items.length]
}
