import { Tree } from "./bst.js";

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const tree = new Tree(test)

tree.insert(11)
tree.insert(12)
tree.insert(14)
console.log('Is tree balanced: ', tree.isBalanced())
tree.prettyPrint()
tree.rebalance()
console.log('Is tree balanced: ', tree.isBalanced())
tree.prettyPrint()

tree.levelOrderForEach(node => console.log('Level Order', node.data))
tree.inOrderForEach(node => console.log('In Order', node.data))
tree.preOrderForEach(node => console.log('Pre Order', node.data))
tree.postOrderForEach(node => console.log('Post Order', node.data))