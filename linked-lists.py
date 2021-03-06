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


"""
is univalue list
Write a function, is_univalue_list, that takes in the head of a linked list as an argument. The function should return a boolean indicating whether or not the linked list contains exactly one unique value.

You may assume that the input list is non-empty.

test_00:
a = Node(7)
b = Node(7)
c = Node(7)

a.next = b
b.next = c

# 7 -> 7 -> 7

is_univalue_list(a) # True
"""


def is_univalue_list(head):
  one_val = head.val
  while head is not None:
    if head.val != one_val:
      return False
    head = head.next
  return True


"""
longest streak
Write a function, longest_streak, that takes in the head of a linked list as an argument. The function should return the length of the longest consecutive streak of the same value within the list.

test_00:
a = Node(5)
b = Node(5)
c = Node(7)
d = Node(7)
e = Node(7)
f = Node(6)

a.next = b
b.next = c
c.next = d
d.next = e
e.next = f

# 5 -> 5 -> 7 -> 7 -> 7 -> 6

longest_streak(a) # 3
  """

def longest_streak(head):
  max = 0
  curr = 0
  prev = None
  curr_node = head

  while curr_node is not None:
      if curr_node.val == prev:
        curr += 1
      else:
        curr = 1

      prev = curr_node.val
      if curr > max:
        max = curr

      curr_node = curr_node.next
  return max


"""
remove node
Write a function, remove_node, that takes in the head of a linked list and a target value as arguments. The function should delete the node containing the target value from the linked list and return the head of the resulting linked list. If the target appears multiple times in the linked list, only remove the first instance of the target in the list.

Do this in-place.

You may assume that the input list is non-empty.

test_00:
a = Node("a")
b = Node("b")
c = Node("c")
d = Node("d")
e = Node("e")
f = Node("f")

a.next = b
b.next = c
c.next = d
d.next = e
e.next = f

# a -> b -> c -> d -> e -> f

remove_node(a, "c")
# a -> b -> d -> e -> f
"""

def remove_node(head, target_val):
  if head.val == target_val:
    return head.next

  curr = head
  prev = None

  while head is not None:
    if curr.val == target_val:
      prev.next = curr.next
      break
    prev = curr
    curr = curr.next

  return head

"""
insert node
Write a function, insert_node, that takes in the head of a linked list, a value, and an index. The function should insert a new node with the value into the list at the specified index. Consider the head of the linked list as index 0. The function should return the head of the resulting linked list.

Do this in-place.

You may assume that the input list is non-empty and the index is not greater than the length of the input list.

test_00:
a = Node("a")
b = Node("b")
c = Node("c")
d = Node("d")

a.next = b
b.next = c
c.next = d

# a -> b -> c -> d

insert_node(a, 'x', 2)
# a -> b -> x -> c -> d
"""

def insert_node(head, value, index):
  if index == 0:
    new_node = Node(value)
    new_node.next = head
    return new_node

  curr_index = 1
  curr_node = head.next

  while curr_node is not None:
    if curr_index == index - 1:
      temp_next = curr_node.next
      curr_node.next = Node(value)
      curr_node.next.next = temp_next

    curr_index += 1
    curr_node = curr_node.next

  return head


"""
create linked list
Write a function, create_linked_list, that takes in a list of values as an argument. The function should create a linked list containing each item of the list as the values of the nodes. The function should return the head of the linked list.

test_00:
create_linked_list(["h", "e", "y"])
# h -> e -> y
"""


def create_linked_list(values):
  dummy = Node(None)
  tail = dummy
  for val in values:
    tail.next = Node(val)
    tail = tail.next
  return dummy.next


"""
add lists
Write a function, add_lists, that takes in the head of two linked lists, each representing a number. The nodes of the linked lists contain digits as values. The nodes in the input lists are reversed; this means that the least significant digit of the number is the head. The function should return the head of a new linked listed representing the sum of the input lists. The output list should have it's digits reversed as well.

Say we wanted to compute 621 + 354 normally. The sum is 975:

   621
 + 354
 -----
   975

Then, the reversed linked list format of this problem would appear as:

    1 -> 2 -> 6
 +  4 -> 5 -> 3
 --------------
    5 -> 7 -> 9
test_00:
#   621
# + 354
# -----
#   975

a1 = Node(1)
a2 = Node(2)
a3 = Node(6)
a1.next = a2
a2.next = a3
# 1 -> 2 -> 6

b1 = Node(4)
b2 = Node(5)
b3 = Node(3)
b1.next = b2
b2.next = b3
# 4 -> 5 -> 3

add_lists(a1, b1)
# 5 -> 7 -> 9
"""

def add_lists(head_1, head_2):
  dummy_head = Node(None)
  tail = dummy_head
  remainder = False

  while head_1 is not None or head_2 is not None:

    val_1 = 0 if head_1 is None else head_1.val
    val_2 = 0 if head_2 is None else head_2.val
    value = val_1 + val_2

    if remainder is True:
      value += 1

    if value >= 10:
      value = value - 10
      remainder = True
    else:
      remainder = False

    tail.next = Node(value)
    tail = tail.next
    head_1 = None if head_1 is None else head_1.next
    head_2 = None if head_2 is None else head_2.next

  if remainder is True:
    tail.next = Node(1)

  return dummy_head.next
