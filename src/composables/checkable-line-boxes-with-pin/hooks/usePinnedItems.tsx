import { useState } from 'react';

export const usePinnedItems = (): [string[], (repoName: string) => boolean, (repoName: string) => void] => {
  const [itemNameToPinState, setItemNameToPinState] = useState(new Map<string, boolean>());
  const newItemNameToPinState = new Map(itemNameToPinState);
  const getPinState = (repoName: string): boolean => {
    const isPinned: boolean | undefined = itemNameToPinState.get(repoName);
    if (isPinned == null) {
      return false;
    }
    return isPinned;
  };
  const togglePin = (repoName: string): void => {
    const isPinned: boolean | undefined = itemNameToPinState.get(repoName);
    if (isPinned == null) {
      newItemNameToPinState.set(repoName, true);
    } else {
      newItemNameToPinState.set(repoName, !isPinned);
    }
    setItemNameToPinState(newItemNameToPinState);
  };
  const pinnedItemNames = Array.from(itemNameToPinState)
    .filter(([_, v]) => v)
    .map(([k, _]) => k);
  return [pinnedItemNames, getPinState, togglePin];
};
