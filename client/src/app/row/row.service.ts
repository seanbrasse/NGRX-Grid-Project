import { Injectable } from '@angular/core';
import { Row } from './Row.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class RowService {
  private storageInitialised = false;

  constructor(private http: HttpClient) {}

  getRows() {
    var res = this.http.get<any>('/api/getAll');
    res.subscribe((data) => {
      console.log(data);
    });
    return res;
  }

  add(high: number, low: number) {
    var res = this.http.post<Row>('/api/add-row', {
      high: high,
      low: low,
    });
    res.subscribe((data) => {

      console.log(data);
    });
    return res;
  }

  delete(id: string) {
    var res = this.http.delete('/api/delete-row/' + id);
    res.subscribe((data) => {
      console.log(data);
    });
    return res;
  }


  update(_id: string, high: number, low: number) {
    var res = this.http.put<Row>('/api/update-row/' + _id, {
      high: high,
      low: low,
    });
    return res;
  }
}
