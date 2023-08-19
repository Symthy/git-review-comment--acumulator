import { useEffect } from 'react';
import { useCheckableLineBoxesContext } from '../checkable-line-boxes.context';
import { ItemsPerPageSelection } from 'src/components/items-per-page-selection';
import { CheckableLineBoxesContainer } from './checkable-line-boxes-container';

export const ItemsPerPage = () => {
  const {
    itemsRef,
    updateCurrentViewItems,
    setActivePage,
    updateTotalPages,
    itemsPerPage,
    setItemsPerPage,
    enabledPagination
  } = useCheckableLineBoxesContext();

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

  return <ItemsPerPageSelection enabled={enabledPagination} stateSet={[itemsPerPage, setItemsPerPage]} />;
};
