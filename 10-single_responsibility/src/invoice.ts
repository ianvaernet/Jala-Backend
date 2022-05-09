import { Book } from './book';

export class Invoice {
  constructor(public book: Book, public quantity: number, public tax: number, public total: number) {}

  calculateTotal() {
    return this.total + this.tax;
  }
}
