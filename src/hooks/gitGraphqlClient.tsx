import { createClient } from 'urql';

// Todo
export const githubClient = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITHUB_TOKEN : ''}`
    }
  }
});

console.log(import.meta.env.VITE_GITHUB_TOKEN);

export const gitlabClient = createClient({
  url: 'https://gitlab.com/api/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer ${import.meta.env.DEV ? import.meta.env.VITE_GITLAB_TOKEN : ''}`
    }
  }
});

export const useGithubQuery = () => {};

export const useGitLabQuery = () => {};
