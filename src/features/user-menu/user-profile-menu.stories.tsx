import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileMenu } from './user-profile-menu';

const meta: Meta<typeof UserProfileMenu> = {
  title: 'UserProfileMenu',
  component: UserProfileMenu
};

export default meta;
type Story = StoryObj<typeof UserProfileMenu>;
export const Primary: Story = {
  render: () => <UserProfileMenu />
};
