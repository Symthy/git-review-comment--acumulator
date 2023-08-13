import { useState } from 'react';

export const useItemsPerPage = (initialState: number | (() => number)): [number, (state: string) => void] => {
  const [itemsPerPage, setItemsPerPageNum] = useState<number>(initialState);
  const setItemsPerPage = (prevState: string) => {
    setItemsPerPageNum(Number(prevState));
  };
  return [itemsPerPage, setItemsPerPage];
};
