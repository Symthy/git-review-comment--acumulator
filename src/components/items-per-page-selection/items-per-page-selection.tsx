import { Flex, SegmentedControl, Text } from '@mantine/core';
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
  stateSet?: ReturnType<typeof useItemsPerPage>;
};

export const ItemsPerPageSelection = ({
  itemsPerPageChoices,
  enabled,
  stateSet: [itemsPerPage, setItemsPerPage] = useItemsPerPage(20)
}: Props) => {
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
