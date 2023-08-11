import { useState } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box/checkable-line-box';

export const useCurrentViewItems = (): [
  CheckableLineData[],
  (items: CheckableLineData[]) => void,
  (allItems: CheckableLineData[], itemsPerPage: number, activePage: number) => void
] => {
  const [currentViewItems, setCurrentViewItems] = useState<CheckableLineData[]>([]);
  const initCurrentViewItems = (items: CheckableLineData[]) => {
    if (currentViewItems.length === 0) {
      setCurrentViewItems(items);
    }
  };
  const updateCurrentViewItems = (allItems: CheckableLineData[], itemsPerPage: number, activePage: number) => {
    if (allItems.length < itemsPerPage) {
      setCurrentViewItems(allItems);
      return;
    }
    const firstPostIndex = (activePage - 1) * itemsPerPage;
    const lastPostIndex = firstPostIndex + itemsPerPage;
    setCurrentViewItems(allItems.slice(firstPostIndex, lastPostIndex));
  };
  return [currentViewItems, initCurrentViewItems, updateCurrentViewItems];
};
