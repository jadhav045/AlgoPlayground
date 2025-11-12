export function bubbleSort(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        animations.push({ type: "swap", indices: [j, j + 1] });
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
    // mark the last as sorted
    animations.push({ type: "markSorted", index: n - i - 1 });
  }
  animations.push({ type: "markSorted", index: 0 });
  return animations;
}
