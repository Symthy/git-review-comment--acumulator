import { Tabs } from '@mantine/core';
import { GithubOwnRepositoryList } from './components/github-own-repository-list';
import { GithubOrganizationRepositoryList } from './components/github-organization-repository-list';
import { GitlabRepositoryList } from './components/gitlab-repository-list';
import { Suspense } from 'react';

type Props = {};

export const RepositoriesViewer = ({}: Props) => {
  return (
    <Tabs defaultValue='Github'>
      <Tabs.List>
        <Tabs.Tab value='Github'>Github</Tabs.Tab>
        <Tabs.Tab value='GithubOrgs'>Github Orgs</Tabs.Tab>
        <Tabs.Tab value='Gitlab'>Gitlab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='Github' pt='xs'>
        <Suspense>
          <GithubOwnRepositoryList />
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
