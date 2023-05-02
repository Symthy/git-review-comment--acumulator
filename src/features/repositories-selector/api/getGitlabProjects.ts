import { gql } from 'urql';

export const GET_GITHUB_REPOSITORIES_QUERY = gql`
  query GetGitlabProjects($groupName: String, $first: Int = 100, $after: String = null) {
    currentUser {
      groups(search: $groupName) {
        edges {
          node {
            projects(first: $first) {
              edges {
                node {
                  id
                  name
                  webUrl
                  avatarUrl
                  description
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
      }
    }
  }
`;
