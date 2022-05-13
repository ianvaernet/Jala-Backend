import CRUDRepository from './CRUDRepository';
import User from './user';

export default class UserRepository implements CRUDRepository<User> {
  insert(entity: User): User {
    console.log('insert ok');
    return new User();
  }
  update(id: number, entity: User): User {
    console.log('update ok');
    return new User();
  }
  get(id: number): User {
    console.log('get ok');
    return new User();
  }
  delete(id: number): void {
    console.log('delete ok');
  }
}
