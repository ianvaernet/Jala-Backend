import { Entity, EntityProps } from './entity';

export class AggregateRoot<T extends EntityProps> extends Entity<T> {}
