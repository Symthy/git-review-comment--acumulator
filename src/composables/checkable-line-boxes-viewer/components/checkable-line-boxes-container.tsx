import { ReactNode, useEffect, useState } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';
import { useSorterReducer } from 'src/components/order-select-box';
import { useCheckableLineItemsRef } from '../hooks/useCheckableLineItemsRef';
import { useCurrentViewItems } from '../hooks/useCurrentViewItems';
import { useItemsPerPage } from 'src/components/items-per-page-select-box';
import { useTotalPages } from '../hooks/useTotalPages';
import { CheckableLineBoxesProvider } from '../checkable-line-boxes.context';
import { ItemsPerPage } from './items-per-page';
import { OrderBy } from './order-by';
import { Group } from './group';
import { PaginationBox } from './pagination-box';
import { Reload } from './reload';

type CheckableLineBoxesContainerProps = {
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
  itemsSorter: ReturnType<typeof useSorterReducer>[0];
  children: ReactNode;
};

export const CheckableLineBoxesContainer = ({
  fetchFirstPageData,
  fetchAllPageData,
  itemsSorter,
  children
}: CheckableLineBoxesContainerProps) => {
  const itemsRef = useCheckableLineItemsRef(itemsSorter);
  const [currentViewItems, initCurrentViewItems, updateCurrentViewItems] = useCurrentViewItems();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, updateTotalPages] = useTotalPages();
  const [itemsPerPage, setItemsPerPage] = useItemsPerPage(20);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledPagination, setEnabledPagination] = useState(false);
  const executeLoadData = () => {
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
      itemsRef.sort();
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
  };

  useEffect(() => {
    executeLoadData();
  }, []);

  return (
    <CheckableLineBoxesProvider
      value={{
        itemsRef,
        currentViewItems,
        updateCurrentViewItems,
        activePage,
        setActivePage,
        totalPages,
        updateTotalPages,
        itemsPerPage,
        setItemsPerPage,
        isLoading,
        setIsLoading,
        enabledPagination,
        executeLoadData
      }}
    >
      {children}
    </CheckableLineBoxesProvider>
  );
};

CheckableLineBoxesContainer.ItemsPerPage = ItemsPerPage;
CheckableLineBoxesContainer.OrderBy = OrderBy;
CheckableLineBoxesContainer.Group = Group;
CheckableLineBoxesContainer.PaginationBox = PaginationBox;
CheckableLineBoxesContainer.Reload = Reload;
