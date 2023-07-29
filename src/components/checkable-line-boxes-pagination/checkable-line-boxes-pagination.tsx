import { Checkbox, Pagination } from '@mantine/core';
import { CheckableLineBox, CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { useEffect, useRef, useState } from 'react';

type CheckableLineBoxesPaginationProps = {
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
};

export const CheckableLineBoxesPagination = ({
  fetchFirstPageData,
  fetchAllPageData
}: CheckableLineBoxesPaginationProps) => {
  const itemsPerPage = 20;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activePage, setPage] = useState(1);
  const [currentViewItems, setCurrentViewItems] = useState<CheckableLineData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const allRepos = useRef<CheckableLineData[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchFirstPageData(itemsPerPage);
      if (data) {
        setCurrentViewItems(data.items);
        setTotal(Math.floor(data.totalCount / itemsPerPage + 1));
      }
      setIsLoading(false);
    };
    const fetchAllData = async () => {
      const repos = await fetchAllPageData();
      allRepos.current = repos;
    };
    initialize();
    fetchAllData();
  }, []);

  useEffect(() => {
    const firstPostIndex = (activePage - 1) * itemsPerPage;
    const lastPostIndex = firstPostIndex + itemsPerPage;
    setCurrentViewItems(allRepos.current.slice(firstPostIndex, lastPostIndex));
  }, [activePage]);

  if (isLoading) {
    // Todo
    return <div>Loading...</div>;
  }

  if (currentViewItems == null || currentViewItems.length == 0) {
    // Todo
    return <div>Empty</div>;
  }

  return (
    <div>
      <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
        {currentViewItems.map((item) => (
          <CheckableLineBox key={item.key} value={item.value} title={item.title} subText={item.subtext} />
        ))}
      </Checkbox.Group>
      <Pagination total={total} value={activePage} onChange={setPage} />
    </div>
  );
};
