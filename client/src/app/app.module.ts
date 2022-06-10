import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; //Used for debugging store related operations
import { GridComponent } from './grid/grid.component';
import { StoreModule } from '@ngrx/store';
import { rowReducer } from './state/rows/row.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { RowEffects } from './state/rows/row.effects';
import { RowService } from './row/row.service';

@NgModule({
  declarations: [AppComponent, GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatCardModule,
    MatSliderModule,
    HttpClientModule,
    EffectsModule.forRoot([RowEffects]),
    StoreModule.forRoot({ rows: rowReducer }),
    AgGridModule.withComponents(),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [RowService],
  bootstrap: [AppComponent],
})
export class AppModule {}
