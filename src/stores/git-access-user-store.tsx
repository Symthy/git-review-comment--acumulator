import { GitAccessUserData } from 'src/types';
import { create } from 'zustand';

type GitAccessUserDataStore = {
  accessUser: GitAccessUserData;
  updateAccessTokens: ({ githubAccessToken, gitlabAccessToken }: GitAccessUserData) => void;
  isEmpty: () => boolean;
  getGithubAccessToken: () => string;
  getGitlabAccessToken: () => string;
};

export const useGitAccessUserStore = create<GitAccessUserDataStore>((set, get) => ({
  accessUser: {
    githubAccessToken: '',
    gitlabAccessToken: ''
  },
  getGithubAccessToken: () => {
    return get().accessUser.githubAccessToken;
  },
  getGitlabAccessToken: () => {
    return get().accessUser.gitlabAccessToken;
  },
  isEmpty: () => {
    return !get().accessUser.githubAccessToken && !get().accessUser.gitlabAccessToken;
  },
  updateAccessTokens: ({ githubAccessToken, gitlabAccessToken }: GitAccessUserData) => {
    if (githubAccessToken) {
      set((state) => ({
        accessUser: { ...state.accessUser, githubAccessToken: githubAccessToken }
      }));
    }
    if (gitlabAccessToken) {
      set((state) => ({
        accessUser: { ...state.accessUser, gitlabAccessToken: gitlabAccessToken }
      }));
    }
  }
}));
