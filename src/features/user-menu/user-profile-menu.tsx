import { Menu } from '@mantine/core';
import { useGithubQuery } from 'src/hooks/useGitQuery';
import { GET_GITHUB_USER_QUERY, UserAndPRs } from './api/getGithubUser';
import { UserButton } from './components/user-button';
import { LoadingBox } from 'src/components/elements/loading-box';
import { Suspense } from 'react';

const color = '#228be6';

type Props = {};

export function UserProfileMenu({}: Props) {
  return (
    <Suspense fallback={<LoadingBox color={color} />}>
      <InnerUserProfileMenu />
    </Suspense>
  );
}
function InnerUserProfileMenu({}: Props) {
  const [{ data }] = useGithubQuery<{ viewer: UserAndPRs }>({
    query: GET_GITHUB_USER_QUERY
  });

  if (!data) {
    // Todo: display empty box
    return <></>;
  }

  const user = data.viewer;
  const openedPrNumText = `In progress PR: ${user.pullRequests.nodes.length}`;
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <UserButton avatarImage={user.avatarUrl} name={user.login} color={color} subtext={openedPrNumText} />
      </Menu.Target>
    </Menu>
  );
}
