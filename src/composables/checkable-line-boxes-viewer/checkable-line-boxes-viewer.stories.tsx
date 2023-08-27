import type { Meta, StoryObj } from '@storybook/react';
import { CheckableLineBoxesViewer } from './checkable-line-boxes-viewer';
import { CheckableLineData } from '../../components/checkable-line-box';
import { ReactNode } from 'react';
import { useCheckableLineItemsRef } from './hooks/useCheckableLineItemsRef';

type ComponentType = typeof CheckableLineBoxesViewer;

export default {
  title: 'CheckableLineBoxesViewer',
  component: CheckableLineBoxesViewer
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => (
    <CheckableLineBoxesViewer
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
      render={function (
        currentViewItems: CheckableLineData[],
        itemsRef: ReturnType<typeof useCheckableLineItemsRef>
      ): ReactNode {
        return <div></div>;
      }}
    />
  )
};
