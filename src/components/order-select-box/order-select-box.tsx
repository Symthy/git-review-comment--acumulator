import { Text, Flex, NativeSelect, SegmentedControl } from '@mantine/core';
import { Directions, Orders, Sorter } from './types';
import { useSorterReducer } from './hooks/useSorterReducer';

import { useSortOptions } from './hooks/useSortOptions';

const defaultOrderByValues = [
  { label: 'name', value: 'NAME' },
  { label: 'created time', value: 'CREATED_AT' },
  { label: 'updated time', value: 'UPDATED_AT' }
];

const defaultDirectionValues = [
  { label: 'Asc', value: 'ASC' },
  { label: 'Desc', value: 'DESC' }
];

type Props = {
  enabled: boolean;
  sortOptionsStateSet?: ReturnType<typeof useSortOptions>;
  dispatchSortOptions?: ReturnType<typeof useSorterReducer>[1];
};

export const OrderSelectBox = ({
  enabled,
  sortOptionsStateSet: [sortOptions, setSortOptions] = useSortOptions(),
  dispatchSortOptions = useSorterReducer()[1]
}: Props) => {
  return (
    <>
      <Flex align='center' sx={{ '&>*': { margin: '0 0.25rem' } }}>
        <Text size='sm'>order by:</Text>
        <NativeSelect
          disabled={!enabled}
          value={sortOptions.order}
          onChange={(event) => {
            const value = event.currentTarget.value as Orders;
            const newSortOptions = { ...sortOptions, order: value };
            setSortOptions(newSortOptions);
            dispatchSortOptions(newSortOptions);
          }}
          data={defaultOrderByValues}
        />
        <SegmentedControl
          disabled={!enabled}
          value={sortOptions.direction}
          onChange={(value: Directions) => {
            const newSortOptions = { ...sortOptions, direction: value };
            setSortOptions(newSortOptions);
            dispatchSortOptions(newSortOptions);
          }}
          data={defaultDirectionValues}
        />
      </Flex>
    </>
  );
};
