import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/composables/checkable-line-boxes-pagination';
import { CheckableLineBoxesWithPin, usePinnedItems } from 'src/composables/checkable-line-boxes-with-pin';
import { useCheckableLineItemsRef } from 'src/composables/checkable-line-boxes-pagination/hooks/useCheckableLineItemsRef';
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
  const itemsRef = useCheckableLineItemsRef();
  const [itemsSorter, dispatch] = useSorterReducer();

  const [pinnedItemNames, getPinState, togglePin] = usePinnedItems();

  const pinnedItemsToTopSorter = (items: CheckableLineData[]): CheckableLineData[] => {
    const sortedPinnedItems = itemsSorter(items.filter((item) => pinnedItemNames.includes(item.value)));
    const sortedNonPinnedItems = itemsSorter(items.filter((item) => !pinnedItemNames.includes(item.value)));
    return [...sortedPinnedItems, ...sortedNonPinnedItems];
  };
  const handleClickPin = () => {
    itemsRef.sort(pinnedItemsToTopSorter);
  };

  return (
    <CheckableLineBoxesPagination
      itemsRef={itemsRef}
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchFirstPageRepositories}
      fetchAllPageData={fetchAllRepositories}
      sorterReducerSet={[pinnedItemsToTopSorter, dispatch]}
      render={(currentViewItems) => (
        <CheckableLineBoxesWithPin
          currentViewItems={currentViewItems}
          handleClickPin={handleClickPin}
          pinnedItemsStateSet={[pinnedItemNames, getPinState, togglePin]}
        />
      )}
    />
  );
};
