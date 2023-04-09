import gql from 'graphql-tag';

export const GET_GITHUB_ISSUES = gql`
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_GITHUB_REPOSITORIES = gql`
  query GetGithubRepositories($owner: String!) {
    user(login: $owner) {
      repositories(last: 10) {
        nodes {
          name
          url
        }
      }
    }
  }
`;

export const GET_GITHUB_ORGANIZATION_REPOSITORIES = gql`
  query ($owner: String!, $organizationName: String!) {
    user(login: $owner) {
      organization(login: $organizationName) {
        repositories(first: 10) {
          nodes {
            name
            url
          }
        }
      }
    }
  }
`;
