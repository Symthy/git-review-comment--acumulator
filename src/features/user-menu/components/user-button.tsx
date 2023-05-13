import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';
import { ChevronDown } from 'tabler-icons-react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  avatarImage?: string;
  name: string;
  color: string;
  subtext?: string;
  buttonIcon?: React.ReactNode;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ avatarImage, name, color, subtext, buttonIcon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        border: `0.1rem solid ${color}`,
        padding: '0.25rem'
      })}
      {...others}
    >
      <Group>
        <Avatar src={avatarImage} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>
          {subtext ? (
            <Text color='dimmed' size='xs'>
              {subtext}
            </Text>
          ) : (
            ''
          )}
        </div>

        {buttonIcon || <ChevronDown size='1rem' />}
      </Group>
    </UnstyledButton>
  )
);
