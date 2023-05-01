import { gql } from 'urql';

export const GET_GITLAB_USER_QUERY = gql`
  query GetGitlabUser($first: Int = 100, $after: String = null) {
    currentUser {
      name
      avatarUrl
      groups(first: $first, after: $after) {
        edges {
          node {
            name
            webUrl
            avatarUrl
          }
        }
      }
    }
  }
`;
