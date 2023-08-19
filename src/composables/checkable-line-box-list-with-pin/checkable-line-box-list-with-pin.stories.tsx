import type { Meta, StoryObj } from '@storybook/react';
import { CheckableLineBoxListWithPin } from './checkable-line-box-list-with-pin';

type ComponentType = typeof CheckableLineBoxListWithPin;

export default {
  title: 'CheckablePinLineBoxes',
  component: CheckableLineBoxListWithPin
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <CheckableLineBoxListWithPin />
};
