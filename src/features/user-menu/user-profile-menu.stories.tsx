import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileMenu } from '.';

type COMPONENT = typeof UserProfileMenu;

export default {
  title: 'UserProfileMenu',
  component: UserProfileMenu
} satisfies Meta<COMPONENT>;

export const Default: StoryObj<COMPONENT> = {
  render: () => <UserProfileMenu />
};
