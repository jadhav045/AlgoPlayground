export function mergeSort(array) {
  const animations = [];
  const aux = array.slice();
  function mergeSortRec(arr, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSortRec(arr, l, m);
    mergeSortRec(arr, m + 1, r);
    // merge
    let i = l,
      j = m + 1,
      k = l;
    while (i <= m || j <= r) {
      if (i <= m && j <= r) {
        animations.push({ type: "compare", indices: [i, j] });
        if (arr[i] <= arr[j]) {
          animations.push({ type: "overwrite", index: k, value: arr[i] });
          aux[k++] = arr[i++];
        } else {
          animations.push({ type: "overwrite", index: k, value: arr[j] });
          aux[k++] = arr[j++];
        }
      } else if (i <= m) {
        animations.push({ type: "overwrite", index: k, value: arr[i] });
        aux[k++] = arr[i++];
      } else {
        animations.push({ type: "overwrite", index: k, value: arr[j] });
        aux[k++] = arr[j++];
      }
    }
    for (let p = l; p <= r; p++) arr[p] = aux[p];
  }
  const arr = array.slice();
  mergeSortRec(arr, 0, arr.length - 1);
  // mark all sorted
  for (let i = 0; i < array.length; i++)
    animations.push({ type: "markSorted", index: i });
  return animations;
}
