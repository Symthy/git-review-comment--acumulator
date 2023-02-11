import { Client, createClient } from 'urql';

export type GitGraphqlClient = Client;

const buildGithubClient = (accessToken: string): GitGraphqlClient => {
  return buildGitGraphqlClient('https://api.github.com/graphql', accessToken);
};

const buildGitlabClient = (gitlabBaseUri: string, accessToken: string) => {
  buildGitGraphqlClient(`${gitlabBaseUri}/api/graphql`, accessToken);
};

const buildGitGraphqlClient = (url: string, accessToken: string) => {
  return createClient({
    url: url,
    fetchOptions: {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
  });
};

export const githubClient = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITHUB_TOKEN : ''}`
    }
  }
});

export const gitlabClient = createClient({
  url: `${import.meta.env.VITE_GITLAB_URL}/api/graphql`,
  fetchOptions: {
    headers: {
      authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITLAB_TOKEN : ''}`
    }
  }
});
