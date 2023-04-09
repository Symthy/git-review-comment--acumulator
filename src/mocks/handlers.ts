import { graphql } from 'msw';
import { GetGithubRepositoriesDocument } from 'src/gql/github/graphql';
import { mockGithubUser } from './github/mock';

export const handlers = [
  // Handles a "GetUserInfo" query
  graphql.query(GetGithubRepositoriesDocument, (req, res, ctx) => {
    return res(
      ctx.data({
        user: mockGithubUser()
      })
    );
  })
];
