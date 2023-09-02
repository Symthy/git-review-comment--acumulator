import type { Meta, StoryObj } from '@storybook/react';
import { ReloadBtn } from './reload-btn';

type ComponentType = typeof ReloadBtn;

export default {
  title: 'ReloadBtn',
  component: ReloadBtn
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <ReloadBtn />
};
