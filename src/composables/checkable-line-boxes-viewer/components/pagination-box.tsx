import { useEffect } from 'react';
import { useCheckableLineBoxesContext } from '../checkable-line-boxes.context';
import { Pagination } from 'src/components/pagination';

export const PaginationBox = () => {
  const { itemsRef, itemsPerPage, totalPages, activePage, setActivePage, updateCurrentViewItems, enabledPagination } =
    useCheckableLineBoxesContext();

  useEffect(() => {
    if (!enabledPagination) {
      // 初回描画時に 全データ取得が終わっていない状態でこの関数が呼ばれ、空になるため終わるまでは何もしない
      return;
    }
    updateCurrentViewItems(itemsRef.allItems, itemsPerPage, activePage);
  }, [activePage]);

  return (
    <Pagination totalPages={totalPages} enabled={enabledPagination} activePageStateSet={[activePage, setActivePage]} />
  );
};
