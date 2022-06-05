import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Row } from './Row.model';

@Injectable({ providedIn: 'root' })
export class RowService {
  private storageInitialised = false;

  constructor(private storage: Storage) {}

  async getRows(): Promise<Row[]> {
    if (!this.storageInitialised) await this.storage.create();

    return (await this.storage.get('rows')) || [];
  }

  async saveRows(rows: Row[]) {
    if (!this.storageInitialised) await this.storage.create();

    return this.storage.set('rows', rows);
  }
}
