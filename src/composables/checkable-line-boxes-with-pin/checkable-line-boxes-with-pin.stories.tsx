import type { Meta, StoryObj } from '@storybook/react';
import { CheckableLineBoxesWithPin } from './checkable-line-boxes-with-pin';

type ComponentType = typeof CheckableLineBoxesWithPin;

export default {
  title: 'CheckablePinLineBoxes',
  component: CheckableLineBoxesWithPin
} satisfies Meta<ComponentType>;

export const Default: StoryObj<ComponentType> = {
  render: () => <CheckableLineBoxesWithPin />
};
