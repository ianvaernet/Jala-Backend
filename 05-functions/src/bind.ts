function pow(exponent: number, base: number) {
  return base ** exponent;
}

const square = pow.bind(null, 2);
const cube = pow.bind(null, 3);

console.log(square(3));
console.log(square(4));
console.log(cube(3));
console.log(cube(4));

// ------------------------------------------------------------

enum LogType {
  Log = 'log',
  Warn = 'warn',
  Error = 'error',
}

function log(type: LogType, message: string) {
  if (type === LogType.Error) console.error(`${message}: `, this);
  else if (type === LogType.Warn) console.warn(`${message}: `, this);
  else console.log(`${message}: `, this);
}

class Person {
  constructor(private age: number, private name?: string) {}

  greet() {
    if (this.name) console.log(`Hello ${this.name}`);
    else log.bind(this, LogType.Error, 'Name is missing')();
  }
}

const person1 = new Person(24);
person1.greet();
