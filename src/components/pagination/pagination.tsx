import { Pagination as MantinePagenation } from '@mantine/core';
import { useActivePage } from './hooks/useActivePage';

type Props = {
  enabled: boolean;
  totalPages: number;
  activePageStateSet?: ReturnType<typeof useActivePage>;
};

export const Pagination = ({
  enabled,
  totalPages = 1,
  activePageStateSet: [activePage, setActivePage] = useActivePage()
}: Props) => {
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
