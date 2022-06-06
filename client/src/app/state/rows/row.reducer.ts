import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Row } from './../../row/Row.model';
import {
  addRow,
  loadRows,
  updateRow,
  loadRowsSuccess,
  removeRow,
  loadRowsFailure,
} from './row.actions';

export interface RowState {
  rows: Row[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RowState = {
  rows: [],
  error: '',
  status: 'pending',
};

export const rowReducer = createReducer(
  // Supply the initial state
  initialState,

  // Add the new row to the rows array
  on(addRow, (state, { highPrice, lowPrice }) => ({
    ...state,
    rows: [
      ...state.rows,
      {
        id: state.rows.length + 1,
        highPrice: highPrice,
        lowPrice: lowPrice,
        difference: highPrice - lowPrice,
      },
    ],
  })),

  on(updateRow, (state, { id, highPrice, lowPrice }) => ({
    ...state,
    rows: state.rows.map((content, i) =>
      i === id
        ? { ...content, highPrice: highPrice, lowPrice: lowPrice }
        : content
    ),
  })),

  // Remove the row from the rows array
  on(removeRow, (state, { id }) => ({
    ...state,
    rows: state.rows.filter((row) => row.id !== id),
  })),

  // Trigger loading the rows
  // on(loadRows, (state) => ({...state, status: 'loading', rows: [{id}] })),
  // Use this on(loadRows) until we have a database
  on(loadRows, (state) => ({
    status: 'loading',
    rows: [{ id: 1, highPrice: 0, lowPrice: 0 }],
    error: '',
  })),

  // Handle successfully loaded rows
  on(loadRowsSuccess, (state, { rows }) => ({
    ...state,
    rows: rows,
    error: '',
    status: 'success',
  })),

  // Handle todos load failure
  on(loadRowsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
