/*
tree value count
Write a function, treeValueCount, that takes in the root of a binary tree and a target value. The function should return the number of times that the target occurs in the tree.

test_00:
const a = new Node(12);
const b = new Node(6);
const c = new Node(6);
const d = new Node(4);
const e = new Node(6);
const f = new Node(12);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      12
//    /   \
//   6     6
//  / \     \
// 4   6     12

treeValueCount(a,  6); // -> 3
*/

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const treeValueCount = (root, target) => {
  if (root === null) return 0
  
  const stack = [ root ]
  let count = 0
  
  while (stack.length > 0) {
    
    current = stack.pop();
    
    if (current.val === target) count++;
    if (current.right !== null) stack.push(current.right)
    if (current.left !== null) stack.push(current.left)
  }
  
  return count
};

/*
how high
Write a function, howHigh, that takes in the root of a binary tree. The function should return a number representing the height of the tree.

The height of a binary tree is defined as the maximal number of edges from the root node to any leaf node.

If the tree is empty, return -1.

test_00:
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

howHigh(a); // -> 2
*/

const howHigh = (node) => {
  if (node === null) return -1
  let leftTree = howHigh(node.left)
  let rightTree = howHigh(node.right)
  return 1 + Math.max(leftTree, rightTree)
};

/*
bottom right value
Write a function, bottomRightValue, that takes in the root of a binary tree. The function should return the right-most value in the bottom-most level of the tree.

You may assume that the input tree is non-empty.

test_00:
const a = new Node(3);
const b = new Node(11);
const c = new Node(10);
const d = new Node(4);
const e = new Node(-2);
const f = new Node(1);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//       3
//    /    \
//   11     10
//  / \      \
// 4   -2     1

bottomRightValue(a); // -> 1
*/

const bottomRightValue = (root) => {
  const queue = [ root ]
  let current = null
  while (queue.length > 0){
    current = queue.shift()
    
    if (current.left !== null) queue.push(current.left)
    if (current.right !== null) queue.push(current.right)
  }
  
  return current.val
};

/*
all tree paths
Write a function, allTreePaths, that takes in the root of a binary tree. The function should return a 2-Dimensional array where each subarray represents a root-to-leaf path in the tree.

The order within an individual path must start at the root and end at the leaf, but the relative order among paths in the outer array does not matter.

You may assume that the input tree is non-empty.

test_00:
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

allTreePaths(a); // ->
// [ 
//   [ 'a', 'b', 'd' ], 
//   [ 'a', 'b', 'e' ], 
//   [ 'a', 'c', 'f' ] 
// ] 
*/

const allTreePaths = (root) => {
  if (root === null) return []
  if (root.left === null && root.right === null) return [ [root.val] ]
  
  const paths = []
  
  let left = allTreePaths(root.left)
  for (let path of left){
    paths.push([root.val, ...path])
  }
  
  let right = allTreePaths(root.right)
  for (let path of right){
    paths.push([root.val, ...path])
  }
  
  return paths
}

/*
has path
Write a function, hasPath, that takes in an object representing the adjacency list of a directed acyclic graph and two nodes (src, dst). The function should return a boolean indicating whether or not there exists a directed path between the source and destination nodes.

Hey. This is our first graph problem, so you should be liberal with watching the Approach and Walkthrough. Be productive, not stubborn. -AZ

test_00:
const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: []
};

hasPath(graph, 'f', 'k'); // true
*/

const hasPath = (graph, src, dst) => {
  if (src === dst) return true
  
  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst) === true) {
      return true
    }
  }
  return false
};

/*
undirected path
Write a function, undirectedPath, that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB). The function should return a boolean indicating whether or not there exists a path between nodeA and nodeB.

test_00:
const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n']
];

undirectedPath(edges, 'j', 'm'); // -> true
*/

const undirectedPath = (edges, nodeA, nodeB) => {
  const adj_list = buildGraph(edges)
  return hasPath(adj_list, nodeA, nodeB, new Set())
};

const hasPath = (graph, src, dst, visited) => {
  if (src === dst) return true
  
  for (let neighbor of graph[src]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor)
      if (hasPath(graph, neighbor, dst, visited)) {
        return true
      }
    }
  }
  return false
}

const buildGraph = (edges) => {
  const graph = {};
  
  for (let edge of edges) {
    const [ a, b ] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  
  return graph;
};


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
  
  for (let node in graph){
    if (exploreGraph(graph, node, visited) === true) {
      count++
    }
  }
  return count
};

const exploreGraph = (graph, current, visited) => {
  if (visited.has(String(current))) return false
  
  visited.add(String(current))
  
  for (let neighbor of graph[current]) {
    exploreGraph(graph, neighbor, visited)
  }
  
  return true
}


/*
all tree paths
Write a function, allTreePaths, that takes in the root of a binary tree. The function should return a 2-Dimensional array where each subarray represents a root-to-leaf path in the tree.

The order within an individual path must start at the root and end at the leaf, but the relative order among paths in the outer array does not matter.

You may assume that the input tree is non-empty.

test_00:
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

allTreePaths(a); // ->
// [ 
//   [ 'a', 'b', 'd' ], 
//   [ 'a', 'b', 'e' ], 
//   [ 'a', 'c', 'f' ] 
// ] 
*/

const allTreePaths = (root) => {
  if (root === null) return []
  if (root.left === null && root.right === null) return [[root.val]]
  
  const paths = []

  const leftSubs = allTreePaths(root.left)
  for (let sub of leftSubs) paths.push([root.val, ...sub])
  
  const rightSubs = allTreePaths(root.right)
  for (let sub of rightSubs) paths.push([root.val, ...sub])
  
  return paths
}

/*
tree levels
Write a function, treeLevels, that takes in the root of a binary tree. The function should return a 2-Dimensional array where each subarray represents a level of the tree.

test_00:
const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

treeLevels(a); // ->
// [
//   ['a'],
//   ['b', 'c'],
//   ['d', 'e', 'f']
// ]
*/

const treeLevels = (root) => {
  
  const res = []
  const stack = [{node: root, level: 0}]
  
  while (stack.length){
    const current = stack.pop()
    let {node, level} = current
    if (node !== null) {
      if (!res[level]) res[level] = []
      res[level].push(node.val)
  
      if (node.right !== null) {
        stack.push({node: node.right, level: level + 1})
      }

      if (node.left !== null) {
        stack.push({node: node.left, level: level + 1})
      } 
    }
  }
  
  return res
};
