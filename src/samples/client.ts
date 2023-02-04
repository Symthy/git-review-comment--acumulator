import { createClient } from 'urql';

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
