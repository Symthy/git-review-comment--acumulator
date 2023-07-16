import type { Meta, StoryObj } from '@storybook/react';
import { GitlabRepositoryList } from './gitlab-repository-list';

type ComponentType = typeof GitlabRepositoryList;

export default {
  title: 'GitlabRepositoryList',
  component: GitlabRepositoryList
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <GitlabRepositoryList />
};
