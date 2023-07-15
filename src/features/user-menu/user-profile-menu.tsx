import { Menu } from '@mantine/core';
import { useGithubQuery } from 'src/hooks/useGitQuery';
import { GET_GITHUB_USER_QUERY, UserAndPRs } from './api/getGithubUser';
import { UserButton } from './components/user-button';
import { LoadingBox } from 'src/components/elements/loading-box';

const color = '#228be6';

type Props = {};

export function UserProfileMenu({}: Props) {
  const [{ data, fetching, error }] = useGithubQuery<{ viewer: UserAndPRs }>({
    query: GET_GITHUB_USER_QUERY
  });

  if (error) {
    // Todo: error handling
    throw error;
  }

  if (!data) {
    // Todo: display empty box
    return <></>;
  }

  const user = data.viewer;
  const openedPrNumText = `In progress PR: ${user.pullRequests.nodes.length}`;
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        {fetching ? (
          <LoadingBox color={color} />
        ) : (
          <UserButton avatarImage={user.avatarUrl} name={user.login} color={color} subtext={openedPrNumText} />
        )}
      </Menu.Target>
    </Menu>
  );
}
