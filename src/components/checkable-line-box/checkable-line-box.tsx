import { Box, Checkbox, Text } from '@mantine/core';
import { ReactNode, useState } from 'react';

type Props = {
  id: string;
  title: string;
  subText?: string;
  onCheck: () => void;
  prefixChildren?: ReactNode;
  suffixChildren?: ReactNode;
};

export const CheckableLineBox = (props: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        border: 'solid 0.01rem',
        borderColor: '#228be6',
        boxShadow: '0.25rem 0.25rem 0.1rem rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        height: '4rem',
        //padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        cursor: 'pointer',
        '&>*': {
          margin: '0 0.5rem'
        }
      })}
    >
      <Checkbox
        value={props.id}
        label=''
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      {props.prefixChildren}
      <div style={{ flex: 1 }}>
        <Text size='lg' truncate>
          {props.title}
        </Text>
        {props.subText ? (
          <Text color='dimmed' size='xs' truncate>
            {props.subText}
          </Text>
        ) : (
          ''
        )}
      </div>
      {props.suffixChildren}
    </Box>
  );
};
