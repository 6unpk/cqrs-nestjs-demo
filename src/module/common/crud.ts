export abstract class CRUD<T> {
  abstract read(): Promise<T>;
  abstract readListOf(): Promise<T[]>;
  abstract create(): Promise<T>;
  abstract update(): Promise<T>;
  abstract delete(): Promise<T>;
}
