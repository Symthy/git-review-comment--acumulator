import { ActionIcon, Button } from '@mantine/core';
import { Pin, PinnedOff } from 'tabler-icons-react';
import { useTogglePin } from './hooks/useTogglePin';

type Props = {
  pinnedStateSet?: ReturnType<typeof useTogglePin>;
};

export const TogglePin = ({ pinnedStateSet: [pinned, togglePin] = useTogglePin() }: Props) => {
  const handleClick = () => {
    togglePin();
  };

  const iconNode = pinned ? (
    <Pin size={40} strokeWidth={1.5} color={'#000'} />
  ) : (
    <PinnedOff size={40} strokeWidth={1.5} color={'#aaa'} />
  );

  return <ActionIcon onClick={handleClick}>{iconNode}</ActionIcon>;
};
