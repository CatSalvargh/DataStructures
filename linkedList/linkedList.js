const Node = function(val) {
    const value = val 
    let next = null

    return { value, next}
}

export function LinkedList() {
    let head = null
    let length = 0

    function append(val) {
        const newNode = Node(val)

        if (!head) {
            head = newNode
        } else {
            let current = head

            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        length += 1
    }

    function prepend(val) {
        const newNode = Node(val)
        if (!head) {
            append(val)
        } else {
            newNode.next = head
            head = newNode
        }
        length++
    }

    const size = () => length

    function tail() {
        let current = head
        
        while (current.next) {
            current = current.next
        }
        return current
    }

    function at(index) {
        if (index < 0 || index >= length) return null;

        let current = head
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current 

        }

    function pop() {
        if (!head) return null

        if (length === 1) {
            head = null
        }else {
            let current = head
            while (current.next && current.next.next) {
                current = current.next
            } 
            current.next = null
        }
        length--
    }

    function contains(val) {
        if (!head) return null

        let current = head

        while (current) {
            if (current.value == val) {
                return true
            }
            current = current.next
        }
        return false

    }

    function find(val) {
        if (!head) return null

        let current = head

        for(let i = 0; i < length ; i ++) {
            if (current.value === val) {
                return i
            }
            current = current.next
        }
        return  null
    }

    function toString() {
        let current = head
        let string = '';
        while (current) {
            string += `(${current.value}) -> `
            current = current.next
        }
        string += null
        return string
    }

    function insertAt(value, index) {
            if (!head) {
                prepend(value)
            } 
            if (index >= length) {
                append(value);
                return;
            }
            let current = head
            let i = 0
            while (current.next && i < index - 1) {
                    current = current.next
                    i++
            }
            const newNode = Node(value)
            let temp = current.next
            newNode.next = temp
            current.next = newNode
            length++
    }

    function removeAt(index) {
        if (index < 0 || index > length) return null;

        if (index === 0) {
            head = head.next;
        }
        let current = head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next
        }
        current.next = current.next?.next || null
        length--;
    }

    return { get length() {return length}, get head() {return head}, append, prepend, size, tail, at, pop, contains, find, toString, insertAt, removeAt }
}



