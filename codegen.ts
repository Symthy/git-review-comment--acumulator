import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // documents: ['src/**/*.tsx', '!src/gql/**/*'],
  generates: {
    './src/gql/github/': {
      schema: 'https://docs.github.com/public/schema.docs.graphql',
      preset: 'client',
      plugins: []
    },
    './src/gql/gitlab/': {
      schema: 'https://gitlab.com/api/graphql?remove_deprecated=true',
      preset: 'client',
      plugins: []
    }
  },
  overwrite: true
};

export default config;
