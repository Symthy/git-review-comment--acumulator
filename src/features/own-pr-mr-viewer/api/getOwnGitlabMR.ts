import { gql } from 'urql';

export const GET_OWN_GITLAB_MR_QUERY = gql`
  query GetOwnGitlabMRs($first: Int = 100, $after: String = null) {
    currentUser {
      name
      webUrl
      avatarUrl
      authoredMergeRequests(first: $first, after: $after) {
        edges {
          node {
            id
            title
            webUrl
            project {
              id
              name
              webUrl
            }
            state
            draft
            createdAt
            mergedAt
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
