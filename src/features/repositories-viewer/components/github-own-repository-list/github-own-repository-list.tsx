import {
  PickedRepository,
  fetchOwnRepositories,
  recursivelyFetchAllGithubOwnRepositories
} from '../../api/getGithubOwnRepositories';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, Pagination } from '@mantine/core';
import { CheckableLineBox } from 'src/components/checkable-line-box';

type Props = {};

export const GithubOwnRepositoryList = ({}: Props) => {
  const itemsPerPage = 20;
  const [selectedRepositoryNames, setSelectedRepositoryNames] = useState<string[]>([]);
  const [activePage, setPage] = useState(1);
  const [currentViewRepos, setCurrentViewRepos] = useState<PickedRepository[]>([]);
  const [total, setTotal] = useState(0);
  const allRepos = useRef<PickedRepository[]>([]);

  useEffect(() => {
    const fetchFirstPageData = async () => {
      const data = await fetchOwnRepositories(itemsPerPage);
      if (data) {
        setCurrentViewRepos(data.viewer.repositories.nodes);
        setTotal(Math.floor(data.viewer.repositories.totalCount / itemsPerPage + 1));
      }
    };
    const fetchAllOwnRepos = async () => {
      const repos = await recursivelyFetchAllGithubOwnRepositories();
      allRepos.current = repos;
    };
    fetchFirstPageData();
    fetchAllOwnRepos();
  }, []);

  useEffect(() => {
    const firstPostIndex = (activePage - 1) * itemsPerPage;
    const lastPostIndex = firstPostIndex + itemsPerPage;
    setCurrentViewRepos(allRepos.current.slice(firstPostIndex, lastPostIndex));
  }, [activePage]);

  if (currentViewRepos == null || currentViewRepos.length == 0) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <Checkbox.Group value={selectedRepositoryNames} onChange={setSelectedRepositoryNames}>
        {currentViewRepos.map((repo) => (
          <CheckableLineBox key={repo.id} id={repo.name} title={repo.name} subText={repo.description?.toString()} />
        ))}
      </Checkbox.Group>
      <Pagination total={total} value={activePage} onChange={setPage} />
    </div>
  );
};
