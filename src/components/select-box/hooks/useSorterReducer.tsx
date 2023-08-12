import { CheckableLineData } from 'src/components/checkable-line-box';
import { Actions, Sorter } from '../types';
import { useReducer } from 'react';

const defaultSorter = (items: CheckableLineData[]): CheckableLineData[] => {
  return items.sort((prev, next) => (prev.value.toLocaleLowerCase() < next.value.toLocaleLowerCase() ? -1 : 1));
};
const reducer = (state: Sorter, action: Actions) => {
  switch (action.direction) {
    case 'ASC':
      switch (action.order) {
        case 'NAME':
          return defaultSorter;
        case 'CREATED_AT':
          return (items: CheckableLineData[]): CheckableLineData[] => {
            return items.sort((prev, next) => (prev.createdAt < next.createdAt ? -1 : 1));
          };
        case 'UPDATED_AT':
          return (items: CheckableLineData[]): CheckableLineData[] => {
            return items.sort((prev, next) => (prev.updatedAt < next.updatedAt ? -1 : 1));
          };
        default:
          return state;
      }
    case 'DESC':
      switch (action.order) {
        case 'NAME':
          return (items: CheckableLineData[]): CheckableLineData[] => {
            return items.sort((prev, next) =>
              prev.value.toLocaleLowerCase() > next.value.toLocaleLowerCase() ? -1 : 1
            );
          };
        case 'CREATED_AT':
          return (items: CheckableLineData[]): CheckableLineData[] => {
            return items.sort((prev, next) => (prev.createdAt > next.createdAt ? -1 : 1));
          };
        case 'UPDATED_AT':
          return (items: CheckableLineData[]): CheckableLineData[] => {
            return items.sort((prev, next) => (prev.updatedAt > next.updatedAt ? -1 : 1));
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export const useSorterReducer = () => useReducer(reducer, defaultSorter);
