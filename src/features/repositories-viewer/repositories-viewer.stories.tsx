import type { Meta, StoryObj } from '@storybook/react';
import { RepositoriesViewer } from './repositories-viewer';

type ComponentType = typeof RepositoriesViewer;

export default {
  title: 'RepositoriesViewer',
  component: RepositoriesViewer
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <RepositoriesViewer />
};
