import { LinkedList } from './linkedList.js'

function stringToNumber(string) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < string.length; i++) {
        hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }
    
    return hashCode >>> 0;
}

export function HashMap(initialCapacity = 4) {
    let capacity = initialCapacity
    let count = 0;
    let buckets = new Array(capacity).fill(null).map(() => LinkedList());
    const loadFactor = 0.75;

    const hash = (key) => (stringToNumber(key)) % capacity

    function set(key, value) {
      const index = hash(key);
      const bucket = buckets[index]
      
      if (!key || !value) return null

      if (bucket.contains(key)) {
        bucket.edit(key, value)
      } else {
        bucket.append(key, value)
        count++
      }
      if (count / capacity > loadFactor) {
        growth()
      }
      
    }

    function get(key) {
      const index = hash(key)
      const bucket = buckets[index]

      let current = bucket.head;

      while (current) {
        if (current.entry[0] === key) return current.entry[1];
        current = current.next;
      }
      return null;
    }

    function has(key) {
      const index = hash(key)
      const bucket = buckets[index]
      
      return bucket.contains(key)
    }

    function remove(key) {
      const index = hash(key)
      let bucket = buckets[index]

      for (let i = 0; i <= bucket.length; i++) {
        const keyValue = bucket.keyValues()

        if (keyValue[i][0] === key) {
          bucket.removeAt(i)
          count--;
          return true;
        }
      }
      return false
    }

    const length = () => count

    function clear() {
      buckets = new Array(capacity).fill(null).map(() => LinkedList());
      count = 0
    }


    function getThings(item) {
      const result = []

      for (const bucket of buckets) {

        if (!bucket.head) continue;
        const pairs = bucket.keyValues()

        for (let i = 0; i <= bucket.length; i++) {
          if (item === 'keys') {
            result.push(pairs[i][0])
          } else if (item === 'values') {
            result.push(pairs[i][1])
          } else {
            result.push(pairs[i])
          }
        }
      }
      return result
    }

    function keys() {
      return getThings('keys')
    }

    function values() {
      return getThings('values')
    }

    function entries() {
      return getThings('entries')
    }

    // Helping functions
    function growth() {
      count = 0
      capacity *= 2
      const currentbuckets = buckets
      buckets = new Array(capacity).fill(null).map(() => LinkedList());
      
      for (const bucket of currentbuckets) {
        const list = bucket.keyValues()

        list.forEach((keyValue) => { 
          set(keyValue[0], keyValue[1])
        })
        
      }
    }

    function printHMap() {
      for (let i = 0; i < buckets.length; i++) {
        console.log(`Bucket ${i}: ${buckets[i].toString()}`);
      }
    }

    return { set, get, has, remove, length, clear, keys, values, entries, printHMap };
}