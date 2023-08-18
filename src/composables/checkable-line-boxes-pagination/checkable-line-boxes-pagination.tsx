import { Checkbox, Group, ScrollArea } from '@mantine/core';
import { CheckableLineData } from '../../components/checkable-line-box/checkable-line-box';
import { ReactNode, useEffect, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { ItemsPerPageSelection, useItemsPerPage } from '../../components/items-per-page-selection';
import { Pagination } from '../../components/pagination';
import { useTotalPages } from './hooks/useTotalPages';
import { OrderSelectBox, useSorterReducer } from '../../components/order-select-box';
import { useCheckableLineItemsRef } from './hooks/useCheckableLineItemsRef';

type CheckableLineBoxesPaginationProps = {
  itemsRef?: ReturnType<typeof useCheckableLineItemsRef>;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  sorterReducerSet?: ReturnType<typeof useSorterReducer>;
  render: (currentViewItems: CheckableLineData[]) => ReactNode;
};

export const CheckableLineBoxesPagination = ({
  itemsRef: itemsRef = useCheckableLineItemsRef(),
  selectedItems,
  setSelectedItems,
  fetchFirstPageData,
  fetchAllPageData,
  sorterReducerSet: [sorter, dispatch] = useSorterReducer(),
  render
}: CheckableLineBoxesPaginationProps) => {
  const [currentViewItems, initCurrentViewItems, updateCurrentViewItems] = useCurrentViewItems();
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
      itemsRef.allItems = items;
      itemsRef.sort(sorter);
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
  }, []);

  const handleSelectOrderBy = () => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    itemsRef.sort(sorter);
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, activePage);
  };

  const handleSelectActivePage = () => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, activePage);
  };

  const handleSelectItemsPerPage = () => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    const firstPage = 1;
    updateTotalPages(itemsRef.allItems.length, itemsPerPage);
    setActivePage(firstPage);
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, firstPage);
  };

  if (isLoading) {
    // Todo
    return <div>Loading...</div>;
  }

  if (currentViewItems == null || currentViewItems.length === 0) {
    // Todo
    return <div>Empty</div>;
  }

  return (
    <>
      <Group position='apart' sx={{ margin: '0 1rem' }}>
        <OrderSelectBox handleSelectOrder={handleSelectOrderBy} sorterReducerSet={[sorter, dispatch]}></OrderSelectBox>
        <ItemsPerPageSelection
          enabled={enabledPagination}
          handleSelectItemsPerPage={handleSelectItemsPerPage}
          stateSet={[itemsPerPage, setItemsPerPage]}
        />
      </Group>
      <ScrollArea h={window.innerHeight - 135} sx={{ padding: '0.5rem' }}>
        <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
          {render(currentViewItems)}
        </Checkbox.Group>
      </ScrollArea>
      <Pagination
        totalPages={totalPages}
        enabled={enabledPagination}
        handleSelectActivePage={handleSelectActivePage}
        activePageStateSet={[activePage, setActivePage]}
      />
    </>
  );
};
