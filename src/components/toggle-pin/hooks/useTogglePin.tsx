import { useState } from 'react';

export const useTogglePin = (): [boolean, () => void] => {
  const [pinned, setPinned] = useState(false);
  const togglePin = () => setPinned(!pinned);
  return [pinned, togglePin];
};
