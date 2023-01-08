import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import { GithubData } from './components/github-data.js';
import { GITHUB_TOKEN } from './config/token.js';

const githubGqlClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `bearer ${GITHUB_TOKEN}`
  },
  cache: new InMemoryCache()
});

export const App = () => (
  <ApolloProvider client={githubGqlClient}>
    <GithubData />
  </ApolloProvider>
);
