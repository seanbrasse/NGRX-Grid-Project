import { createAction, props } from '@ngrx/store';
import { Row } from './../../row/Row.model';

//For the effects
export const addRow = createAction(
  '[AG-Grid] Add Row',
  props<{ highPrice: number; lowPrice: number }>()
);

//For the reducer
export const createRow = createAction(
  '[AG-Grid] Add Row',
  props<{ _id: string; highPrice: number; lowPrice: number }>()
);

//For the effects
export const removeRow = createAction(
  '[Effect] Remove Row',
  props<{ _id: string }>()
);

//For the reducer
export const deleteRow = createAction(
  '[AG-Grid] Delete Row',
  props<{ _id: string }>()
);

//For the effects
export const updateRow = createAction(
  '[AG-Grid] Update Row',
  props<{ _id: string; highPrice: number; lowPrice: number }>()
);

//For the reducer
export const changeRow = createAction(
  '[AG-Grid] Update Row',
  props<{ _id: string; highPrice: number; lowPrice: number }>()
);

export const loadRows = createAction('[AG-Grid] Load Rows');

export const loadRowsSuccess = createAction(
  '[AG-Grid] Row Load Success',
  props<{ rows: Row[] }>()
);

export const loadRowsFailure = createAction(
  '[AG-Grid] Row Load Failure',
  props<{ error: string }>()
);
