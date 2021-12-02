class Node:
  def __init__(self, val):
    self.val = val
    self.next = None

"""
zipper lists
Write a function, zipper_lists, that takes in the head of two linked lists as arguments. The function should zipper the two lists together into single linked list by alternating nodes. If one of the linked lists is longer than the other, the resulting list should terminate with the remaining nodes. The function should return the head of the zippered linked list.

Do this in -place, by mutating the original Nodes.

You may assume that both input lists are non-empty.

test_00:
a = Node("a")
b = Node("b")
c = Node("c")
a.next = b
b.next = c
# a -> b -> c

x = Node("x")
y = Node("y")
z = Node("z")
x.next = y
y.next = z
# x -> y -> z

zipper_lists(a, x)
# a -> x -> b -> y -> c -> z
"""

def zipper_lists(head_1, head_2):
    head = head_1
    tail = head_1
    curr_1 = head_1.next
    curr_2 = head_2
    count = 0

    while curr_1 is not None and curr_2 is not None:
        if count % 2 == 0:
            tail.next = curr_1.next
            curr_1 = curr_1.next
        else:
            tail.next = curr_2.next
            curr_2 = curr_2.next
        count += 1
        tail = tail.next
    
    if curr_1 is not None: tail.next = curr_1
    if curr_2 is not None: tail.next = curr_2

    return head

"""
merge lists
Write a function, merge_lists, that takes in the head of two sorted linked lists as arguments. The function should merge the two lists together into single sorted linked list. The function should return the head of the merged linked list.

Do this in-place, by mutating the original Nodes.

You may assume that both input lists are non-empty and contain increasing sorted numbers.

test_00:
a = Node(5)
b = Node(7)
c = Node(10)
d = Node(12)
e = Node(20)
f = Node(28)
a.next = b
b.next = c
c.next = d
d.next = e
e.next = f
# 5 -> 7 -> 10 -> 12 -> 20 -> 28

q = Node(6)
r = Node(8)
s = Node(9)
t = Node(25)
q.next = r
r.next = s
s.next = t
# 6 -> 8 -> 9 -> 25

merge_lists(a, q)
# 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 12 -> 20 -> 25 -> 28 
"""


def merge_lists(head_1, head_2):
  dummy_head = Node(None)
  tail = dummy_head
  current_1 = head_1
  current_2 = head_2

  while current_1 is not None and current_2 is not None:
    if current_1.val < current_2.val:
      tail.next = current_1
      current_1 = current_1.next
    else:
      tail.next = current_2
      current_2 = current_2.next
    tail = tail.next

  if current_1 is not None:
      tail.next = current_1
  if current_2 is not None:
      tail.next = current_2

  return dummy_head.next
