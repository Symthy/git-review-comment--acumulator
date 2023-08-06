import { CheckableLineData } from 'src/components/checkable-line-box';

export const sortLogic = (a: CheckableLineData, b: CheckableLineData): number => {
  return a.value.toLocaleLowerCase() < b.value.toLocaleLowerCase() ? -1 : 1;
};
