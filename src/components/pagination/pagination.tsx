import { Pagination as MantinePagenation } from '@mantine/core';
import { useEffect } from 'react';
import { useActivePage } from './hooks/useActivePage';

type Props = {
  enabled: boolean;
  totalPages: number;
  handleSelectActivePage: () => void;
  activePageStateSet?: ReturnType<typeof useActivePage>;
};

export const Pagination = ({
  enabled,
  totalPages = 1,
  handleSelectActivePage,
  activePageStateSet: [activePage, setActivePage] = useActivePage()
}: Props) => {
  useEffect(() => {
    handleSelectActivePage();
  }, [activePage]);

  return (
    <MantinePagenation
      sx={{
        padding: '0.5rem 0.25rem'
      }}
      total={totalPages}
      position='center'
      value={activePage}
      onChange={setActivePage}
      disabled={!enabled}
    />
  );
};
