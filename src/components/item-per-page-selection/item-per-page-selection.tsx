import { SegmentedControl, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const defaultItemsPerPageChoices = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  { label: '100', value: '100' }
];

type Props = {
  itemsPerPageChoices?: typeof defaultItemsPerPageChoices;
  itemsPerPage: number;
  setItemsPerPage: (state: string) => void;
  enabledPagination: boolean;
  handleChangeItemsPerPage: () => void;
};

export const ItemPerPageSelection = ({
  itemsPerPageChoices,
  itemsPerPage,
  setItemsPerPage,
  enabledPagination,
  handleChangeItemsPerPage
}: Props) => {
  useEffect(() => handleChangeItemsPerPage(), [itemsPerPage, handleChangeItemsPerPage]);

  return (
    <>
      <SegmentedControl
        value={itemsPerPage.toString()}
        onChange={setItemsPerPage}
        data={itemsPerPageChoices ?? defaultItemsPerPageChoices}
        disabled={!enabledPagination}
      />
      <Text fz='sm'>: Items per Page</Text>
    </>
  );
};
