import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/composables/checkable-line-boxes-pagination';
import { useCurrentViewItems } from 'src/composables/checkable-line-boxes-pagination/hooks/useCurrentViewItems';
import { CheckableLineBoxesWithPin, usePinnedItems } from 'src/composables/checkable-line-boxes-with-pin';
import { useCallback } from 'react';
import { useAllItemsAccessor } from 'src/composables/checkable-line-boxes-pagination/hooks/useAllItemsAccessor';
import { useSorterReducer } from 'src/components/order-select-box';

type Props = {
  selectedRepositories: string[];
  setSelectedRepositories: (items: string[]) => void;
  fetchFirstPageRepositories: (
    itemPerPage: number
  ) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllRepositories: () => Promise<CheckableLineData[]>;
};

export const RepositoryList = ({
  selectedRepositories,
  setSelectedRepositories,
  fetchFirstPageRepositories,
  fetchAllRepositories
}: Props) => {
  const [currentViewItems, initCurrentViewItems, updateCurrentViewItems] = useCurrentViewItems();
  const [getAllItems, setAllItems] = useAllItemsAccessor();
  const [sorter, dispatch] = useSorterReducer();
  const [pinnedItemNames, getPinState, togglePin] = usePinnedItems();

  const pinnedItemsToTopSorter = useCallback(
    (items: CheckableLineData[]): CheckableLineData[] => {
      const sortedPinnedItems = sorter(items.filter((item) => pinnedItemNames.includes(item.value)));
      const sortedNonPinnedItems = sorter(items.filter((item) => !pinnedItemNames.includes(item.value)));
      return [...sortedPinnedItems, ...sortedNonPinnedItems];
    },
    [pinnedItemNames.length, sorter]
  );

  const handleClickPin = () => {
    setAllItems(pinnedItemsToTopSorter(getAllItems()));
  };

  return (
    <CheckableLineBoxesPagination
      allItemsAccessor={[getAllItems, setAllItems]}
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchFirstPageRepositories}
      fetchAllPageData={fetchAllRepositories}
      currentViewItemsStateSet={[currentViewItems, initCurrentViewItems, updateCurrentViewItems]}
      sorterReducerSet={[pinnedItemsToTopSorter, dispatch]}
    >
      <CheckableLineBoxesWithPin
        currentViewItems={currentViewItems}
        handleClickPin={handleClickPin}
        pinnedItemsStateSet={[pinnedItemNames, getPinState, togglePin]}
      />
    </CheckableLineBoxesPagination>
  );
};
