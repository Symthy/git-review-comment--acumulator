import { Checkbox, Flex, Pagination, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { CheckableLineBox, CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { useItemsPerPage } from '../item-per-page-selection/useItemPerPage';
import { ItemPerPageSelection } from '../item-per-page-selection';

const useTotalPages = (): [number, (allItemNums: number, itemsPerPage: number) => void] => {
  const [total, setTotal] = useState(0);
  const updateTotalPages = (allItemNums: number, itemsPerPage: number) => {
    if (allItemNums < itemsPerPage) {
      setTotal(1);
    } else {
      setTotal(Math.floor(allItemNums / itemsPerPage) + 1);
    }
  };
  return [total, updateTotalPages];
};

const ScrollAreaWapper = ({ children }: { children: ReactNode }) => (
  <ScrollArea h={window.innerHeight - 135} sx={{ padding: '0.5rem' }}>
    {children}
  </ScrollArea>
);

type CheckableLineBoxesPaginationProps = {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  currentViewItems: ReturnType<typeof useCurrentViewItems>[0];
  initCurrentViewItems: ReturnType<typeof useCurrentViewItems>[1];
  updateCurrentViewItems: ReturnType<typeof useCurrentViewItems>[2];
  children: ReactNode;
};

export const CheckableLineBoxesPagination = ({
  selectedItems,
  setSelectedItems,
  fetchFirstPageData,
  fetchAllPageData,
  currentViewItems,
  initCurrentViewItems,
  updateCurrentViewItems,
  children
}: CheckableLineBoxesPaginationProps) => {
  const [activePage, setActivePage] = useState(1);

  const [totalPages, updateTotalPages] = useTotalPages();
  const [itemsPerPage, setItemsPerPage] = useItemsPerPage(20);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledPagination, setEnabledPagination] = useState(false);
  const allItems = useRef<CheckableLineData[]>([]);

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
      const repos = await fetchAllPageData();
      allItems.current = repos;
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
  }, []);

  useEffect(() => {
    updateCurrentViewItems(allItems.current, itemsPerPage, activePage);
  }, [activePage]);
  const handleChangeItemsPerPage = useCallback(() => {
    if (allItems.current.length === 0) {
      // 初回描画時に allItems の初期化が終わっていない段階でこの関数が呼ばれ
      // CurrentViewItems が Empty に上書きされるため、空なら何もしない
      return;
    }
    const firstPage = 1;
    updateTotalPages(allItems.current.length, itemsPerPage);
    updateCurrentViewItems(allItems.current, itemsPerPage, firstPage);
    setActivePage(firstPage);
  }, [itemsPerPage]);

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
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          enabledPagination={enabledPagination}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
        />
      </Flex>
      <ScrollAreaWapper>
        <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
          {children}
        </Checkbox.Group>
      </ScrollAreaWapper>
      <Pagination
        sx={{
          padding: '0.5rem 0.25rem'
        }}
        total={totalPages}
        position='center'
        value={activePage}
        onChange={setActivePage}
        disabled={!enabledPagination}
      />
    </>
  );
};
