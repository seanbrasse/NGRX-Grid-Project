import { createReducer, on } from '@ngrx/store';
import { Row } from './../../row/Row.model';
import {
  createRow,
  changeRow,
  loadRowsSuccess,
  deleteRow,
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

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const rowReducer = createReducer(
  // Supply the initial state
  initialState,

  // Add the new row to the rows array
  on(createRow, (state, { _id, highPrice, lowPrice }) => ({
    ...state,
    rows: state.rows.concat({
      _id: _id,
      highPrice: highPrice,
      lowPrice: lowPrice,
      difference: highPrice - lowPrice,
    }),
  })),

  on(changeRow, (state, { _id, highPrice, lowPrice }) => ({
    ...state,
    rows: state.rows.map((content, _) =>
      content._id == _id
        ? { ...content, highPrice: highPrice, lowPrice: lowPrice }
        : content
    ),
  })),

  // Remove the row from the rows array
  on(deleteRow, (state, { _id }) => ({
    ...state,
    rows: state.rows.filter((row) => row._id !== _id),
  })),

  // Trigger loading the rows
  // on(loadRows, (state) => ({...state, status: 'loading', rows: [{id}] })),
  // Use this on(loadRows) until we have a database

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
