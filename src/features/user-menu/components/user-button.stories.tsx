import type { Meta, StoryObj } from '@storybook/react';

import { UserButton } from './user-button';

const meta: Meta<typeof UserButton> = {
  title: 'UserButton',
  component: UserButton
};

export default meta;
type Story = StoryObj<typeof UserButton>;

export const ExistImage: Story = {
  render: () => (
    <UserButton
      avatarImage={'https://avatars.githubusercontent.com/u/44676939?u=e02e4ed0dc826cac54ab27823ea8775d6d2fec4a&v=4'}
      name={'Symthy'}
      color={'#228be6'}
      subtext={'Github'}
    />
  )
};

export const NoImage: Story = {
  render: () => <UserButton name={'Nothing'} color={'#228be6'} subtext={'Gitlab'} />
};

export const NoSubText: Story = {
  render: () => <UserButton name={'Nothing'} color={'#228be6'} />
};
