class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        const sorted = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(sorted, 0, sorted.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;
        
        const mid =  Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

    //BASIC OPS: insert, remove, find
    insert(value) {
        this.root = this.insertRecursively(this.root, value);
    }

    insertRecursively(node, value) {
        if (!node) return new Node(value);

        if (value === node.data) return node;

        if (value < node.data) {
            node.left = this.insertRecursively(node.left, value);
        } else {
            node.right = this.insertRecursively(node.right, value);
        }

        return node;
    }

    find(value) {
        return this.findRecursively(this.root, value)
    }

    findRecursively(node, value) {
        if (!node) return null;

        if (value === node.data) return node;

        if (value < node.data) return this.findRecursively(node.left, value);
        
        return this.findRecursively(node.right, value);
    }

    remove(value) {
        this.root = this.removeRecursively(this.root, value);
        //removeRecursively handles these cases: node with 0 children, 1 child, two children
    }

    removeRecursively(node, value) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this.removeRecursively(node.left, value);
        } else if (value > node.data) {
            node.right = this.removeRecursively(node.right, value);
        } else {
            //This case is triggered when the node is found, i.e., value === node.data

            //No children
            if (!node.left && !node.right) return null;

            //One child, left or right
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            //Two children
            const successor = this.minValue(node.right);
            node.data = successor.data;
            node.right = this.removeRecursively(node.right, successor.data)
        }

        return node;
    }

    minValue(node) {
        let current = node;
        while (current && current.left) {
            current = current.left;
        }
        
        return current;
    }

    // TRAVERSALS  - 1. Depth first
    // Left --> Root --> Right
    inOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('callback required. Correct syntax: inOrderForEach(callback)') 
        if (!node) return;

        this.inOrderForEach(callback, node.left)
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    // Root --> Left --> Right
    preOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('callback required. Correct syntax: preOrderForEach(callback)') 
        if (!node) return;

        callback(node)
        this.preOrderForEach(callback, node.left)
        this.preOrderForEach(callback, node.right)
    }

    // Left --> Right --> Root 
    postOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('callback required. Correct syntax: postOrderForEach(callback)') 
        if (!node) return;

        this.postOrderForEach(callback, node.left)
        this.postOrderForEach(callback, node.right)
        callback(node)
    }

    // TRAVERSALS  - 2. Level Order (Breadth first)
    levelOrderForEach(callback) {
        if (!callback) throw new Error('callback required. Correct syntax: levelOrderForEach(callback)') 
        if (!this.root) return;

        const queue = [this.root] //enqueue the root

        while (queue.length > 0) {
            const node = queue.shift() //dequeue to visit next node at the head of the queue
            callback(node)

            //push the next level: left and right to the queue
            if (node.left) queue.push(node.left); 
            if (node.right) queue.push(node.right);
        }
    }

    height(value) {
       const node = this.find(value);
       if (!node) return null; 

        return  this.heightRecurs(node);
    }

    heightRecurs(current) {
        if (!current) return -1;

        return Math.max(this.heightRecurs(current.left), this.heightRecurs(current.right)) + 1;
    }
        
    depth(value, node = this.root, currentDepth = 0) {
        if (!node) return null;

        if (node.data === value) return currentDepth;

        if (value < node.data) {
            return this.depth(value, node.left, currentDepth + 1);
        } else {
            return this.depth(value, node.right, currentDepth + 1);
        }
    }

    isBalanced(node = this.root) {
        if (!node) return true;

        const leftHeight = this.heightRecurs(node.left);
        const rightHeight = this.heightRecurs(node.right);

        const balanced = Math.abs(leftHeight - rightHeight) <= 1;

        return balanced &&
                this.isBalanced(node.left) &&
                this.isBalanced(node.right);
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.data));
        this.root = this.buildTree(values, 0, values.length - 1);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }

        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

