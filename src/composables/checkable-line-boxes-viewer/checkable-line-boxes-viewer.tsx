import { Group } from '@mantine/core';
import { CheckableLineData } from '../../components/checkable-line-box/checkable-line-box';
import { ReactNode } from 'react';
import { useSorterReducer } from '../../components/order-select-box';
import { useCheckableLineItemsRef } from './hooks/useCheckableLineItemsRef';
import { CheckableLineBoxesContainer } from './components/checkable-line-boxes-container';

type CheckableLineBoxesViewerProps = {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  sorterReducerSet?: ReturnType<typeof useSorterReducer>;
  render: (currentViewItems: CheckableLineData[], itemsRef: ReturnType<typeof useCheckableLineItemsRef>) => ReactNode;
};

export const CheckableLineBoxesViewer = ({
  selectedItems,
  setSelectedItems,
  fetchFirstPageData,
  fetchAllPageData,
  sorterReducerSet: [itemsSorter, dispatchSortOptions] = useSorterReducer(),
  render
}: CheckableLineBoxesViewerProps) => {
  return (
    <CheckableLineBoxesContainer
      fetchFirstPageData={fetchFirstPageData}
      fetchAllPageData={fetchAllPageData}
      itemsSorter={itemsSorter}
    >
      <Group position='apart' sx={{ margin: '0 1rem' }}>
        <CheckableLineBoxesContainer.OrderBy dispatchSortOptions={dispatchSortOptions} />
        <CheckableLineBoxesContainer.Reload />
        <CheckableLineBoxesContainer.ItemsPerPage />
      </Group>
      <CheckableLineBoxesContainer.Group
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        render={render}
      />
      <CheckableLineBoxesContainer.PaginationBox />
    </CheckableLineBoxesContainer>
  );
};
