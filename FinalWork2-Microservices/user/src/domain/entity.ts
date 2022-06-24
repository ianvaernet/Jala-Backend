import { UUID } from './uuid';

const isEntity = (value: unknown): boolean => {
  return value instanceof Entity;
};

type PrimitiveTypes<T> = { [key in keyof T]?: unknown };

export interface EntityProps {
  id: UUID;
}

export abstract class Entity<T extends EntityProps> {
  protected readonly props: T;

  constructor(props: T | PrimitiveTypes<T>) {
    this.props = { ...props } as T;
  }

  get id(): UUID {
    return this.props.id;
  }

  equals(entity?: Entity<T>): boolean {
    if (entity == null || entity == undefined || !isEntity(entity)) {
      return false;
    }
    return this.props.id.equals(entity.props.id);
  }
}
