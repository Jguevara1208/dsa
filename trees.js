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
