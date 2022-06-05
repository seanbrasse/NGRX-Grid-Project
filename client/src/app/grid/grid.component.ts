import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gridOptions = {
    columnDefs: [
      {headerName: 'Id', field: 'id', maxWidth: 175},
      {headerName: 'High', field: 'high', maxWidth: 175},
      {headerName: 'Low', field: 'low', maxWidth: 175},
      {headerName: 'Difference', field: 'diff', maxWidth: 175}

  ],

    rowData: [
        {id: '1', high: 400, low: 20, diff: 0},
        {id: '2', high: 450, low: 75, diff: 0 },
        {id: '3', high: 10, low: 2, diff: 0},
        {id: '4', high: 2000, low: 1050, diff: 0},
    ],
  }

}
