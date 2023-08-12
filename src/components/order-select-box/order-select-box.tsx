import { Text, Flex, NativeSelect, SegmentedControl } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Directions, Orders, Sorter } from './types';
import { useSorterReducer } from './hooks/useSorterReducer';

type Props = {
  handleSelectOrder: (itemsSorter: Sorter) => void;
  sorterReducerSet?: ReturnType<typeof useSorterReducer>;
};

export const OrderSelectBox = ({
  handleSelectOrder,
  sorterReducerSet: [sorter, dispatch] = useSorterReducer()
}: Props) => {
  const [order, setOrder] = useState<string>('NAME');
  const [direction, setDirection] = useState<string>('ASC');

  useEffect(() => {
    handleSelectOrder(sorter);
  }, [order, direction]);

  return (
    <>
      <Flex align='center' sx={{ '&>*': { margin: '0 0.25rem' } }}>
        <Text size='sm'>order by:</Text>
        <NativeSelect
          value={order}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setOrder(value);
            dispatch({ order: value as Orders, direction: direction as Directions });
          }}
          data={[
            { value: 'NAME', label: 'name' },
            { value: 'CREATED_AT', label: 'created time' },
            { value: 'UPDATED_AT', label: 'updated time' }
          ]}
        />
        <SegmentedControl
          value={direction}
          onChange={(value: string) => {
            setDirection(value);
            dispatch({ order: order as Orders, direction: value as Directions });
          }}
          data={[
            { label: 'Asc', value: 'ASC' },
            { label: 'Desc', value: 'DESC' }
          ]}
        />
      </Flex>
    </>
  );
};
