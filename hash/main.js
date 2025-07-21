import { stringToNumber, HashMap } from "./hashmap.js";

// console.log(stringToNumber('banana'))

const hmap = HashMap()

hmap.set('banana', 'yellow')
hmap.set('blueberry', 'blue')
hmap.set('orange', 'orange')
//hmap.set('pear', 'green') // colission with orange
hmap.set('strawberry', 'red')
hmap.set('lemon', 'yellow')
hmap.set('lime', 'green')

// hmap.clear()
console.log(hmap.keys(), hmap.values())
console.log(hmap.entries())
console.log(hmap.remove('something'))
// console.log(hmap.values())
console.log(hmap.seeBuckets())