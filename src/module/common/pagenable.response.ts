export class PaganableResponse<T> {
  count: number;
  offset: number;
  limit: number;
  items: T[];

  constructor(items: T[], count: number, offset: number, limit: number) {
    this.items = items;
    this.count = count;
    this.limit = limit;
    this.offset = offset;
  }
}
