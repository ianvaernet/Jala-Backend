export default interface AppendableRepository<T> {
  insert(entity: T): T;
}
