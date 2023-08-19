import { ReactNode, useEffect, useState } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';
import { useSorterReducer } from 'src/components/order-select-box';
import { useCheckableLineItemsRef } from '../hooks/useCheckableLineItemsRef';
import { useCurrentViewItems } from '../hooks/useCurrentViewItems';
import { useItemsPerPage } from 'src/components/items-per-page-selection';
import { useTotalPages } from '../hooks/useTotalPages';
import { CheckableLineBoxesProvider } from '../checkable-line-boxes.context';
import { ItemsPerPage } from './items-per-page';
import { OrderBy } from './order-by';
import { Group } from './group';
import { PaginationBox } from './pagination-box';

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
      itemsRef.sort();
      setEnabledPagination(true);
    };
    initialize();
    fetchAllData();
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
        enabledPagination
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
