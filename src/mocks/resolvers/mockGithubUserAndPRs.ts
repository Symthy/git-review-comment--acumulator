import { graphql } from 'msw';
import { UserAndPRs } from 'src/features/user-menu/api/getGithubUser';
import { GetGithubUserDocument } from 'src/gql/github/graphql';

const mockData: UserAndPRs = {
  login: 'SYM',
  url: 'https://github.com/Symthy',
  avatarUrl: 'https://avatars.githubusercontent.com/u/44676939?u=e02e4ed0dc826cac54ab27823ea8775d6d2fec4a&v=4',
  pullRequests: {
    nodes: [
      { id: '1', title: 'dummy pull request 1' },
      { id: '2', title: 'dummy pull request 2' }
    ]
  }
};

export const mockGithubUserAndPRs = graphql.query(GetGithubUserDocument, (req, res, ctx) => {
  return res(
    ctx.data({
      viewer: mockData
    })
  );
});
