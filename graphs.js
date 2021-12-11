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
