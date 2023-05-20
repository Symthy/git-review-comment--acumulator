import gql from 'graphql-tag';
import { Maybe, PullRequest, User } from 'src/gql/github/graphql';

export const GET_GITHUB_USER_QUERY = gql`
  query GetGithubUser {
    viewer {
      login
      url
      avatarUrl
      pullRequests(first: 100, states: OPEN, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

export type UserAndPRs = Pick<User, 'login' | 'url' | 'avatarUrl'> & {
  pullRequests: PickedPullRequestConnection;
};
type PickedPullRequest = Pick<PullRequest, 'id' | 'title'>;
type PickedPullRequestConnection = {
  nodes: PickedPullRequest[];
};
