import { gql } from 'urql';

export const GET_GITHUB_OWN_REPOSITORIES_QUERY = gql`
  query GetGithubOwnRepositories($first: Int = 100, $after: String = null) {
    viewer {
      url
      avatarUrl
      repositories(first: $first, after: $after, ownerAffiliations: [OWNER]) {
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
