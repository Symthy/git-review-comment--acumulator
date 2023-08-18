import { MutableRefObject, useRef } from 'react';
import { CheckableLineData } from 'src/components/checkable-line-box';

class CheckableLineItems {
  private _allItems: MutableRefObject<CheckableLineData[]>;
  constructor() {
    this._allItems = useRef<CheckableLineData[]>([]);
  }

  get allItems(): CheckableLineData[] {
    return this._allItems.current;
  }

  set allItems(items: CheckableLineData[]) {
    this._allItems.current = items;
  }

  sort(itemsSorter: (items: CheckableLineData[]) => CheckableLineData[]) {
    this._allItems.current = itemsSorter(this._allItems.current);
  }
}

export const useCheckableLineItemsRef = (): CheckableLineItems => {
  return new CheckableLineItems();
};
