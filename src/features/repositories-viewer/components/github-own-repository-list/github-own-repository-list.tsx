import {
  PickedRepository,
  fetchOwnRepositories,
  recursivelyFetchAllGithubOwnRepositories
} from '../../api/getGithubOwnRepositories';
import { CheckableLineData } from 'src/components/checkable-line-box';
import { RepositoryList } from '../repository-list';
import { sortLogic } from '../../functional/sortLogic';

type Props = {
  selectedRepositories: string[];
  setSelectedRepositories: (repos: string[]) => void;
};

export const GithubOwnRepositoryList = ({ selectedRepositories, setSelectedRepositories }: Props) => {
  const sortRepos = (items: CheckableLineData[]) => items.sort(sortLogic);

  const fetchFirstPageRepositories = async (
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
    <RepositoryList
      selectedRepositories={selectedRepositories}
      setSelectedRepositories={function (items: string[]): void {
        throw new Error('Function not implemented.');
      }}
      fetchFirstPageRepositories={fetchFirstPageRepositories}
      fetchAllRepositories={fetchAllRepositories}
    />
  );
};
