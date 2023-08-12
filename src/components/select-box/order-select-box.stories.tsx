import type { Meta, StoryObj } from '@storybook/react';
import { OrderSelectBox } from './order-select-box';
import { Sorter } from './types';

type ComponentType = typeof OrderSelectBox;

export default {
  title: 'OrderSelectBox',
  component: OrderSelectBox
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <OrderSelectBox handleSelectOrder={function (itemsSorter: Sorter): void {}} />
};
