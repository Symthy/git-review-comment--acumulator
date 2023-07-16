import { gql } from 'urql';

export const GET_GITHUB_ORGANIZATIONS_QUERY = gql`
  query GetGithubOrganizations($first: Int = 100, $after: String = null) {
    viewer {
      url
      avatarUrl
      organizations(first: $first, after: $after) {
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

export const GET_GITHUB_ORGANIZATION_REPOSITORIES_QUERY = gql`
  query GetGithubOrganizationRepositories($first: Int = 100, $after: String = null, $orgName: String) {
    viewer {
      url
      avatarUrl
      organization(login: $orgName) {
        edges {
          node {
            id
            name
            url
            repositories(first: $first, after: $after) {
              edges {
                node {
                  id
                  name
                  url
                }
              }
            }
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
