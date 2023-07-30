import { Checkbox, Flex, Pagination, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { CheckableLineBox, CheckableLineData } from '../checkable-line-box/checkable-line-box';
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';

type CheckableLineBoxesPaginationProps = {
  itemsPerPage?: number;
  fetchFirstPageData: (itemPerPage: number) => Promise<{ items: CheckableLineData[]; totalCount: number } | undefined>;
  fetchAllPageData: () => Promise<CheckableLineData[]>;
};

const ScrollAreaWapper = ({ children }: { children: ReactNode }) => (
  <ScrollArea h={window.innerHeight - 135} sx={{ padding: '0.5rem' }}>
    {children}
  </ScrollArea>
);

const useItemsPerPage = (initialState: number | (() => number)): [number, (state: string) => void] => {
  const [itemsPerPage, setItemsPerPageNum] = useState<number>(initialState);
  const setItemsPerPage = (prevState: string) => {
    setItemsPerPageNum(Number(prevState));
  };
  return [itemsPerPage, setItemsPerPage];
};

export const CheckableLineBoxesPagination = ({
  fetchFirstPageData,
  fetchAllPageData
}: CheckableLineBoxesPaginationProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activePage, setPage] = useState(1);
  const [currentViewItems, setCurrentViewItems] = useState<CheckableLineData[]>([]);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useItemsPerPage(20);
  const [isLoading, setIsLoading] = useState(true);
  const allRepos = useRef<CheckableLineData[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchFirstPageData(itemsPerPage);
      if (data) {
        setCurrentViewItems(data.items);
        setTotal(Math.floor(data.totalCount / itemsPerPage) + 1);
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

  const updateCurrentViewItems = () => {
    const firstPostIndex = (activePage - 1) * itemsPerPage;
    const lastPostIndex = firstPostIndex + itemsPerPage;
    setCurrentViewItems(allRepos.current.slice(firstPostIndex, lastPostIndex));
  };
  useEffect(updateCurrentViewItems, [activePage]);
  useEffect(() => {
    if (allRepos.current.length < itemsPerPage) {
      setCurrentViewItems(allRepos.current);
      setTotal(1);
    } else {
      updateCurrentViewItems();
      setTotal(Math.floor(allRepos.current.length / itemsPerPage) + 1);
    }
    setPage(1);
  }, [itemsPerPage]);

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
      <Flex justify='flex-end' align='center' direction='row'>
        <SegmentedControl
          value={itemsPerPage.toString()}
          onChange={setItemsPerPage}
          data={[
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '50', value: '50' },
            { label: '100', value: '100' }
          ]}
        />
        <Text fz='sm' sx={{ marginRight: '1rem' }}>
          : Items per Page
        </Text>
      </Flex>
      <ScrollAreaWapper>
        <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
          {currentViewItems.map((item, index) => {
            let marginStyle = { margin: '0.5rem' };
            if (index === 0) {
              marginStyle = { margin: '0.1rem 0.5rem 0.5rem 0.5rem' };
            } else if (index === currentViewItems.length - 1) {
              marginStyle = { margin: '0.5rem 0.5rem 0.1rem 0.5rem' };
            }
            return (
              <CheckableLineBox
                key={item.key}
                value={item.value}
                title={item.title}
                subText={item.subtext}
                style={marginStyle}
              />
            );
          })}
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
