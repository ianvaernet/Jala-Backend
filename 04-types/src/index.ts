// any: valid for everything, disables the type checking
let a1: any
let b1: any
let c1 = a1 + b1   // c=any
// Enabling “noImplicitAny” in tsconfig will show an error if an any type is not explicitly declared



// unknown: valid for everything but doesn’t disable the type checking
let a2: unknown = 30;
let b2 = a2 + 10; // error: a is unknown
if (typeof a2 === "number") let c2 = a2 + 10; // no problem with this



// boolean
let a3: boolean = true;



// number: int, floats, infinity
let a4: 3.14 = 3.14; //type-literal
let oneMillion = 1_000_000 // equal to 1000000



// bigint: introduced in ES2020.
let a5 = 5n;
const truncated = 5n / 2n  // 2n, not 2.5n

// BigInt value is not strictly equal to a Number value, but it is loosely, so:
0n === 0  // false
0n == 0  //  true

// A Number value and a BigInt value may be compared as usual:
1n < 2  // true



// string:
let a6: string = 'asd';



// symbol: a symbol is equal only to itself. We use them for keys/ids.
let a7 = Symbol('a')
let b7 = Symbol('a')
a7 === b7 // false
let c7: unique symbol = Symbol('c') // Error: a variable whose type is a 'unique symbol' type must be 'const'



// object: it’s a not really useful superclass
const a8: object = {
  b: 'x',
};
a8.b; // Property 'b' does not exist on type 'object'

let obj: {
  b: number;
  c?: string;  //optional property
  [key: number]: boolean;  // dynamic optional properties
};



// arrays: even if its’ allowed, try to keep arrays homogeneous (don’t mix types)
let a9 = [1, 2]
let b9 = ['asd', 'qwe']
let c9 = [1, 'qwe']  // c: (string | number)[]
c9.push(true)  // error
let d9: string[] = ['asd', 2]  // error
type Mix = string | number
let e9: Mix[] = ['asd', 2]

function buildArray() {
  let a = []  // a: any
  a.push(1)
  a.push('a')
  // a.push(true) is allowed here
  return a;
}
let array = buildArray() // array: (number|string)[]
array.push(true)  // error



// Tuples: is an array with fixed number of elements
let a10: [number, number] = [1, 2];
a10 = [4]  // error
a10.push(3)  // doesn't throw error

let b10: [number, number?][] = [[1,2], [3], [4,5]]
let names: [string, ...string[]] = ['Ian']
names = ['Juan', 'Alexis', 'Pedro']
names = []  // error min length is 1



// Null, undefined, void, never:
// - Null: is the absence of a value
// - Undefined: variable that has not been assigned a value yet
// - Void: function that doesn’t have a return statement
// - Never: function that never returns
function a11(){ return null } // null
let m11 = null  // m: any
const n11 = null  // n: null
function b11(){ let i; return i }  // undefined
function c11(){ let n=1 }  // void
function d11(){ throw new Error("Always error") }  // void
function e11(){ while (true){} }  // never



// Enums: by convention, enum names are capitalized and singular. Their keys are also capitalized.
enum Language {
  English,  // 0
  Spanish  // 1
}
Language.English
Language['Spanish']
const enum Language2 {
  Russian = 100
  Chinese  // 101 is inferred
}
Language[0]  // undefined
Language2[0]  // error a const enum can only be accessed using a string literal
// Be sure to configure warnings on non const enums, and in number values.



// Readonly properties: they cannot be reassigned or mutated (const only prohibits the reassignation)
let a12: readonly number[] = [1,2,3]
let b12: ReadonlyArray<number> = [1,2]
a12.push(4)  // error
a12.concat(4)  // this is allowed because it doesn't mutate the original array



// Class constructor shorthand
class Person {
  constructor(
    // public/private is shorthand for this.firstname = firstname
    public firstName: string,
    private lastName: string
  ) {}
}



// Type literal: is a type that represents only one value.
let b13: true = true; // type-literal
b13 = false; // error: false is not assignable to type true



// Type alias: they allow us to change the name of an existing type
type Age = number
type Person2 = {
  name: string,
  age: Age
}

type Color = 'red'
type Color = 'blue'  // error: duplicate identifier Color



// Union and Intersection types
type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }
type CatOrDogOrBoth = Cat | Dog  // UNION: must have all the properties of one or the other (can have all of one and some/all of the other)
type CatAndDog = Cat & Dog  // INTERSECTION: must have all the props of both types

let a: CatOrDogOrBoth = { name: 'asd', wags: true } // error: purrs or barks are missing
let b: CatAndDog = {name: 'asd', purrs: true, barks: true, wags: false}
