import type { Meta, StoryObj } from '@storybook/react';

import { Demo } from './form-demo';

const meta: Meta<typeof Demo> = {
  title: 'Mantine Form Demo',
  component: Demo
};

export default meta;
type Story = StoryObj<typeof Demo>;

export const Primary: Story = {
  render: () => <Demo />
};
