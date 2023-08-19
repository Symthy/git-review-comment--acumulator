import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesViewer } from 'src/composables/checkable-line-boxes-viewer';
import { CheckableLineBoxListWithPin, usePinnedItems } from 'src/composables/checkable-line-box-list-with-pin';
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
  const [itemsSorter, dispatch] = useSorterReducer();
  const [pinnedItemNames, getPinState, togglePin] = usePinnedItems();
  const pinnedItemsToTopSorter = (items: CheckableLineData[]): CheckableLineData[] => {
    const sortedPinnedItems = itemsSorter(items.filter((item) => pinnedItemNames.includes(item.value)));
    const sortedNonPinnedItems = itemsSorter(items.filter((item) => !pinnedItemNames.includes(item.value)));
    return [...sortedPinnedItems, ...sortedNonPinnedItems];
  };

  return (
    <CheckableLineBoxesViewer
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchFirstPageRepositories}
      fetchAllPageData={fetchAllRepositories}
      sorterReducerSet={[pinnedItemsToTopSorter, dispatch]}
      render={(currentViewItems, itemsRef) => (
        <CheckableLineBoxListWithPin
          currentViewItems={currentViewItems}
          itemsRef={itemsRef}
          pinnedItemsStateSet={[pinnedItemNames, getPinState, togglePin]}
        />
      )}
    />
  );
};
