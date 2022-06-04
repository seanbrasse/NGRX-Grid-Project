import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { StoreDevtoolsModule } from "@ngrx/store-devtools"; //Used for debugging store related operations
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSliderModule,
    AgGridModule.withComponents(null),
    StoreDevtoolsModule.instrument({ }) //This is wrong
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
