import { Flex, SegmentedControl, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useItemsPerPage } from './hooks/useItemsPerPage';

const defaultItemsPerPageChoices = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  { label: '100', value: '100' }
];

type Props = {
  itemsPerPageChoices?: typeof defaultItemsPerPageChoices;
  enabled: boolean;
  handleSelectItemsPerPage: () => void;
  stateSet?: ReturnType<typeof useItemsPerPage>;
};

export const ItemsPerPageSelection = ({
  itemsPerPageChoices,
  enabled,
  handleSelectItemsPerPage: handleChangeItemsPerPage,
  stateSet: [itemsPerPage, setItemsPerPage] = useItemsPerPage(20)
}: Props) => {
  useEffect(() => handleChangeItemsPerPage(), [itemsPerPage]);

  return (
    <Flex align='center' sx={{ '&>*': { margin: '0 0.2rem' } }}>
      <SegmentedControl
        value={itemsPerPage.toString()}
        onChange={setItemsPerPage}
        data={itemsPerPageChoices ?? defaultItemsPerPageChoices}
        disabled={!enabled}
      />
      <Text fz='sm'>: Items per Page</Text>
    </Flex>
  );
};
