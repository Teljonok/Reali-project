import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CustomersModule} from './customers/customers.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import { customersReducer } from './customers/store/reducers/customer.reducers';
import { CustomersEffects } from './customers/store/effects/customers.effects';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomersModule,
    HttpClientModule,
    CustomersModule,
    
    StoreModule.forRoot({customers: customersReducer}),
    EffectsModule.forRoot([CustomersEffects]),
    
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
