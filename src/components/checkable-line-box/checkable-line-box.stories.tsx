import type { Meta, StoryObj } from '@storybook/react';
import { CheckableLineBox } from './checkable-line-box';

type ComponentType = typeof CheckableLineBox;

export default {
  title: 'CheckableLineBox',
  component: CheckableLineBox
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => (
    <CheckableLineBox
      id={'id'}
      title={'CheckableLineBox'}
      subText='description'
      onCheck={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  )
};
