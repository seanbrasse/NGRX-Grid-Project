import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ag_grid_app';
  columnDefs = [
        {headerName: 'Id', field: 'id'},
        {headerName: 'High', field: 'high'},
        {headerName: 'Low', field: 'low' },
        {headerName: 'Difference', field: 'diff'}

    ];

    rowData = [
        {id: '1', high: 400, low: 20, diff: 0},
        {id: '2', high: 450, low: 75, diff: 0 },
        {id: '3', high: 10, low: 2, diff: 0},
        {id: '4', high: 2000, low: 1050, diff: 0},
    ];
}
