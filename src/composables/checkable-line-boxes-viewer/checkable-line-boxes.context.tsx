import { useItemsPerPage } from 'src/components/items-per-page-select-box';
import { useCheckableLineItemsRef } from './hooks/useCheckableLineItemsRef';
import { useCurrentViewItems } from './hooks/useCurrentViewItems';
import { useTotalPages } from './hooks/useTotalPages';
import { createContext, useContext } from 'react';

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

export const CheckableLineBoxesProvider = CheckableLineBoxesContext.Provider;
export const useCheckableLineBoxesContext = () => useContext<ContextValues>(CheckableLineBoxesContext);
