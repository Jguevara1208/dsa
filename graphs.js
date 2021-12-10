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