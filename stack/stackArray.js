export class StackArr {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        if (this.top === 0) return null
        this.items.pop()
    }

    peek() {
        if (this.top === 0) return null
        return this.items[this.items.length - 1]
    }

    size() {
        if (this.top === 0) return null
        return this.items.length
    }

    print() {
        if (this.top === 0) console.log('Empty')
        console.log(this.items)
    }
}