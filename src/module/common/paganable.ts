import { SortType } from './sort-type.enum';

export interface Paganable {
  page?: number;
  count?: number;
  sort?: SortType;
}
