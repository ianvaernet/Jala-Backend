type FoodType = {
  calories: number;
  tasty: boolean;
};
type SushiType = FoodType & {
  salty: boolean;
};
type CakeType = FoodType & {
  sweet: boolean;
};

interface FoodInterface {
  calories: number;
  tasty: boolean;
}
interface SushiInterface extends FoodInterface {
  salty: boolean;
}
interface CakeInterface extends FoodInterface {
  sweet: boolean;
}
interface SushiAndCake extends SushiType, CakeInterface {}

// TYPES VS INTERFACES
type A = number;
type B = A | string;

interface AA {
  good(x: number): string;
  bad(x: number): string;
}
interface BError extends AA {
  good(x: number | string): string;
  bad(x: string): string; // error
}
interface BB extends AA {
  good(x: number | string): string;
  bad(x: number | string): string;
}

// Declaration merging:
interface I {
  good(x: number): string;
}
interface I {
  bad(x: number): string;
}
