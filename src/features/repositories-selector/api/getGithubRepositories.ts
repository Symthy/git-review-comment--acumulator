import { gql } from 'urql';

export const GET_GITHUB_REPOSITORIES_QUERY = gql`
  query GetGithubRepositories($first: Int = 100, $after: String = null) {
    viewer {
      url
      avatarUrl
      repositories(first: $first, after: $after) {
        edges {
          node {
            id
            name
            url
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
