import { Checkbox, Pagination, ScrollArea } from '@mantine/core';
import { CheckableLineBox, CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { ReactNode, useEffect, useRef, useState } from 'react';

type CheckableLineBoxesPaginationProps = {
  itemsPerPage?: number;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
};

const ScrollAreaWapper = ({ children }: { children: ReactNode }) => (
  <ScrollArea h={window.innerHeight - 100} sx={{ padding: '0.5rem' }}>
    {children}
  </ScrollArea>
);

export const CheckableLineBoxesPagination = ({
  itemsPerPage = 20,
  fetchFirstPageData,
  fetchAllPageData
}: CheckableLineBoxesPaginationProps) => {
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
    return (
      <ScrollAreaWapper>
        <div>Loading...</div>
      </ScrollAreaWapper>
    );
  }

  if (currentViewItems == null || currentViewItems.length == 0) {
    // Todo
    return (
      <ScrollAreaWapper>
        <div>Empty</div>
      </ScrollAreaWapper>
    );
  }

  return (
    <>
      <ScrollAreaWapper>
        <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
          {currentViewItems.map((item) => (
            <CheckableLineBox key={item.key} value={item.value} title={item.title} subText={item.subtext} />
          ))}
        </Checkbox.Group>
      </ScrollAreaWapper>
      <Pagination
        sx={{
          padding: '0.5rem 0.25rem'
        }}
        total={total}
        position='center'
        value={activePage}
        onChange={setPage}
      />
    </>
  );
};
