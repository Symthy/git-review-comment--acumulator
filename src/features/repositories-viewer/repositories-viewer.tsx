import { Tabs } from '@mantine/core';
import { GithubOwnRepositoryList } from './components/github-own-repository-list';
import { GithubOrganizationRepositoryList } from './components/github-organization-repository-list';
import { GitlabRepositoryList } from './components/gitlab-repository-list';
import { Suspense, useState } from 'react';

type Repositories = {
  GithubOwnRepositories: string[];
  GithubOrganizationRepositories: string[];
  GitLabRepositories: string[];
};
const useSelectedRepositories = (): [
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

type Props = {};

export const RepositoriesViewer = ({}: Props) => {
  const [selectedRepositories, setGithubOwnRepositories, setGithubOrganizationRepositories, setGitlabRepositories] =
    useSelectedRepositories();

  return (
    <Tabs defaultValue='Github'>
      <Tabs.List>
        <Tabs.Tab value='Github'>Github</Tabs.Tab>
        <Tabs.Tab value='GithubOrgs'>Github Orgs</Tabs.Tab>
        <Tabs.Tab value='Gitlab'>Gitlab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='Github' pt='xs'>
        <Suspense>
          <GithubOwnRepositoryList
            selectedRepositories={selectedRepositories.GithubOwnRepositories}
            setSelectedRepositories={setGithubOwnRepositories}
          />
        </Suspense>
      </Tabs.Panel>

      <Tabs.Panel value='GithubOrgs' pt='xs'>
        <Suspense>
          <GithubOrganizationRepositoryList />
        </Suspense>
      </Tabs.Panel>

      <Tabs.Panel value='Gitlab' pt='xs'>
        <Suspense>
          <GitlabRepositoryList />
        </Suspense>
      </Tabs.Panel>
    </Tabs>
  );
};
