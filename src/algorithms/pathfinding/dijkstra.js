export function dijkstra(grid, start, target) {
  const numRows = grid.length
  const numCols = grid[0].length
  const distances = Array.from({ length: numRows }, () => Array(numCols).fill(Infinity))
  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false))
  const parent = Array.from({ length: numRows }, () => Array(numCols).fill(null))
  const order = []

  distances[start.row][start.col] = 0

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  function getMin() {
    let minDist = Infinity
    let node = null
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!visited[r][c] && distances[r][c] < minDist) {
          minDist = distances[r][c]
          node = { row: r, col: c }
        }
      }
    }
    return node
  }

  let current = getMin()
  while (current) {
    const { row, col } = current
    if (grid[row][col]) {
      visited[row][col] = true
      current = getMin()
      continue
    }

    order.push({ type: 'visit', cell: current })
    visited[row][col] = true
    if (row === target.row && col === target.col) break

    for (const [dr, dc] of dirs) {
      const nr = row + dr
      const nc = col + dc
      if (nr < 0 || nc < 0 || nr >= numRows || nc >= numCols || visited[nr][nc] || grid[nr][nc]) continue
      const newDist = distances[row][col] + 1
      if (newDist < distances[nr][nc]) {
        distances[nr][nc] = newDist
        parent[nr][nc] = { row, col }
      }
    }
    current = getMin()
  }

  // reconstruct path
  const path = []
  let node = target
  while (node) {
    path.push({ type: 'path', cell: node })
    node = parent[node.row]?.[node.col]
  }
  path.reverse()
  return order.concat(path)
}
