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