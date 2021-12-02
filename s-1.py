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