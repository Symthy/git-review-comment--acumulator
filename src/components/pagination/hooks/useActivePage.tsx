import { useState } from 'react';

export const useActivePage = (): [number, (page: number) => void] => {
  const [activePage, setActivePage] = useState(1);
  return [activePage, setActivePage];
};
