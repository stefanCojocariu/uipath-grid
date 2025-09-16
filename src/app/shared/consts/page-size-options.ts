import { PageSizeOption } from '../models/page-size-option.model';

export const getPageSizeOptions: () => PageSizeOption[] = () => [
  {
    value: null,
    name: 'Show all results',
  },
  {
    value: 5,
    name: 'Show 5 results',
  },
  {
    value: 10,
    name: 'Show 10 results',
  },
  {
    value: 20,
    name: 'Show 20 results',
  },
];
