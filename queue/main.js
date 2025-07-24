import { Queue } from "./queue.js";

const queue = new Queue()

queue.enqueue('Item 1')
queue.enqueue('Item 2')
queue.enqueue('Item 3')
queue.enqueue('Item 4')

queue.print()
console.log(queue.peek())

queue.dequeue()
queue.dequeue()
console.log(queue.size())
queue.print()
