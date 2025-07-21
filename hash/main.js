import { stringToNumber, HashMap } from "./hashmap.js";
import { LinkedList } from "./linkedList.js";


const hmap = HashMap()

hmap.set('banana', 'yellow')
hmap.set('blueberry', 'blue')
hmap.set('lime', 'green')
hmap.set('orange', 'orange')
hmap.set('pear', 'green') 


hmap.set('pear', 'a crazy value I just made up') 

console.log(hmap.get('orange'))
console.log(hmap.values())

hmap.printHMap()
// colissions pear orange, banana lime
// return { set, get, has, seeBuckets, remove, length, clear, keys, values, entries, printHMap };