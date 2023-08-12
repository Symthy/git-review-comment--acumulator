import { useRef } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';

export const useAllItemsAccessor = (): [() => CheckableLineData[], (items: CheckableLineData[]) => void] => {
  const allItems = useRef<CheckableLineData[]>([]);
  const getAllItems = () => allItems.current;
  const setAllItems = (items: CheckableLineData[]) => {
    allItems.current = items;
  };
  return [getAllItems, setAllItems];
};
