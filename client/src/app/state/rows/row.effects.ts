import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRow,
  removeRow,
  loadRows,
  loadRowsSuccess,
  loadRowsFailure,
} from './row.actions'
import { RowService } from '../../row/row.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllRows } from './row.selector';
import { AppState } from '../app.state';

@Injectable()
export class RowEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private rowService: RowService
  ) {}

  // Run this code when a loadRows action is dispatched
  loadRows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRows),
      switchMap(() =>
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

  // Run this code when the addRow or removeRow action is dispatched
  saveRows$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addRow, removeRow),
        withLatestFrom(this.store.select(selectAllRows)),
        switchMap(([action, rows]) => from(this.rowService.saveRows(rows)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
