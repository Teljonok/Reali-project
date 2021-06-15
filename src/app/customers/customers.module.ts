import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { MatButtonModule } from '@angular/material/button';

import { CustomerListComponent } from './customer-list/customers-list.component';
import { CustomersMaterialModule } from './customers-material.module';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersMaterialModule,
    MatButtonModule,
  ],
  exports: [
    CustomerListComponent,
    CustomerModalComponent
  ],
  declarations: [
    CustomerListComponent,
    CustomerCardComponent,
    CustomerModalComponent
  ],
  providers: [
  ],
  entryComponents: [
    CustomerModalComponent
  ]
})
export class CustomersModule {
}
