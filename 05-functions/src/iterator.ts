const numbers = {
  *[Symbol.iterator]() {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
  },
};

for (const n of numbers) {
  console.log(n);
}

const allNumbers = [...numbers];
console.log(allNumbers);
