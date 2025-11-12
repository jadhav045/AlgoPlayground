export function aStar(grid, start, target) {
  const numRows = grid.length
  const numCols = grid[0].length
  const g = Array.from({ length: numRows }, () => Array(numCols).fill(Infinity))
  const f = Array.from({ length: numRows }, () => Array(numCols).fill(Infinity))
  const parent = Array.from({ length: numRows }, () => Array(numCols).fill(null))
  const openSet = [{ row: start.row, col: start.col }]
  const order = []

  g[start.row][start.col] = 0
  f[start.row][start.col] = heuristic(start, target)

  function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
  }

  function getLowestF() {
    return openSet.reduce(
      (min, n) =>
        f[n.row][n.col] < f[min.row][min.col] ? n : min,
      openSet[0]
    )
  }

  while (openSet.length) {
    const current = getLowestF()
    const { row, col } = current
    order.push({ type: 'visit', cell: current })

    if (row === target.row && col === target.col) break

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]

    openSet.splice(
      openSet.findIndex((n) => n.row === row && n.col === col),
      1
    )

    for (const [dr, dc] of dirs) {
      const nr = row + dr
      const nc = col + dc
      if (nr < 0 || nc < 0 || nr >= numRows || nc >= numCols || grid[nr][nc])
        continue

      const tempG = g[row][col] + 1
      if (tempG < g[nr][nc]) {
        parent[nr][nc] = { row, col }
        g[nr][nc] = tempG
        f[nr][nc] = g[nr][nc] + heuristic({ row: nr, col: nc }, target)
        if (!openSet.find((n) => n.row === nr && n.col === nc))
          openSet.push({ row: nr, col: nc })
      }
    }
  }

  const path = []
  let node = target
  while (node) {
    path.push({ type: 'path', cell: node })
    node = parent[node.row]?.[node.col]
  }
  path.reverse()
  return order.concat(path)
}
