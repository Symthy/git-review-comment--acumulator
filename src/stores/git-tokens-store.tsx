import { create } from 'zustand';

type GitAccessUserData = {
  githubAccessToken: string;
  gitlabAccessToken: string;
};

type GitAccessUserDataStore = {
  accessUser: GitAccessUserData;
  updateGithubAccessToken: (token: string) => void;
  updateGitlabAccessToken: (token: string) => void;
  isEmpty: () => boolean;
  getGithubAccessToken: () => string;
  getGitlabAccessToken: () => string;
};

const useGitTokensStore = create<GitAccessUserDataStore>((set, get) => ({
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
  updateGithubAccessToken: (token: string) => {
    if (!token) {
      return;
    }
    set((state) => ({
      accessUser: { ...state.accessUser, githubAccessToken: token }
    }));
  },
  updateGitlabAccessToken: (token: string) => {
    if (!token) {
      return;
    }
    set((state) => ({
      accessUser: { ...state.accessUser, gitlabAccessToken: token }
    }));
  }
}));
