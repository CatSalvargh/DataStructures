export class Stack {
    constructor() {
        this.items = {}
        this.top = 0
    }

    size() {
        if (this.top === 0) return null
        return this.top
    }

    push(element) {
        this.items[this.top] = element
        this.top++
    }

    pop() {
        if (this.top === 0) return null
        delete this.items[this.top - 1]
        this.top--
    }

    peek() {
        if (this.top === 0) return null
        return this.items[this.top]
    }

    isEmpty() {
        return this.top === 0 ? true : false
    }

    print() {
        if (this.top === 0) console.log('Empty')
        console.log(this.items)
    }
}