import { Checkbox, Flex, Group, ScrollArea } from '@mantine/core';
import { CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { ReactNode, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { useItemsPerPage } from '../item-per-page-selection/useItemPerPage';
import { ItemPerPageSelection } from '../item-per-page-selection';
import { Pagination } from '../pagination';
import { useTotalPages } from './hooks/useTotalPages';
import { OrderSelectBox } from '../select-box';
import { useSorterReducer } from '../select-box/hooks/useSorterReducer';
import { useAllItemsAccessor } from './hooks/useAllItemsAccessor';

const defaultSortLogic = (prev: CheckableLineData, next: CheckableLineData) =>
  prev.value.toLocaleLowerCase() < next.value.toLocaleLowerCase() ? -1 : 1;

const ScrollAreaWapper = ({ children }: { children: ReactNode }) => (
  <ScrollArea h={window.innerHeight - 135} sx={{ padding: '0.5rem' }}>
    {children}
  </ScrollArea>
);

type CheckableLineBoxesPaginationProps = {
  allItemsAccessor: ReturnType<typeof useAllItemsAccessor>;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  currentViewItemsStateSet: ReturnType<typeof useCurrentViewItems>;
  sorterReducerSet: ReturnType<typeof useSorterReducer>;
  children: ReactNode;
};

export const CheckableLineBoxesPagination = ({
  allItemsAccessor: [getAllItems, setAllItems],
  selectedItems,
  setSelectedItems,
  fetchFirstPageData,
  fetchAllPageData,
  currentViewItemsStateSet: [currentViewItems, initCurrentViewItems, updateCurrentViewItems],
  sorterReducerSet: [sorter, dispatch],
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
      setAllItems(sorter(items));
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
  }, []);

  const handleSelectOrderBy = useCallback(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    setAllItems(sorter(getAllItems()));
    updateCurrentViewItems(getAllItems(), itemsPerPage, activePage);
  }, [enabledPagination, sorter]);

  const handleSelectActivePage = useCallback(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    updateCurrentViewItems(getAllItems(), itemsPerPage, activePage);
  }, [activePage, enabledPagination]);

  const handleSelectItemsPerPage = useCallback(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    const firstPage = 1;
    updateTotalPages(getAllItems().length, itemsPerPage);
    setActivePage(firstPage);
    updateCurrentViewItems(getAllItems(), itemsPerPage, firstPage);
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
      <Group position='apart' sx={{ margin: '0 1rem' }}>
        <OrderSelectBox handleSelectOrder={handleSelectOrderBy} sorterReducerSet={[sorter, dispatch]}></OrderSelectBox>
        <ItemPerPageSelection
          enabled={enabledPagination}
          handleSelectItemsPerPage={handleSelectItemsPerPage}
          stateSet={[itemsPerPage, setItemsPerPage]}
        />
      </Group>
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
