import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Customer} from '../models/customer';


import {CustomerModalMode} from '../models/customer-modal-mode';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AddCustomer, DeleteCustomer, LoadCustomers, UpdateCustomer} from '../store/actions/customer.actions';
import {getAllCustomersSelector} from '../store/reducers/customer.selectors';
import {CustomersState} from '../store/reducers/customer.reducers';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  activeDialog: MatDialogRef<CustomerModalComponent>;

  @ViewChild('deleteCustomerTemplate') deleteCustomerTemplate: TemplateRef<any>;

  constructor(public dialog: MatDialog,
              public store: Store<CustomersState>) {
  }

  ngOnInit(): void {
    this.customers$ = this
      .store
      .select(getAllCustomersSelector);

    this.store.dispatch(new LoadCustomers());
  }

  onEdit(customer: Customer) {
    this.activeDialog = this.dialog.open(CustomerModalComponent, {
      data: {customer, mode: CustomerModalMode.Edit}
    });

    this.activeDialog
      .afterClosed()
      .subscribe(this.onModalClose.bind(this));
  }

  onModalClose(modalResult: { customer: Customer, mode: CustomerModalMode }) {
    if (!modalResult) {
      return;
    } else if (modalResult.mode === CustomerModalMode.New) {
      this.store.dispatch(new AddCustomer(modalResult.customer));
    } else {
      this.store.dispatch(new UpdateCustomer(modalResult.customer));
    }
  }

  onNew() {
    this.activeDialog = this.dialog.open(CustomerModalComponent, {
      data: {mode: CustomerModalMode.New}
    });

    this.activeDialog
      .afterClosed()
      .subscribe(this.onModalClose.bind(this));
  }

  onDelete(customer: Customer) {
    this.activeDialog = this.dialog.open(this.deleteCustomerTemplate, {
      data: {customer}
    });

    this.activeDialog
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(new DeleteCustomer(customer));
        }
      });
  }
}
