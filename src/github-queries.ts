import gql from 'graphql-tag';

export const GET_GITHUB_ISSUE = gql`
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
