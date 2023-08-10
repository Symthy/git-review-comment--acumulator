import { useState } from 'react';

export const useTotalPages = (): [number, (allItemNums: number, itemsPerPage: number) => void] => {
  const [total, setTotal] = useState(0);
  const updateTotalPages = (allItemNums: number, itemsPerPage: number) => {
    if (allItemNums < itemsPerPage) {
      setTotal(1);
    } else {
      setTotal(Math.floor(allItemNums / itemsPerPage) + 1);
    }
  };
  return [total, updateTotalPages];
};
