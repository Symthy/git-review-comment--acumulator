import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

type ComponentType = typeof Pagination;

export default {
  title: 'Pagination',
  component: Pagination
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <Pagination enabled={true} totalPages={2} handleSelectActivePage={() => {}} />
};
