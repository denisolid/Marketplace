import { FilterSection } from './types';

export const FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { label: 'Women', value: 'women' },
      { label: 'Men', value: 'men' }
    ]
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { label: 'FROLOV', value: 'frolov' },
      { label: 'BEVZA', value: 'bevza' },
      { label: 'LAKE Studio', value: 'lake-studio' }
    ]
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { label: 'XS', value: 'xs' },
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' }
    ]
  }
];

export const PRICE_RANGES = [
  { label: 'All Prices', value: '0-0' },
  { label: 'Under $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 - $200', value: '100-200' },
  { label: '$200 - $500', value: '200-500' },
  { label: 'Over $500', value: '500-0' }
];