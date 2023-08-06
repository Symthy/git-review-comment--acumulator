import { useState } from 'react';

type Repositories = {
  GithubOwnRepositories: string[];
  GithubOrganizationRepositories: string[];
  GitLabRepositories: string[];
};

export const useSelectedRepositories = (): [
  Repositories,
  (repos: string[]) => void,
  (repos: string[]) => void,
  (repos: string[]) => void
] => {
  const [selectedRepositories, setSelectedRepositories] = useState<Repositories>({
    GithubOwnRepositories: [],
    GithubOrganizationRepositories: [],
    GitLabRepositories: []
  });
  const setGithubOwnRepositories = (repos: string[]) => {
    const newGithubOwnRepositories = { GithubOwnRepositories: repos };
    setSelectedRepositories({ ...selectedRepositories, ...newGithubOwnRepositories });
  };
  const setGithubOrganizationRepositories = (repos: string[]) => {
    const newGithubOrganizationRepositories = { GithubOrganizationRepositories: repos };
    setSelectedRepositories({ ...selectedRepositories, ...newGithubOrganizationRepositories });
  };
  const setGitlabRepositories = (repos: string[]) => {
    const newGitlabRepositories = { GithubOwnRepositories: repos };
    setSelectedRepositories({ ...selectedRepositories, ...newGitlabRepositories });
  };
  return [selectedRepositories, setGithubOwnRepositories, setGithubOrganizationRepositories, setGitlabRepositories];
};
