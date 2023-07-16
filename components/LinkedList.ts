export default class LinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;

  constructor(args: T | T[]) {
    if (Array.isArray(args)) {
      if (args.length === 0) {
        this.head = null;
        this.tail = null;
        return;
      }
      this.head = new ListNode(args[0]);
      if (args.length > 1) {
        let currNode = this.head;
        for (let i = 1; i < args.length; i++) {
          const val = args[i];
          currNode.next = new ListNode(val);
          currNode = currNode.next;
        }
        this.tail = currNode;
      } else this.tail = this.head;
    } else {
      this.head = new ListNode(args);
      this.tail = this.head;
    }
  }
}

export class ListNode<T> {
  val: T | null;
  next: ListNode<T> | null;

  constructor(val?: T, next?: ListNode<T>) {
    this.val = val ? val : null;
    this.next = next ? next : null;
  }
}