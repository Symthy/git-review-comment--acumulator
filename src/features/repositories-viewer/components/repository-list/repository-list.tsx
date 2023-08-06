import { ReactNode } from 'react';
import { CheckableLineBox, CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/components/checkable-line-boxes-pagination';
import { useCurrentViewItems } from 'src/components/checkable-line-boxes-pagination/hooks/useCurrentViewItems';
import { TogglePin } from 'src/components/toggle-pin';
import { usePinnedRepos } from '../../hooks/usePinnedRepos';
import { sortLogic } from '../../functional/sortLogic';

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
  const [pinnedRepoNames, getPinState, togglePin] = usePinnedRepos();

  const sortTopPinnedRepos = (repos: CheckableLineData[]): CheckableLineData[] => {
    const pinnedRepos = repos.filter((repo) => pinnedRepoNames.includes(repo.value)).sort(sortLogic);
    const nonPinnedRepos = repos.filter((repo) => !pinnedRepoNames.includes(repo.value)).sort(sortLogic);
    return [...pinnedRepos, ...nonPinnedRepos];
  };
  const [currentViewItems, initCurrentViewItems, updateCurrentViewItems] = useCurrentViewItems(sortTopPinnedRepos);

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
      {currentViewItems.map((item, index) => {
        let marginStyle = { margin: '0.5rem' };
        if (index === 0) {
          marginStyle = { margin: '0.1rem 0.5rem 0.5rem 0.5rem' };
        } else if (index === currentViewItems.length - 1) {
          marginStyle = { margin: '0.5rem 0.5rem 0.1rem 0.5rem' };
        }
        return (
          <CheckableLineBox
            key={item.key}
            value={item.value}
            title={item.title}
            subText={item.subtext}
            style={marginStyle}
            suffixNode={<TogglePin pinned={getPinState(item.value)} togglePin={() => togglePin(item.value)} />}
          />
        );
      })}
    </CheckableLineBoxesPagination>
  );
};
