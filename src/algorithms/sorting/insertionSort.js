export function insertionSort(array) {
  const arr = array.slice();
  const animations = [];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      animations.push({ type: "overwrite", index: j + 1, value: arr[j] });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    animations.push({ type: "overwrite", index: j + 1, value: key });
  }

  for (let i = 0; i < arr.length; i++)
    animations.push({ type: "markSorted", index: i });

  return animations;
}
