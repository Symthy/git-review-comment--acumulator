import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';
import { ChevronDown } from 'tabler-icons-react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name: string;
  color: string;
  subtext?: string;
  icon?: React.ReactNode;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, color, subtext, icon, ...others }: UserButtonProps, ref) => (
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
        <Avatar src={image} radius='xl' />

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

        {icon || <ChevronDown size='1rem' />}
      </Group>
    </UnstyledButton>
  )
);
