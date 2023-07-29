import {
  PickedRepository,
  fetchOwnRepositories,
  recursivelyFetchAllGithubOwnRepositories
} from '../../api/getGithubOwnRepositories';
import { CheckableLineData } from 'src/components/checkable-line-box';
import { CheckableLineBoxesPagination } from 'src/components/checkable-line-boxes-pagination';

type Props = {};

export const GithubOwnRepositoryList = ({}: Props) => {
  const fetchRepositoriesForFirstPage = async (
    itemsPerPage: number
  ): Promise<{ items: CheckableLineData[]; totalCount: number } | undefined> => {
    const data = fetchOwnRepositories(itemsPerPage);
    return data.then((d) => {
      if (!d) {
        return undefined;
      }
      return {
        items: d.viewer.repositories.nodes.map((node: PickedRepository) => {
          return {
            key: node.id,
            value: node.name,
            title: node.name,
            subtext: node.description?.toString()
          };
        }),
        totalCount: d.viewer.repositories.totalCount
      };
    });
  };

  const fetchAllRepositories = async (): Promise<CheckableLineData[]> => {
    const repos = await recursivelyFetchAllGithubOwnRepositories();
    return repos.map((repo: PickedRepository) => {
      return {
        key: repo.id,
        value: repo.name,
        title: repo.name,
        subtext: repo.description?.toString()
      };
    });
  };

  return (
    <CheckableLineBoxesPagination
      fetchFirstPageData={fetchRepositoriesForFirstPage}
      fetchAllPageData={fetchAllRepositories}
    />
  );
};
