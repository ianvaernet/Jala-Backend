function* genFibonacci() {
  let number1 = 0;
  let number2 = 1;
  let previosNumber1;
  while (true) {
    yield number1;
    previosNumber1 = number1;
    number1 = number2;
    number2 = previosNumber1 + number2;
  }
}
const fibonacci = genFibonacci();

console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
console.log(fibonacci.next().value);
