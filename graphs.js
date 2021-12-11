/*
connected components count
Write a function, connectedComponentsCount, that takes in the adjacency list of an undirected graph. The function should return the number of connected components within the graph.

test_00:
connectedComponentsCount({
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2]
}); // -> 2
*/

const connectedComponentsCount = (graph) => {
  let count = 0
  let visited = new Set()
  for (let node in graph) {
    if (explore(graph, node, visited) === true) {
      count += 1
    }
  }
  return count
}

const explore = (graph, node, visited) => {
  if (visited.has(+node)) return false
  
  visited.add(+node)
  
  for (let adj of graph[node]) {
    explore(graph, adj, visited)
  }
  
  return true
}

/*
largest component
Write a function, largestComponent, that takes in the adjacency list of an undirected graph. The function should return the size of the largest connected component in the graph.

test_00:
largestComponent({
  0: ['8', '1', '5'],
  1: ['0'],
  5: ['0', '8'],
  8: ['0', '5'],
  2: ['3', '4'],
  3: ['2', '4'],
  4: ['3', '2']
}); // -> 4
*/

const largestComponent = (graph) => {
  let currentHigh = 0
  let visited = new Set()
  
  for (let node in graph) {
    let currentCount = explore(graph, node, visited)
    if (currentCount > currentHigh) currentHigh = currentCount
  }
  
  return currentHigh
};

const explore = (graph, node, visited) => {
  if (visited.has(+node)) return 0
  visited.add(+node)
  
  let size = 1
  
  for (let adj of graph[node]) {
   size += explore(graph, adj, visited)
  }
  
  return size
}

/*
shortest path
Write a function, shortestPath, that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB). The function should return the length of the shortest path between A and B. Consider the length as the number of edges in the path, not the number of nodes. If there is no path between A and B, then return -1.

test_00:
const edges = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v']
];

shortestPath(edges, 'w', 'z'); // -> 2
*/

const shortestPath = (edges, nodeA, nodeB) => {
  const graph = createGraph(edges)
  const visited = new Set([nodeA])
  const queue = [[nodeA, 0]]
  
  while (queue.length) {
    const [current, distance] = queue.shift()
    if (current === nodeB) return distance
    
    for (let adj of graph[current]) {
      if (!visited.has(adj)) {
        visited.add(adj)
        queue.push([adj, distance + 1])
      }
    }
  }
  return -1
};

const createGraph = (edges) => {
  const graph = {}
  for (let edge of edges) {
    const [left, right] = edge
    if (!(left in graph)) graph[left] = []
    if (!(right in graph)) graph[right] = []
    graph[left].push(right)
    graph[right].push(left)
  }
  return graph
}


/*
island count
Write a function, islandCount, that takes in a grid containing Ws and Ls. W represents water and L represents land. The function should return the number of islands on the grid. An island is a vertically or horizontally connected region of land.

test_00:
const grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

islandCount(grid); // -> 3
*/

const islandCount = (grid) => {
  const visited = new Set()
  let count = 0
  
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++){
      if (explore(grid, r, c, visited) === true) {
       count += 1 
      }
    }
  }
  
  return count
};

const explore = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length;
  const colInbounds = 0 <= c && c < grid.length;
  if (!rowInbounds || !colInbounds) return false
  
  if (grid[r][c] === 'W') return false
  
  const pos = `${r},${c}`;
  if (visited.has(pos)) return false;
  visited.add(pos);
  
  explore(grid, r - 1, c, visited)
  explore(grid, r + 1, c, visited)
  explore(grid, r, c - 1, visited)
  explore(grid, r, c + 1, visited)
  
  return true
}

/*
minimum island
Write a function, minimumIsland, that takes in a grid containing Ws and Ls. W represents water and L represents land. The function should return the size of the smallest island. An island is a vertically or horizontally connected region of land.

You may assume that the grid contains at least one island.

test_00:
const grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

minimumIsland(grid); // -> 2
*/

const minimumIsland = (grid) => {
  
  let currSmallest = Infinity
  const visited = new Set()
  
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let currLength = explore(grid, r, c, visited)
      if (currLength > 0 && currLength < currSmallest) {
        currSmallest = currLength
      }
    }
  }
  return currSmallest
};

const explore = (grid, r, c, visited) => {
  const rowInbounds = r >= 0 && r < grid.length
  const colInbounds = c >= 0 && c < grid[0].length
  if (!rowInbounds || !colInbounds) return 0
  
  if (grid[r][c] === 'W') return 0
  
  const pos = r + ',' + c
  if(visited.has(pos)) return 0
  visited.add(pos)
  
  let count = 1 
  count += explore(grid, r + 1, c, visited)
  count += explore(grid, r - 1, c, visited)
  count += explore(grid, r, c + 1, visited)
  count += explore(grid, r, c - 1, visited)
  
  return count
}

/*
closest carrot
Write a function, closestCarrot, that takes in a grid, a starting row, and a starting column. In the grid, 'X's are walls, 'O's are open spaces, and 'C's are carrots. The function should return a number representing the length of the shortest path from the starting position to a carrot. You may move up, down, left, or right, but cannot pass through walls (X). If there is no possible path to a carrot, then return -1.
*/
const closestCarrot = (grid, startRow, startCol) => {
  const visited = new Set( [`${startRow},${startCol}`] )
  const queue = [ [ startRow, startCol, 0 ] ]
  
  while (queue.length) {
    const [row, col, distance] = queue.shift()
    
    if (grid[row][col] === 'C') return distance
    
    const deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    for (let delta of deltas) {
      const [rowDelta, colDelta] = delta
      const neighborRow = row + rowDelta
      const neighborCol = col + colDelta
      const rowInbounds = 0 <= neighborRow && neighborRow < grid.length
      const colInbounds = 0 <= neighborCol && neighborCol < grid[0].length
      const pos = `${neighborRow},${neighborCol}`
      if (
        rowInbounds 
        && colInbounds 
        && grid[neighborRow][neighborCol] !== 'X'
        && !visited.has(pos)
      ) {
        queue.push([neighborRow, neighborCol, distance + 1])
        visited.add(pos)
      }
    }
  }
  
  return -1 
};