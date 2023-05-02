import { gql } from 'urql';

export const GET_OWN_GITHUB_PR_QUERY = gql`
  query GetOwnGithubPR($first: Int = 100, $after: String = null) {
    viewer {
      name
      url
      avatarUrl
      pullRequests(first: 100, $after) {
        edges {
          node {
            id
            number
            title
            url
            author {
              login
              url
              avatarUrl
            }
            repository {
              id
              name
              url
            }
            state
            isDraft
            createdAt
            mergedAt
          }
          cursor
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
