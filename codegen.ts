import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/gql/github/': {
      schema: 'https://docs.github.com/public/schema.docs.graphql',
      documents: 'src/data/github/github-queries.ts',
      preset: 'client',
      plugins: [] // 'typescript'を入れると型が２重出力される
    },
    './src/gql/gitlab/': {
      schema: 'https://gitlab.com/api/graphql?remove_deprecated=true',
      documents: 'src/data/gitlab/gitlab-queries.ts',
      preset: 'client',
      plugins: [] // 'typescript'を入れると型が２重出力される
    },
    './src/mocks/github/mock.ts': {
      schema: 'https://docs.github.com/public/schema.docs.graphql',
      // documents: 'src/data/github/github-queries.ts',
      plugins: [
        {
          'typescript-mock-data': {
            typesFile: 'src/gql/github/graphql.ts',
            prefix: 'mockGithub',
            terminateCircularRelationships: true // 循環関係による無限再帰防止
          }
        }
      ]
    },
    './src/mocks/gitlab/mock.ts': {
      schema: 'https://gitlab.com/api/graphql?remove_deprecated=true',
      // documents: 'src/data/gitlab/gitlab-queries.ts',
      plugins: [
        {
          'typescript-mock-data': {
            typesFile: 'src/gql/gitlab/graphql.ts',
            prefix: 'mockGitlab',
            terminateCircularRelationships: true // 循環関係による無限再帰防止
          }
        }
      ]
    }
  },
  overwrite: true
};

export default config;
