import {
  PickedRepository,
  recursivelyFetchAllGithubOwnRepositories,
  useGetGithubOwnRepositories
} from '../../api/useGetGithubOwnRepositories';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Checkbox, Pagination } from '@mantine/core';
import { CheckableLineBox } from 'src/components/checkable-line-box';

type Props = {};

export const GithubOwnRepositoryList = ({}: Props) => {
  const itemsPerPage = 50;
  const [selectedRepositoryNames, setSelectedRepositoryNames] = useState<string[]>([]);
  const [activePage, setPage] = useState(1);
  const [repositories, setRepositories] = useState<PickedRepository[]>([]);

  const currentViewRepos = useMemo(() => {
    const firstPostIndex = (activePage - 1) * itemsPerPage;
    const lastPostIndex = firstPostIndex + itemsPerPage;
    return repositories.slice(firstPostIndex, lastPostIndex);
  }, [repositories]);

  useEffect(() => {
    const fetchAllOwnRepos = async () => {
      const repos = await recursivelyFetchAllGithubOwnRepositories();
      setRepositories(repos);
    };
    fetchAllOwnRepos();
  }, []);

  if (repositories == null || repositories.length == 0) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <Checkbox.Group value={selectedRepositoryNames} onChange={setSelectedRepositoryNames}>
        {currentViewRepos.map((repo) => (
          <CheckableLineBox id={repo.name} title={repo.name} subText={repo.description?.toString()} />
        ))}
      </Checkbox.Group>
      <Pagination total={repositories.length / currentViewRepos.length} value={activePage} onChange={setPage} />
    </div>
  );
};
