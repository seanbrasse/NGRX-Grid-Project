import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectAllRows } from './../../app/state/rows/row.selector';
import { AgGridAngular } from 'ag-grid-angular';
import {
  loadRows,
  addRow,
  removeRow,
  updateRow,
} from './../state/rows/row.actions';
import {
  ValueGetterParams,
  ValueSetterParams,
  ValueFormatterParams,
  GridOptions,
} from 'ag-grid-community';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public rows$ = this.store.select(selectAllRows);
  public highPrice = 0;
  public lowPrice = 0;

  faPlus = faPlus;
  faMinus = faTrash;

  gridOptions = <GridOptions>{
    //use value formatter to set floating point
    columnDefs: [
      {
        headerName: 'Id',
        field: 'id',
        maxWidth: 175,
        sortable: true,
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
      },
      {
        headerName: 'High',
        field: 'highPrice',
        maxWidth: 175,
        editable: true,
        filter: 'agNumberColumnFilter',
        sortable: true,
        floatingFilter: true,
        // valueSetter allows for updating the cell -issues abstracting this function
        valueSetter: (params: ValueSetterParams) => {
          var elementIdx = params.data.id - 1;
          this.store.dispatch(
            updateRow({
              id: elementIdx,
              highPrice: Number(params.newValue),
              lowPrice: Number(params.data.lowPrice),
            })
          );
          return true;
        },
        valueFormatter: this.decimalPrecision,
      },
      {
        headerName: 'Low',
        field: 'lowPrice',
        maxWidth: 175,
        editable: true,
        filter: 'agNumberColumnFilter',
        sortable: true,
        floatingFilter: true,
        // valueSetter allows for updating the cell -issues abstracting this function
        valueSetter: (params: ValueSetterParams) => {
          var elementIdx = params.data.id - 1;
          this.store.dispatch(
            updateRow({
              id: elementIdx,
              highPrice: Number(params.data.highPrice),
              lowPrice: Number(params.newValue),
            })
          );
          return true;
        },
        valueFormatter: this.decimalPrecision,
      },
      {
        headerName: 'Difference',
        field: 'difference',
        maxWidth: 175,
        valueGetter: this.highLowDiff,
        cellStyle: this.cellStyling,
        sortable: true,
        filter: 'agNumberColumnFilter',
        floatingFilter: true,
        valueFormatter: this.decimalPrecision,
      },
    ],
  };

  ngOnInit(): void {
    this.store.dispatch(loadRows());
  }

  addRow() {
    this.store.dispatch(
      addRow({ highPrice: this.highPrice, lowPrice: this.lowPrice })
    );
  }

  removeRow(id: number) {
    this.store.dispatch(removeRow({ id: id }));
  }

  deleteRow() {
    let selectedNodes = this.agGrid.api.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);
    selectedData.forEach((row) => this.removeRow(row.id));
  }

  //Calculate the difference between columns
  highLowDiff(params: ValueGetterParams) {
    return params.data.highPrice - params.data.lowPrice;
  }

  cellStyling(params: any) {
    if (params.data.highPrice < params.data.lowPrice) {
      return { 'background-color': 'red' };
    } else {
      return { 'background-color': 'green' };
    }
  }

  decimalPrecision(params: ValueFormatterParams) {
    return '$' + params.value.toFixed(2);
  }
}
