export function dfs(grid, start, target) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );
  const order = [];

  function dfsRec(node) {
    if (!node || visited[node.row][node.col]) return false;
    visited[node.row][node.col] = true;
    order.push({ type: "visit", cell: node });
    if (node.row === target.row && node.col === target.col) return true;

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [dr, dc] of dirs) {
      const nr = node.row + dr;
      const nc = node.col + dc;
      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < numRows &&
        nc < numCols &&
        !visited[nr][nc] &&
        !grid[nr][nc]
      ) {
        if (dfsRec({ row: nr, col: nc })) return true;
      }
    }
    return false;
  }

  dfsRec(start);
  return order;
}
