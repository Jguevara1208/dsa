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
