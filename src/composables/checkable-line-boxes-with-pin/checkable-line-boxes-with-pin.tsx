import { CheckableLineBox, CheckableLineData } from 'src/components/checkable-line-box';
import { TogglePin } from 'src/components/toggle-pin';
import { usePinnedItems } from './hooks/usePinnedItems';
import { useEffect } from 'react';

const defaultSortLogic = (prev: CheckableLineData, next: CheckableLineData): number => {
  return prev.value.toLocaleLowerCase() < next.value.toLocaleLowerCase() ? -1 : 1;
};

type Props = {
  currentViewItems: CheckableLineData[];
  sortLogic?: (prev: CheckableLineData, next: CheckableLineData) => number;
  handleClickPin: (sorter: (items: CheckableLineData[]) => CheckableLineData[]) => void;
};

export const CheckableLineBoxesWithPin = ({ currentViewItems, sortLogic, handleClickPin }: Props) => {
  const [pinnedItems, getPinState, togglePin] = usePinnedItems();
  const sortTopPinnedItems = (items: CheckableLineData[]): CheckableLineData[] => {
    const sortedPinnedItems = items.filter((item) => pinnedItems.includes(item.value)).sort(sortLogic);
    const sortedNonPinnedItems = items.filter((repo) => !pinnedItems.includes(repo.value)).sort(sortLogic);
    return [...sortedPinnedItems, ...sortedNonPinnedItems];
  };

  useEffect(() => {
    handleClickPin(sortTopPinnedItems);
  }, [pinnedItems]);

  return (
    <>
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
            suffixNode={<TogglePin stateSet={[getPinState(item.value), () => togglePin(item.value)]} />}
          />
        );
      })}
    </>
  );
};
