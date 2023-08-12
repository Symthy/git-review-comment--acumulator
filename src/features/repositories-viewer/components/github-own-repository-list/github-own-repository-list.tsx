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

const convertGithubRepositoryToCheckableLineData = (node: PickedRepository): CheckableLineData => {
  return {
    key: node.id,
    value: node.name,
    title: node.name,
    subtext: node.description?.toString(),
    createdAt: new Date(Date.parse(node.createdAt)),
    updatedAt: new Date(Date.parse(node.updatedAt))
  };
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
            return convertGithubRepositoryToCheckableLineData(node);
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
        return convertGithubRepositoryToCheckableLineData(repo);
      })
      .sort(sortLogic);
  };

  return (
    <RepositoryList
      selectedRepositories={selectedRepositories}
      setSelectedRepositories={setSelectedRepositories}
      fetchFirstPageRepositories={fetchFirstPageRepositories}
      fetchAllRepositories={fetchAllRepositories}
    />
  );
};
