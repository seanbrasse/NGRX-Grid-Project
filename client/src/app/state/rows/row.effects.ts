import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRow,
  createRow,
  removeRow,
  loadRows,
  deleteRow,
  changeRow,
  loadRowsSuccess,
  loadRowsFailure,
  updateRow,
} from './row.actions';
import { RowService } from '../../row/row.service';
import { of, from } from 'rxjs';
import {
  switchMap,
  mergeMap,
  map,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import { selectAllRows } from './row.selector';
import { AppState } from '../app.state';

@Injectable()
export class RowEffects {
  constructor(private actions$: Actions, private rowService: RowService) {}

  // Run this code when a loadRows action is dispatched
  loadRows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRows),
      mergeMap(() =>
        // Call the getRows method, convert it to an observable
        from(this.rowService.getRows()).pipe(
          // Take the returned value and return a new success action containing the rows
          map((rows) => loadRowsSuccess({ rows: rows })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadRowsFailure({ error })))
        )
      )
    )
  );

  removeRow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeRow),
      mergeMap(({ _id }) =>
        this.rowService.delete(_id).pipe(map(() => deleteRow({ _id })))
      )
    )
  );

  addRow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRow),
      mergeMap(({ highPrice, lowPrice }) =>
        this.rowService.add(highPrice, lowPrice).pipe(map((b) => createRow(b)))
      )
    )
  );

  updateRow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRow),
      switchMap(({ _id, highPrice, lowPrice }) =>
        this.rowService
          .update(_id, highPrice, lowPrice)
          .pipe(map((n) => {
            console.log("request: "+JSON.stringify({high: highPrice, low: lowPrice, _id: _id}));
            console.log(n);
            return loadRowsFailure({ error: 'Update failed' })
          }))
      )
    )
  );
}
