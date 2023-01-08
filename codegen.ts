import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // documents: ['src/**/*.tsx', '!src/gql/**/*'],
  generates: {
    './src/gql/github': {
      schema: 'https://docs.github.com/public/schema.docs.graphql',
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
