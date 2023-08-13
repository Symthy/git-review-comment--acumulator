import { CheckableLineBox, CheckableLineData } from 'src/components/checkable-line-box';
import { TogglePin } from 'src/components/toggle-pin';
import { usePinnedItems } from './hooks/usePinnedItems';
import { useEffect } from 'react';

const defaultSortLogic = (prev: CheckableLineData, next: CheckableLineData): number => {
  return prev.value.toLocaleLowerCase() < next.value.toLocaleLowerCase() ? -1 : 1;
};

type Props = {
  currentViewItems: CheckableLineData[];
  handleClickPin: (pinnedItemNames: string[]) => void;
  pinnedItemsStateSet: ReturnType<typeof usePinnedItems>;
};

export const CheckableLineBoxesWithPin = ({
  currentViewItems,
  handleClickPin,
  pinnedItemsStateSet: [pinnedItemNames, getPinState, togglePin] = usePinnedItems()
}: Props) => {
  useEffect(() => {
    handleClickPin(pinnedItemNames);
  }, [pinnedItemNames.length]);

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
            suffixNode={<TogglePin pinnedStateSet={[getPinState(item.value), () => togglePin(item.value)]} />}
          />
        );
      })}
    </>
  );
};
