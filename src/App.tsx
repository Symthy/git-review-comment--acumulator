import { Provider } from 'urql';
import './App.css';
import { GithubData } from './components/github-data.js';
import { GITHUB_TOKEN } from './config/token.js';
import { githubClient } from './hooks/gitGraphqlClient';

export const App = () => (
  <Provider value={githubClient}>
    <GithubData />
    {/* <Provider value={gitlabClient}>
      <GitLabIssueInfo />
    </Provider> */}
  </Provider>
);
