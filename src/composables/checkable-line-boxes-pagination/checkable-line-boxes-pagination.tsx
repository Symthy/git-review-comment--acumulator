import { Checkbox, Group, ScrollArea } from '@mantine/core';
import { CheckableLineData } from '../../components/checkable-line-box/checkable-line-box';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { ItemsPerPageSelection, useItemsPerPage } from '../../components/items-per-page-selection';
import { Pagination } from '../../components/pagination';
import { useTotalPages } from './hooks/useTotalPages';
import { OrderSelectBox, useSortOptions, useSorterReducer } from '../../components/order-select-box';
import { useCheckableLineItemsRef } from './hooks/useCheckableLineItemsRef';

type ContextValues = {
  itemsRef: ReturnType<typeof useCheckableLineItemsRef>;
  currentViewItems: ReturnType<typeof useCurrentViewItems>[0];
  updateCurrentViewItems: ReturnType<typeof useCurrentViewItems>[2];
  activePage: number;
  setActivePage: (page: number) => void;
  totalPages: ReturnType<typeof useTotalPages>[0];
  updateTotalPages: ReturnType<typeof useTotalPages>[1];
  itemsPerPage: ReturnType<typeof useItemsPerPage>[0];
  setItemsPerPage: ReturnType<typeof useItemsPerPage>[1];
  isLoading: boolean;
  enabledPagination: boolean;
};

const CheckableLineBoxesContext = createContext<any>({});

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
    <CheckableLineBoxesContext.Provider
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
    </CheckableLineBoxesContext.Provider>
  );
};

const ItemsPerPage = () => {
  const {
    itemsRef,
    updateCurrentViewItems,
    setActivePage,
    updateTotalPages,
    itemsPerPage,
    setItemsPerPage,
    enabledPagination
  } = useContext<ContextValues>(CheckableLineBoxesContext);

  useEffect(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    const firstPage = 1;
    updateTotalPages(itemsRef.allItems.length, itemsPerPage);
    setActivePage(firstPage);
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, firstPage);
  }, [itemsPerPage]);

  return (
    <ItemsPerPageSelection
      enabled={enabledPagination}
      handleSelectItemsPerPage={() => {}}
      stateSet={[itemsPerPage, setItemsPerPage]}
    />
  );
};

CheckableLineBoxesContainer.ItemsPerPage = ItemsPerPage;

const OrderBy = ({ dispatchSortOptions }: { dispatchSortOptions: ReturnType<typeof useSorterReducer>[1] }) => {
  const { itemsRef, updateCurrentViewItems, activePage, itemsPerPage, enabledPagination } =
    useContext<ContextValues>(CheckableLineBoxesContext);
  const [sortOptions, setSortOptions] = useSortOptions();

  useEffect(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    itemsRef.sort();
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, activePage);
  }, [sortOptions.order, sortOptions.direction]);

  return (
    <OrderSelectBox
      handleSelectOrder={() => {}}
      dispatchSortOptions={dispatchSortOptions}
      sortOptionsStateSet={[sortOptions, setSortOptions]}
    ></OrderSelectBox>
  );
};

CheckableLineBoxesContainer.OrderBy = OrderBy;

const BoxGroup = ({
  selectedItems,
  setSelectedItems,
  render
}: {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  render: (currentViewItems: CheckableLineData[], itemsRef: ReturnType<typeof useCheckableLineItemsRef>) => ReactNode;
}) => {
  const { itemsRef, currentViewItems } = useContext<ContextValues>(CheckableLineBoxesContext);
  return (
    <ScrollArea h={window.innerHeight - 180} sx={{ padding: '0.5rem' }}>
      <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
        {render(currentViewItems, itemsRef)}
      </Checkbox.Group>
    </ScrollArea>
  );
};

CheckableLineBoxesContainer.BoxGroup = BoxGroup;

const PaginationBox = () => {
  const { itemsRef, itemsPerPage, totalPages, activePage, setActivePage, updateCurrentViewItems, enabledPagination } =
    useContext<any>(CheckableLineBoxesContext);

  useEffect(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, activePage);
  }, [activePage]);

  return (
    <Pagination
      totalPages={totalPages}
      enabled={enabledPagination}
      handleSelectActivePage={() => {}}
      activePageStateSet={[activePage, setActivePage]}
    />
  );
};

CheckableLineBoxesContainer.PaginationBox = PaginationBox;

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
        <CheckableLineBoxesContainer.ItemsPerPage />
      </Group>
      <CheckableLineBoxesContainer.BoxGroup
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        render={render}
      />
      <CheckableLineBoxesContainer.PaginationBox />
    </CheckableLineBoxesContainer>
  );
};
