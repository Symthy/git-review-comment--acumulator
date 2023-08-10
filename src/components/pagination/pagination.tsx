import { Pagination as MantinePagenation } from '@mantine/core';
import { useEffect, useState } from 'react';

const useActivePage = (): [number, (page: number) => void] => {
  const [activePage, setActivePage] = useState(1);
  return [activePage, setActivePage];
};

type Props = {
  enabled: boolean;
  totalPages: number;
  handleSelectActivePage: () => void;
  stateSet?: ReturnType<typeof useActivePage>;
};

export const Pagination = ({
  enabled,
  totalPages = 1,
  handleSelectActivePage,
  stateSet: [activePage, setActivePage] = useActivePage()
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
