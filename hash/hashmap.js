export function stringToNumber(string) {
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
    let buckets = new Array(capacity).fill(null).map(() => []);
    const loadFactor = 0.8;

    const hash = (key) => (stringToNumber(key)) % capacity

    function set(key, value) {
      const index = hash(key);
      const bucket = buckets[index]

      for (let i = 0; i < buckets.length; i++) {
        if (key === bucket[0]) {
            bucket[1] = value
            return
        } else {
            bucket.push([key, value])
            break
        }
      }
      count++

      if (count / capacity > loadFactor) {
        growth()
      }
    }

    function get(key) {
      const index = hash(key)
      const bucket = buckets[index]

      for (const [k, v] of bucket) {
        if (k === key) {
          return v
        }
      }
      return null
    }

    function has(key) {
      const entry = get(key)
      
      return entry? true : false
    }

    function remove(key) {
      const index = hash(key)
      let bucket = buckets[index]

      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          count--;
          return true;
        }
      }
      return false
    }

    const length = () => count

    function clear() {
      for (const bucket of buckets) {
        bucket.splice(0)
      }
      count = 0
    }

    function keys() {
      const result = []
        for (const bucket of buckets) {
          for (const [k, v] of bucket) {
            result.push(k)
          }
        }
        return result
    }

    function values() {
      const result = []
        for (const bucket of buckets) {
          for (const [k, v] of bucket) {
            result.push(v)
          }
        }
        return result
    }

    function entries() {
      const result = []
        for (const bucket of buckets) {
          for (const pair of bucket) {
            result.push(pair)
          }
        }
        return result
    }

    // Helping functions
    function growth() {
      const currentbuckets = buckets
      capacity *= 2
      buckets = new Array(capacity).fill(null).map(() => []);
      count = 0

      for (const bucket of currentbuckets) {
        for (const [key, value] of bucket) {
          set(key, value)
        }
      }
    }

    const seeBuckets = () => buckets

    return { set, get, has, seeBuckets, remove, length, clear, keys, values, entries };
}