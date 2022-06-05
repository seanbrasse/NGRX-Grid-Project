import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Row } from '../row/Row.model';
import { AppState } from '../state/app.state';
import { selectAllRows } from './../../app/state/rows/row.selector';
import {
  loadRows,
  addRow,
  removeRow,
  updateRow,
} from './../state/rows/row.actions';
import { ValueGetterParams, ValueSetterParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  public rows$ = this.store.select(selectAllRows);
  public highPrice = 0;
  public lowPrice = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadRows());
  }

  addRow() {
    this.store.dispatch(
      addRow({ highPrice: this.highPrice, lowPrice: this.lowPrice })
    );
  }

  removeRow(row: Row) {
    this.store.dispatch(removeRow({ id: row.id }));
  }


   highLowDiff(params: ValueGetterParams) {
    return params.data.highPrice - params.data.lowPrice;
  }


  gridOptions = {
    //use value formatter to set floating point
    columnDefs: [
      { headerName: 'Id', field: 'id', maxWidth: 175 },
      {
        headerName: 'High',
        field: 'highPrice',
        maxWidth: 175,
        editable: true,
        valueSetter: (params: ValueSetterParams) => {
          var elementIdx = params.data.id - 1;
          console.log(elementIdx);
          this.store.dispatch(updateRow({ id: elementIdx, highPrice: params.newValue, lowPrice: params.data.lowPrice }));
          return true;
        },
      },
      { headerName: 'Low', field: 'lowPrice', maxWidth: 175, editable: true, valueSetter: (params: ValueSetterParams) => {
          var elementIdx = params.data.id - 1;
          console.log(elementIdx);
          this.store.dispatch(updateRow({ id: elementIdx, highPrice: params.data.highPrice, lowPrice: params.newValue }));
          return true;
        }, },
      {
        headerName: 'Difference',
        field: 'difference',
        maxWidth: 175,
        valueGetter: this.highLowDiff,
      },
    ],
  };
}
