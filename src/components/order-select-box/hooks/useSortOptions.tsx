import { useState } from 'react';
import { Directions, Orders } from '../types';

type SortOptions = { order: Orders; direction: Directions };

export const useSortOptions = (): [SortOptions, (options: SortOptions) => void] => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    order: 'NAME',
    direction: 'ASC'
  });
  return [sortOptions, setSortOptions];
};
