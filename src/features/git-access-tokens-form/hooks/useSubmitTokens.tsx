import { FormEvent } from 'react';
import { useGitAccessUserStore } from 'src/stores/git-access-user-store';
import { GitAccessUserData } from 'src/types';

export const useSubmitAccessTokens = ({ githubAccessToken, gitlabAccessToken }: GitAccessUserData) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!githubAccessToken && !githubAccessToken) {
    }

    const { updateAccessTokens } = useGitAccessUserStore();
  };
};
