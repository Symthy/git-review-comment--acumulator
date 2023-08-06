import { useState } from 'react';
import {
  PickedRepository,
  fetchOwnRepositories,
  recursivelyFetchAllGithubOwnRepositories
} from '../../api/getGithubOwnRepositories';
import { CheckableLineBox, CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/components/checkable-line-boxes-pagination';
import { useCurrentViewItems } from 'src/components/checkable-line-boxes-pagination/hooks/useCurrentViewItems';
import { TogglePin } from 'src/components/toggle-pin';

const usePinnedRepos = (): [string[], (repoName: string) => boolean, (repoName: string) => void] => {
  const [repoNameToPinStates, setRepoNameToPinStates] = useState(new Map<string, boolean>());
  const newRepoNameToPinStates = new Map(repoNameToPinStates);
  const getPinState = (repoName: string): boolean => {
    const isPinned: boolean | undefined = repoNameToPinStates.get(repoName);
    if (isPinned == null) {
      return false;
    }
    return isPinned;
  };
  const togglePin = (repoName: string): void => {
    const isPinned: boolean | undefined = repoNameToPinStates.get(repoName);
    if (isPinned == null) {
      newRepoNameToPinStates.set(repoName, true);
    } else {
      newRepoNameToPinStates.set(repoName, !isPinned);
    }
    setRepoNameToPinStates(newRepoNameToPinStates);
  };
  const pinnedRepos = Array.from(repoNameToPinStates)
    .filter(([k, v]) => v)
    .map(([k, v]) => k);
  return [pinnedRepos, getPinState, togglePin];
};

type Props = {
  selectedRepositories: string[];
  setSelectedRepositories: (repos: string[]) => void;
};

export const GithubOwnRepositoryList = ({ selectedRepositories, setSelectedRepositories }: Props) => {
  const [pinnedRepoNames, getPinState, togglePin] = usePinnedRepos();
  const sortLogic = (a: CheckableLineData, b: CheckableLineData): number => {
    return a.value.toLocaleLowerCase() < b.value.toLocaleLowerCase() ? -1 : 1;
  };
  const sortRepos = (items: CheckableLineData[]) => items.sort(sortLogic);
  const sortTopPinnedRepos = (repos: CheckableLineData[]): CheckableLineData[] => {
    const pinnedRepos = repos.filter((repo) => pinnedRepoNames.includes(repo.value)).sort(sortLogic);
    const nonPinnedRepos = repos.filter((repo) => !pinnedRepoNames.includes(repo.value)).sort(sortLogic);
    return [...pinnedRepos, ...nonPinnedRepos];
  };
  const [currentViewItems, initCurrentViewItems, updateCurrentViewItems] = useCurrentViewItems(sortTopPinnedRepos);

  const fetchRepositoriesForFirstPage = async (
    itemsPerPage: number
  ): Promise<{ items: CheckableLineData[]; totalCount: number } | undefined> => {
    const data = fetchOwnRepositories(itemsPerPage);
    return data.then((d) => {
      if (!d) {
        return undefined;
      }
      return {
        items: sortRepos(
          d.viewer.repositories.nodes.map((node: PickedRepository) => {
            return {
              key: node.id,
              value: node.name,
              title: node.name,
              subtext: node.description?.toString()
            };
          })
        ),
        totalCount: d.viewer.repositories.totalCount
      };
    });
  };

  const fetchAllRepositories = async (): Promise<CheckableLineData[]> => {
    const repos = await recursivelyFetchAllGithubOwnRepositories();
    return repos
      .map((repo: PickedRepository) => {
        return {
          key: repo.id,
          value: repo.name,
          title: repo.name,
          subtext: repo.description?.toString()
        };
      })
      .sort(sortLogic);
  };

  return (
    <CheckableLineBoxesPagination
      selectedItems={selectedRepositories}
      setSelectedItems={setSelectedRepositories}
      fetchFirstPageData={fetchRepositoriesForFirstPage}
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
