import { Box, CSSObject, Checkbox, MantineTheme, Sx, Text } from '@mantine/core';
import { ReactNode, useState } from 'react';

export type CheckableLineData = {
  key: string;
  value: string;
  title: string;
  subtext?: string;
};

type Props = {
  value: string;
  title: string;
  subText?: string;
  style: CSSObject;
  prefixNode?: ReactNode;
  suffixNode?: ReactNode;
};

export const CheckableLineBox = ({ value, title, subText, style, prefixNode, suffixNode }: Props) => {
  const [checked, setChecked] = useState(false);
  const buildStyle = (theme: MantineTheme, additionalStyle: CSSObject): CSSObject => {
    const style = {
      display: 'flex',
      border: 'solid 0.01rem',
      borderColor: '#228be6',
      boxShadow: '0.2rem 0.2rem 0.1rem rgba(0, 0, 0, 0.1)',
      alignItems: 'center',
      height: '3.25rem',
      borderRadius: theme.radius.sm,
      cursor: 'pointer',
      '&>*': {
        margin: '0rem 0.5rem'
      }
    };
    return { ...style, ...additionalStyle };
  };

  return (
    <Box sx={(theme) => buildStyle(theme, style)}>
      <Checkbox
        value={value}
        label=''
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      {prefixNode}
      <div style={{ flex: 1 }}>
        <Text size='md' truncate>
          {title}
        </Text>
        {subText || subText !== '' ? (
          <Text color='dimmed' size='xs' truncate>
            {subText}
          </Text>
        ) : (
          ''
        )}
      </div>
      {suffixNode}
    </Box>
  );
};
