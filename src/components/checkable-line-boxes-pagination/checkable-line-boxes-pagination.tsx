import { Checkbox, Flex, Pagination, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { CheckableLineBox, CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';

const useItemsPerPage = (initialState: number | (() => number)): [number, (state: string) => void] => {
  const [itemsPerPage, setItemsPerPageNum] = useState<number>(initialState);
  const setItemsPerPage = (prevState: string) => {
    setItemsPerPageNum(Number(prevState));
  };
  return [itemsPerPage, setItemsPerPage];
};

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

const itemsPerPageList = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  { label: '100', value: '100' }
];

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
  useEffect(() => {
    updateTotalPages(allItems.current.length, itemsPerPage);
    updateCurrentViewItems(allItems.current, itemsPerPage, activePage);
    setActivePage(1);
  }, [itemsPerPage]);

  if (isLoading) {
    // Todo
    return (
      <ScrollAreaWapper>
        <div>Loading...</div>
      </ScrollAreaWapper>
    );
  }

  if (currentViewItems == null || currentViewItems.length == 0) {
    // Todo
    return (
      <ScrollAreaWapper>
        <div>Empty</div>
      </ScrollAreaWapper>
    );
  }

  return (
    <>
      <Flex justify='flex-end' align='center' direction='row'>
        <SegmentedControl
          value={itemsPerPage.toString()}
          onChange={setItemsPerPage}
          data={itemsPerPageList}
          disabled={!enabledPagination}
        />
        <Text fz='sm' sx={{ marginRight: '1rem' }}>
          : Items per Page
        </Text>
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
