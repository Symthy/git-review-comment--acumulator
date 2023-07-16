import type { Meta, StoryObj } from '@storybook/react';
import { GithubOrganizationRepositoryList } from './github-organization-repository-list';

type ComponentType = typeof GithubOrganizationRepositoryList;

export default {
  title: 'GithubOrganizationRepositoryList',
  component: GithubOrganizationRepositoryList
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <GithubOrganizationRepositoryList />
};
