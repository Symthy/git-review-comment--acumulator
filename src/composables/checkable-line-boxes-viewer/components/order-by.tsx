import { useEffect } from 'react';
import { OrderSelectBox, useSortOptions, useSorterReducer } from 'src/components/order-select-box';
import { useCheckableLineBoxesContext } from '../checkable-line-boxes.context';

export const OrderBy = ({ dispatchSortOptions }: { dispatchSortOptions: ReturnType<typeof useSorterReducer>[1] }) => {
  const { itemsRef, updateCurrentViewItems, activePage, itemsPerPage, enabledPagination } =
    useCheckableLineBoxesContext();
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
      enabled={enabledPagination}
      dispatchSortOptions={dispatchSortOptions}
      sortOptionsStateSet={[sortOptions, setSortOptions]}
    ></OrderSelectBox>
  );
};
