import AppendableRepository from './appendableRepository';

export default interface CRUDRepository<T> extends AppendableRepository<T> {
  update(id: number, entity: T): T;
  get(id: number): T;
  delete(id: number): void;
}
