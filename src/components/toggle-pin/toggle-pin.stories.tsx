import type { Meta, StoryObj } from '@storybook/react';
import { TogglePin } from './toggle-pin';

type ComponentType = typeof TogglePin;

export default {
  title: 'TogglePin',
  component: TogglePin
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <TogglePin />
};
