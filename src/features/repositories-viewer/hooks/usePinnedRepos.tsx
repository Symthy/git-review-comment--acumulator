import { useState } from 'react';

export const usePinnedRepos = (): [string[], (repoName: string) => boolean, (repoName: string) => void] => {
  const [repoNameToPinStates, setRepoNameToPinStates] = useState(new Map<string, boolean>());
  const newRepoNameToPinStates = new Map(repoNameToPinStates);
  const getPinState = (repoName: string): boolean => {
    const isPinned: boolean | undefined = repoNameToPinStates.get(repoName);
    if (isPinned == null) {
      return false;
    }
    return isPinned;
  };
  const togglePin = (repoName: string): void => {
    const isPinned: boolean | undefined = repoNameToPinStates.get(repoName);
    if (isPinned == null) {
      newRepoNameToPinStates.set(repoName, true);
    } else {
      newRepoNameToPinStates.set(repoName, !isPinned);
    }
    setRepoNameToPinStates(newRepoNameToPinStates);
  };
  const pinnedRepos = Array.from(repoNameToPinStates)
    .filter(([k, v]) => v)
    .map(([k, v]) => k);
  return [pinnedRepos, getPinState, togglePin];
};
