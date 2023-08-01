import type { Meta, StoryObj } from '@storybook/react';
import { CheckableLineBoxesPagination } from './checkable-line-boxes-pagination';
import { CheckableLineData } from '../checkable-line-box/checkable-line-box';

type ComponentType = typeof CheckableLineBoxesPagination;

export default {
  title: 'CheckableLineBoxesPagination',
  component: CheckableLineBoxesPagination
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => (
    <CheckableLineBoxesPagination
      selectedItems={[]}
      setSelectedItems={function (items: string[]): void {}}
      fetchFirstPageData={function (
        itemPerPage: number
      ): Promise<{ items: CheckableLineData[]; totalCount: number } | undefined> {
        return new Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>((resolve) => {
          resolve({ items: [], totalCount: 0 });
        });
      }}
      fetchAllPageData={function (): Promise<CheckableLineData[]> {
        return new Promise<CheckableLineData[]>((resolve) => {
          resolve([]);
        });
      }}
    />
  )
};
