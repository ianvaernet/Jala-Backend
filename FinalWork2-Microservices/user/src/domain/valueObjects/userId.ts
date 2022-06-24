import { UUID } from '../uuid';

export class UserId extends UUID {
  constructor(value: string) {
    super(value, 'id');
  }
}
