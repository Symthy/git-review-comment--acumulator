import type { Meta, StoryObj } from '@storybook/react';

import { GitAccessTokensForm } from './git-access-tokens-form';

const meta: Meta<typeof GitAccessTokensForm> = {
  title: 'GitAccessTokensForm',
  component: GitAccessTokensForm
};

export default meta;
type Story = StoryObj<typeof GitAccessTokensForm>;

export const Primary: Story = {
  render: () => <GitAccessTokensForm />
};
