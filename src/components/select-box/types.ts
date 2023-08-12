import { CheckableLineData } from '../checkable-line-box';

export type Sorter = (items: CheckableLineData[]) => CheckableLineData[];
export type Orders = 'NAME' | 'CREATED_AT' | 'UPDATED_AT';
export type Directions = 'ASC' | 'DESC';
export type Actions = { order: Orders; direction: Directions };
