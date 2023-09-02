import { ActionIcon, Button } from '@mantine/core';
import { Reload } from 'tabler-icons-react';

type Props = {
  handleClick: () => void;
  size?: number;
};

export const ReloadBtn = ({ handleClick, size = 25 }: Props) => {
  return (
    <Button size='xs' onClick={handleClick} sx={{ margin: '0.2rem', padding: '0.2rem' }}>
      <Reload size={size} strokeWidth={2} color={'#fff'} />
    </Button>
  );
};
