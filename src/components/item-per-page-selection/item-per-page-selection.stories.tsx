import type { Meta, StoryObj } from '@storybook/react';
import { ItemPerPageSelection } from './item-per-page-selection';

type ComponentType = typeof ItemPerPageSelection;

export default {
  title: 'ItemPerPageSelection',
  component: ItemPerPageSelection
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <ItemPerPageSelection />
};
