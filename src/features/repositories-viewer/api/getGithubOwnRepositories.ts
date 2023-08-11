import { githubClient } from 'src/api/client';
import { PageInfo, Repository, RepositoryConnection, User } from 'src/gql/github/graphql';
import { useGithubQuery } from 'src/hooks/useGitQuery';
import { gql } from 'urql';

const GET_GITHUB_OWN_REPOSITORIES_QUERY = gql`
  query GetGithubOwnRepositories($first: Int = 100, $after: String = null) {
    viewer {
      url
      avatarUrl
      repositories(first: $first, after: $after, orderBy: { field: NAME, direction: ASC }, ownerAffiliations: [OWNER]) {
        nodes {
          id
          name
          url
          description
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`;

type GithubOwnRepositories = Pick<User, 'login' | 'url' | 'avatarUrl' | 'repositories'> & {
  repositories: PickedRepositoryConnection;
};
export type PickedRepository = Pick<Repository, 'id' | 'name' | 'url' | 'description'>;
type PickedPageInfo = Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>;
type PickedRepositoryConnection = {
  nodes: PickedRepository[];
  pageInfo: PickedPageInfo;
} & Pick<RepositoryConnection, 'totalCount'>;

export const fetchOwnRepositories = async (first: number, cursor?: string) => {
  const result = githubClient.query<{ viewer: GithubOwnRepositories }>(
    GET_GITHUB_OWN_REPOSITORIES_QUERY,
    cursor
      ? {
          first: first,
          after: cursor
        }
      : { first: first }
  );
  return (await result.toPromise()).data;
};

export const useGetGithubOwnRepositories = (cursor?: string) =>
  useGithubQuery<{ viewer: GithubOwnRepositories }>({
    query: GET_GITHUB_OWN_REPOSITORIES_QUERY,
    variables: cursor
      ? {
          after: cursor
        }
      : {}
  });

export const recursivelyFetchAllGithubOwnRepositories = async (currentCursor?: string): Promise<PickedRepository[]> => {
  const data = await fetchOwnRepositories(100, currentCursor);
  if (!data) {
    return [];
  }

  const currentRepos = data.viewer.repositories.nodes;
  if (!data.viewer.repositories.pageInfo.hasNextPage) {
    return currentRepos;
  }

  const nextCursor = data.viewer.repositories.pageInfo.endCursor;
  if (nextCursor) {
    const newRepos = await recursivelyFetchAllGithubOwnRepositories(nextCursor);
    return [...currentRepos, ...newRepos];
  }

  return currentRepos;
};
