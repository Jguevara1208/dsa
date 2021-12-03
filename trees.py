class Node:
  def __init__(self, val):
    self.val = val
    self.left = None
    self.right = None

"""
depth first values
Write a function, depth_first_values, that takes in the root of a binary tree. The function should return a list containing all values of the tree in depth-first order.

Hey. This is our first binary tree problem, so you should be liberal with watching the Approach and Walkthrough. Be productive, not stubborn. -AZ

test_00:
a = Node('a')
b = Node('b')
c = Node('c')
d = Node('d')
e = Node('e')
f = Node('f')        
a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#      a
#    /   \
#   b     c
#  / \     \
# d   e     f

depth_first_values(a)
#   -> ['a', 'b', 'd', 'e', 'c', 'f']
"""


from collections import deque
def depth_first_values(root):
  stack = [root]
  res = []
  while len(stack) > 0:
    current = stack.pop()
    if current is not None:
      res.append(current.val)

      if current.right is not None:
        stack.append(current.right)
      if current.left is not None:
        stack.append(current.left)

  return res


def depth_first_values(root):
    if not root:
        return []
    left_values = depth_first_values(root.left)
    right_values = depth_first_values(root.right)
    return [root.val, *left_values, *right_values]


"""
breadth first values
Write a function, breadth_first_values, that takes in the root of a binary tree. The function should return a list containing all values of the tree in breadth-first order.

test_00:
a = Node('a')
b = Node('b')
c = Node('c')
d = Node('d')
e = Node('e')
f = Node('f')

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#      a
#    /   \
#   b     c
#  / \     \
# d   e     f

breadth_first_values(a) 
#    -> ['a', 'b', 'c', 'd', 'e', 'f']
"""


def breadth_first_values(root):
  if root is None:
    return []

  queue = deque([root])
  res = []

  while queue:
    current = queue.popleft()
    res.append(current.val)

    if current.left:
      queue.append(current.left)

    if current.right:
      queue.append(current.right)

  return res


"""
tree sum
Write a function, tree_sum, that takes in the root of a binary tree that contains number values. The function should return the total sum of all values in the tree.

test_00:
a = Node(3)
b = Node(11)
c = Node(4)
d = Node(4)
e = Node(-2)
f = Node(1)

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#       3
#    /    \
#   11     4
#  / \      \
# 4   -2     1

tree_sum(a) # -> 21
"""


#ITERATIVE
def tree_sum(root):
  if root is None:
    return 0

  sum = 0
  stack = [root]

  while stack:
    current = stack.pop()
    sum += current.val

    if current.right is not None:
      stack.append(current.right)
    if current.left is not None:
      stack.append(current.left)

  return sum

#RECURSIVE
def tree_sum(root):
  if root is None:
    return 0
  return root.val + tree_sum(root.left) + tree_sum(root.right)


"""
tree includes
Write a function, tree_includes, that takes in the root of a binary tree and a target value. The function should return a boolean indicating whether or not the value is contained in the tree.

test_00:
a = Node("a")
b = Node("b")
c = Node("c")
d = Node("d")
e = Node("e")
f = Node("f")

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#      a
#    /   \
#   b     c
#  / \     \
# d   e     f

tree_includes(a, "e") # -> True
"""


def tree_includes(root, target):
  if not root:
    return False

  stack = [root]

  while stack:
    current = stack.pop()

    if current.val == target:
      return True

    if current.left is not None:
      stack.append(current.left)
    if current.right is not None:
      stack.append(current.right)

  return False

"""
tree min value
Write a function, tree_min_value, that takes in the root of a binary tree that contains number values. The function should return the minimum value within the tree.

You may assume that the input tree is non-empty.

test_00:
a = Node(3)
b = Node(11)
c = Node(4)
d = Node(4)
e = Node(-2)
f = Node(1)

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#       3
#    /    \
#   11     4
#  / \      \
# 4   -2     1
tree_min_value(a) # -> -2
"""


def tree_min_value(root):
  min_val = root.val
  stack = [root]

  while stack:
    current = stack.pop()
    if current.val < min_val:
      min_val = current.val

    if current.left is not None:
      stack.append(current.left)
    if current.right is not None:
      stack.append(current.right)

  return min_val


"""
max root to leaf path sum
Write a function, max_path_sum, that takes in the root of a binary tree that contains number values. The function should return the maximum sum of any root to leaf path within the tree.

You may assume that the input tree is non-empty.

test_00:
a = Node(3)
b = Node(11)
c = Node(4)
d = Node(4)
e = Node(-2)
f = Node(1)

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

#       3
#    /    \
#   11     4
#  / \      \
# 4   -2     1

max_path_sum(a) # -> 18
"""


def max_path_sum(root):
  if root is None:
    return float('-inf')

  if root.left is None and root.right is None:
    return root.val

  return root.val + max(max_path_sum(root.left), max_path_sum(root.right))
