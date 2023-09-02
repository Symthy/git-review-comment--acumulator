import { ReactNode } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';
import { useCheckableLineItemsRef } from '../hooks/useCheckableLineItemsRef';
import { useCheckableLineBoxesContext } from '../checkable-line-boxes.context';
import { Checkbox, ScrollArea } from '@mantine/core';

export const Group = ({
  selectedItems,
  setSelectedItems,
  render
}: {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  render: (currentViewItems: CheckableLineData[], itemsRef: ReturnType<typeof useCheckableLineItemsRef>) => ReactNode;
}) => {
  const { itemsRef, currentViewItems, isLoading } = useCheckableLineBoxesContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea h={window.innerHeight - 180} sx={{ padding: '0.5rem' }}>
      <Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
        {render(currentViewItems, itemsRef)}
      </Checkbox.Group>
    </ScrollArea>
  );
};
