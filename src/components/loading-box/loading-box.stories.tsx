import type { Meta, StoryObj } from '@storybook/react';
import { LoadingBox } from './loading-box';

const meta: Meta<typeof LoadingBox> = {
  title: 'LoadingBox',
  component: LoadingBox
};

export default meta;
type Story = StoryObj<typeof LoadingBox>;
export const Primary: Story = {
  render: () => <LoadingBox color={'#228be6'} />
};
