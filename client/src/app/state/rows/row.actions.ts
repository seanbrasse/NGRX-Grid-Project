import { createAction, props } from '@ngrx/store';
import { Row } from './../../row/Row.model';

export const addRow = createAction(
  '[AG-Grid] Add Row',
  props<{ highPrice: number, lowPrice: number }>()
);

export const removeRow = createAction(
  '[AG-Grid] Remove Row',
    props<{ id: number }>()
)

export const updateRow = createAction(
  '[AG-Grid] Update Row',
  props<{ id: number, highPrice: number, lowPrice: number}>()
)

export const loadRows = createAction('[AG-Grid] Load Rows');

export const loadRowsSuccess = createAction(
  '[AG-Grid] Row Load Success',
  props<{rows: Row[]}>()
);

export const loadRowsFailure = createAction(
  '[AG-Grid] Row Load Failure',
  props<{ error: string }>()
);




