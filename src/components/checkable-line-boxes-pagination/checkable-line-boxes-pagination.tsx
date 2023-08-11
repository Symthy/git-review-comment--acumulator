import { Checkbox, Flex, ScrollArea } from '@mantine/core';
import { CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { useItemsPerPage } from '../item-per-page-selection/useItemPerPage';
import { ItemPerPageSelection } from '../item-per-page-selection';
import { Pagination } from '../pagination';
import { useTotalPages } from './hooks/useTotalPages';

const ScrollAreaWapper = ({ children }: { children: ReactNode }) => (
  <ScrollArea h={window.innerHeight - 135} sx={{ padding: '0.5rem' }}>
    {children}
  </ScrollArea>
);

type CheckableLineBoxesPaginationProps = {
  allItems: any;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  currentViewItems: ReturnType<typeof useCurrentViewItems>[0];
  initCurrentViewItems: ReturnType<typeof useCurrentViewItems>[1];
  updateCurrentViewItems: ReturnType<typeof useCurrentViewItems>[2];
  itemsSorter: (items: CheckableLineData[]) => CheckableLineData[];
  children: ReactNode;
};

export const CheckableLineBoxesPagination = ({
  allItems,
  selectedItems,
  setSelectedItems,
  fetchFirstPageData,
  fetchAllPageData,
  currentViewItems,
  initCurrentViewItems,
  updateCurrentViewItems,
  itemsSorter,
  children
}: CheckableLineBoxesPaginationProps) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, updateTotalPages] = useTotalPages();
  const [itemsPerPage, setItemsPerPage] = useItemsPerPage(20);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledPagination, setEnabledPagination] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchFirstPageData(itemsPerPage);
      if (data) {
        initCurrentViewItems(data.items);
        updateTotalPages(data.totalCount, itemsPerPage);
      }
      setIsLoading(false);
    };
    const fetchAllData = async () => {
      const items = await fetchAllPageData();
      allItems.current = itemsSorter(items);
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
  }, []);

  const handleSelectActivePage = useCallback(() => {
    if (!enabledPagination) {
      // 初回描画時に allItems の初期化が終わっていない段階でこの関数が呼ばれ
      // CurrentViewItems が Empty に上書きされるため、空なら何もしない
      return;
    }
    updateCurrentViewItems(allItems.current, itemsPerPage, activePage);
  }, [activePage, enabledPagination]);

  const handleSelectItemsPerPage = useCallback(() => {
    if (!enabledPagination) {
      // 初回描画時に allItems の初期化が終わっていない段階でこの関数が呼ばれ
      // CurrentViewItems が Empty に上書きされるため、空なら何もしない
      return;
    }
    const firstPage = 1;
    updateTotalPages(allItems.current.length, itemsPerPage);
    updateCurrentViewItems(allItems.current, itemsPerPage, firstPage);
    setActivePage(firstPage);
  }, [itemsPerPage, enabledPagination]);

  if (isLoading) {
    // Todo
    return (
      <ScrollAreaWapper>
        <div>Loading...</div>
      </ScrollAreaWapper>
    );
  }

  if (currentViewItems == null || currentViewItems.length === 0) {
    // Todo
    return (
      <ScrollAreaWapper>
        <div>Empty</div>
      </ScrollAreaWapper>
    );
  }

  return (
    <>
      <Flex justify='flex-end' align='center' direction='row' sx={{ marginRight: '1rem' }}>
        <ItemPerPageSelection
          enabled={enabledPagination}
          handleSelectItemsPerPage={handleSelectItemsPerPage}
          stateSet={[itemsPerPage, setItemsPerPage]}
        />
      </Flex>
      <ScrollAreaWapper>
        <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
          {children}
        </Checkbox.Group>
      </ScrollAreaWapper>
      <Pagination
        totalPages={totalPages}
        enabled={enabledPagination}
        handleSelectActivePage={handleSelectActivePage}
        stateSet={[activePage, setActivePage]}
      />
    </>
  );
};
