import { Stack } from "./stack.js";
import { StackArr } from "./stackArray.js";

// STACK from Object
const stack = new Stack()

stack.push('item 1')
stack.push('item 2')
stack.push('item 3')
stack.push('item 4')

stack.print()

stack.pop()

stack.print()

// STACK from Array
const stArr = new StackArr()

stArr.push('el 1')
stArr.push('el 2')
stArr.push('el 3')
stArr.push('el 4')

stArr.print()
stArr.pop()
stArr.print()