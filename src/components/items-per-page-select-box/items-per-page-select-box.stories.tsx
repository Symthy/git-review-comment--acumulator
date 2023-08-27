import type { Meta, StoryObj } from '@storybook/react';
import { ItemsPerPageSelectBox } from './items-per-page-select-box';

type ComponentType = typeof ItemsPerPageSelectBox;

export default {
  title: 'ItemsPerPageSelection',
  component: ItemsPerPageSelectBox
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <ItemsPerPageSelectBox enabled={true} />
};
