export function heapSort(array) {
  const arr = array.slice()
  const animations = []

  function heapify(n, i) {
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2

    if (l < n) animations.push({ type: 'compare', indices: [l, largest] })
    if (r < n) animations.push({ type: 'compare', indices: [r, largest] })

    if (l < n && arr[l] > arr[largest]) largest = l
    if (r < n && arr[r] > arr[largest]) largest = r

    if (largest !== i) {
      animations.push({ type: 'swap', indices: [i, largest] })
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      heapify(n, largest)
    }
  }

  const n = arr.length
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)
  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i] })
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(i, 0)
    animations.push({ type: 'markSorted', index: i })
  }

  animations.push({ type: 'markSorted', index: 0 })
  return animations
}
