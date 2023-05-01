import gql from 'graphql-tag';

export const GET_GITHUB_USER_QUERY = gql`
query GetGithubUser($first: Int = 100, $after: String = null) { 
  viewer { 
    login
    url
    avatarUrl
    organizations(first: $first, $after: $after) {
      edges {
        node {
          name
          url
          avatarUrl
        }
      }
    }
  }
}
`;
