import { graphql, graphqlContext, GraphQLRequestBody, GraphQLVariables, MockedRequest, ResponseResolver } from 'msw';

export const mockGithubRepositories: ResponseResolver<
  MockedRequest<GraphQLRequestBody<GraphQLVariables>>,
  typeof graphqlContext
> = (req, res, ctx) => {
  return res(
    ctx.data({
      data: {
        user: {
          repositories: {
            nodes: [
              {
                name: 'react-clone-yumemi-exam',
                url: 'https://github.com/Symthy/react-clone-yumemi-exam'
              },
              {
                name: 'Symthy',
                url: 'https://github.com/Symthy/Symthy'
              },
              {
                name: 'gRPC-practices',
                url: 'https://github.com/Symthy/gRPC-practices'
              },
              {
                name: 'GraphQL-practices',
                url: 'https://github.com/Symthy/GraphQL-practices'
              },
              {
                name: 'git-review-comment-acumulator',
                url: 'https://github.com/Symthy/git-review-comment-acumulator'
              },
              {
                name: 'golang-distributed-service-study',
                url: 'https://github.com/Symthy/golang-distributed-service-study'
              },
              {
                name: 'poke-base-cache-serv',
                url: 'https://github.com/Symthy/poke-base-cache-serv'
              },
              {
                name: 'golang-rest-web-app-study',
                url: 'https://github.com/Symthy/golang-rest-web-app-study'
              },
              {
                name: 'ddd-practices',
                url: 'https://github.com/Symthy/ddd-practices'
              },
              {
                name: 'poke-battle-data-mgmt-serv',
                url: 'https://github.com/Symthy/poke-battle-data-mgmt-serv'
              }
            ]
          }
        }
      }
    })
  );
};
