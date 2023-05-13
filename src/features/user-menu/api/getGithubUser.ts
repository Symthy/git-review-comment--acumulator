import gql from 'graphql-tag';

export const GET_GITHUB_USER_QUERY = gql`
  query GetGithubUser {
    viewer {
      login
      url
      avatarUrl
    }
  }
`;
