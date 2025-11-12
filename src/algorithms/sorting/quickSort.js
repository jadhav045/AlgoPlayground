export function quickSort(array) {
  const arr = array.slice();
  const animations = [];

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push({ type: "compare", indices: [j, high] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        animations.push({ type: "swap", indices: [i, j] });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push({ type: "swap", indices: [i + 1, high] });
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      qs(low, pi - 1);
      qs(pi + 1, high);
    }
  }

  qs(0, arr.length - 1);
  for (let i = 0; i < arr.length; i++)
    animations.push({ type: "markSorted", index: i });

  return animations;
}
