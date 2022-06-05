import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RowState } from './row.reducer';

export const selectRows = (state: AppState) => state.rows;
export const selectAllRows = createSelector(
  selectRows,
  (state: RowState) => state.rows
);
