import type { Meta, StoryObj } from '@storybook/react';
import { ItemsPerPageSelection } from './items-per-page-selection';

type ComponentType = typeof ItemsPerPageSelection;

export default {
  title: 'ItemsPerPageSelection',
  component: ItemsPerPageSelection
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <ItemsPerPageSelection enabled={true} handleSelectItemsPerPage={() => {}} />
};
