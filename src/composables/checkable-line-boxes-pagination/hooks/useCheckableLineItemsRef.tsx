import { MutableRefObject, useRef } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';

class CheckableLineItems {
  private _allItems: MutableRefObject<CheckableLineData[]>;
  constructor(private _itemsSorter: (items: CheckableLineData[]) => CheckableLineData[]) {
    this._allItems = useRef<CheckableLineData[]>([]);
  }

  get allItems(): CheckableLineData[] {
    return this._allItems.current;
  }

  set allItems(items: CheckableLineData[]) {
    this._allItems.current = items;
  }

  sort(): void {
    this._allItems.current = this._itemsSorter(this._allItems.current);
  }
}

export const useCheckableLineItemsRef = (
  itemsSorter: (items: CheckableLineData[]) => CheckableLineData[]
): CheckableLineItems => {
  return new CheckableLineItems(itemsSorter);
};
