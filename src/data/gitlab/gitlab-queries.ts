import gql from 'graphql-tag';

export const GET_GITLAB_PROJECTS = gql`
  query ($groupFullPath: ID!) {
    group(fullPath: $groupFullPath) {
      id
      name
      projects {
        nodes {
          name
          webUrl
        }
      }
    }
  }
`;
