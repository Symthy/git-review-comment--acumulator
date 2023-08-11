import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/components/checkable-line-boxes-pagination';
import { useCurrentViewItems } from 'src/components/checkable-line-boxes-pagination/hooks/useCurrentViewItems';
import { sortLogic } from '../../functional/sortLogic';
import { CheckableLineBoxesWithPin, usePinnedItems } from 'src/composables/checkable-line-boxes-with-pin';
import { useRef } from 'react';

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
  const allItems = useRef<CheckableLineData[]>([]);
  const handleClickPin = (sorter: (items: CheckableLineData[]) => CheckableLineData[]) => {
    allItems.current = sorter(allItems.current);
  };

  const itemsSorter = (items: CheckableLineData[]): CheckableLineData[] => {
    return items.sort(sortLogic);
  };

  return (
    <CheckableLineBoxesPagination
      allItems={allItems}
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchFirstPageRepositories}
      fetchAllPageData={fetchAllRepositories}
      currentViewItems={currentViewItems}
      initCurrentViewItems={initCurrentViewItems}
      updateCurrentViewItems={updateCurrentViewItems}
      itemsSorter={itemsSorter}
    >
      <CheckableLineBoxesWithPin
        currentViewItems={currentViewItems}
        sortLogic={sortLogic}
        handleClickPin={handleClickPin}
      />
    </CheckableLineBoxesPagination>
  );
};
