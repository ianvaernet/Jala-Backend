class Reservation {
  public to?: Date;
  public destination?: string;

  constructor(public from: Date, to: Date | string, destination?: string) {
    if (to instanceof Date) {
      this.to = to;
      this.destination = destination;
    } else {
      this.destination = to;
    }
  }
}

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};

const reserve: Reserve = (from, to, destination?) => {
  return new Reservation(from, to, destination);
};

console.log(reserve(new Date(), new Date(), 'Argentina'));
console.log(reserve(new Date(), 'Argentina'));
