import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/components/checkable-line-boxes-pagination';
import { useCurrentViewItems } from 'src/components/checkable-line-boxes-pagination/hooks/useCurrentViewItems';
import { sortLogic } from '../../functional/sortLogic';
import { CheckableLineBoxesWithPin } from 'src/composables/checkable-line-boxes-with-pin';

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
  return (
    <CheckableLineBoxesPagination
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchFirstPageRepositories}
      fetchAllPageData={fetchAllRepositories}
      currentViewItems={currentViewItems}
      initCurrentViewItems={initCurrentViewItems}
      updateCurrentViewItems={updateCurrentViewItems}
    >
      <CheckableLineBoxesWithPin currentViewItems={currentViewItems} sortLogic={sortLogic} />
    </CheckableLineBoxesPagination>
  );
};
