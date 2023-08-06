import type { Meta, StoryObj } from '@storybook/react';
import { RepositoryList } from './repository-list';

type ComponentType = typeof RepositoryList;

export default {
  title: 'RepositoryList',
  component: RepositoryList
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <RepositoryList />
};
