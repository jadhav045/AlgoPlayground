export function bfs(grid, start, target) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );
  const parent = Array.from({ length: numRows }, () =>
    Array(numCols).fill(null)
  );
  const q = [];
  q.push(start);
  visited[start.row][start.col] = true;
  const order = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length) {
    const cur = q.shift();
    order.push({ type: "visit", cell: cur });
    if (cur.row === target.row && cur.col === target.col) break;
    for (const d of dirs) {
      const nr = cur.row + d[0];
      const nc = cur.col + d[1];
      if (nr < 0 || nr >= numRows || nc < 0 || nc >= numCols) continue;
      if (visited[nr][nc]) continue;
      if (grid[nr][nc]) continue; // wall
      visited[nr][nc] = true;
      parent[nr][nc] = cur;
      q.push({ row: nr, col: nc });
    }
  }
  // reconstruct path
  const path = [];
  let node = target;
  while (node) {
    path.push({ type: "path", cell: node });
    const p = parent[node.row]?.[node.col];
    node = p;
  }
  path.reverse();
  return order.concat(path);
}
